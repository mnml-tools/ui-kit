// Reads the kit's public API with the TypeScript compiler and serves it as `virtual:api`, so the props tables and
// signatures in the docs always match the source.
import { relative, resolve } from 'node:path'
import { format } from 'prettier'
import ts from 'typescript'
import type { Plugin } from 'vite'
import type { ApiEntry, ApiKind, ApiProp } from './api.d.ts'

const virtualId = 'virtual:api'
const resolvedId = '\0' + virtualId

const entryPoints = {
  '@mnml-tools/ui': 'src/index.ts',
  '@mnml-tools/ui/tauri': 'src/tauri/index.ts'
} as const

export function apiDocs(root: string): Plugin {
  return {
    name: 'mnml-api-docs',
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    async load(id) {
      if (id !== resolvedId) return

      const { entries, files } = await extract(root)
      files.forEach((file) => this.addWatchFile(file))

      return `export default ${JSON.stringify(entries)}`
    },
    handleHotUpdate({ file, server, modules }) {
      if (!file.startsWith(resolve(root, 'src')) || !/\.tsx?$/.test(file)) return

      const api = server.moduleGraph.getModuleById(resolvedId)
      if (!api) return
      server.moduleGraph.invalidateModule(api)

      return [...modules, api]
    }
  }
}

export async function extract(root: string) {
  const config = ts.getParsedCommandLineOfConfigFile(
    resolve(root, 'tsconfig.json'),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: () => {}
    }
  )!
  const program = ts.createProgram(
    Object.values(entryPoints).map((file) => resolve(root, file)),
    config.options
  )
  const checker = program.getTypeChecker()
  const entries: ApiEntry[] = []
  const files = new Set<string>()

  const doc = (symbol: ts.Symbol) => ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()

  const text = (type: ts.Type) =>
    checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation).replace(/ \| undefined$/, '')

  // `ComponentProps<'button'>` anywhere in the props type, following type aliases.
  const nativeElement = (node: ts.Node | undefined, depth = 0): string | undefined => {
    if (!node || depth > 3) return

    const match = node.getText().match(/ComponentProps<'(\w+)'>/)
    if (match) return match[1]
    if (ts.isTypeReferenceNode(node)) {
      const declaration = checker.getSymbolAtLocation(node.typeName)?.declarations?.[0]
      if (declaration && ts.isTypeAliasDeclaration(declaration)) return nativeElement(declaration.type, depth + 1)
    }
  }

  const propsOf = (type: ts.Type, defaults = new Map<string, string>()) => {
    const props: ApiProp[] = []
    let inherited = false

    for (const prop of checker.getPropertiesOfType(checker.getNonNullableType(type))) {
      const declaration = prop.valueDeclaration ?? prop.declarations?.[0]
      if (!declaration || declaration.getSourceFile().fileName.includes('node_modules')) {
        inherited = true
        continue
      }

      const typeNode = ts.isPropertySignature(declaration) ? declaration.type : undefined
      props.push({
        name: prop.name,
        type: typeNode
          ? typeNode.getText().replace(/\s+/g, ' ')
          : text(checker.getTypeOfSymbolAtLocation(prop, declaration)),
        required: !(prop.flags & ts.SymbolFlags.Optional),
        default: defaults.get(prop.name),
        description: doc(prop)
      })
    }

    return { props, inherited }
  }

  const defaultsOf = (parameter: ts.ParameterDeclaration) => {
    const defaults = new Map<string, string>()
    if (ts.isObjectBindingPattern(parameter.name))
      for (const element of parameter.name.elements)
        if (element.initializer)
          defaults.set((element.propertyName ?? element.name).getText(), element.initializer.getText())

    return defaults
  }

  const pretty = async (code: string) => {
    try {
      return (await format(code, { parser: 'typescript', semi: false, singleQuote: true, printWidth: 80 })).trim()
    } catch {
      return code
    }
  }

  for (const [entry, file] of Object.entries(entryPoints)) {
    const source = program.getSourceFile(resolve(root, file))!
    const module = checker.getSymbolAtLocation(source)!

    for (const exported of checker.getExportsOfModule(module)) {
      const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported
      const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0]
      if (!declaration) continue

      const fileName = declaration.getSourceFile().fileName
      files.add(fileName)
      const base = { name: exported.name, entry, source: relative(root, fileName), description: doc(symbol) }

      if (symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface)) {
        const type = checker.getDeclaredTypeOfSymbol(symbol)
        const objectLike = type.isUnion() || type.isLiteral() ? false : checker.getPropertiesOfType(type).length > 0
        entries.push({
          ...base,
          kind: 'type',
          signature: objectLike ? undefined : await pretty(declaration.getText()),
          props: objectLike ? propsOf(type).props : []
        })
        continue
      }

      const type = checker.getTypeOfSymbolAtLocation(symbol, declaration)
      const [signature] = type.getCallSignatures()

      if (!signature) {
        entries.push({
          ...base,
          kind: 'constant',
          signature: await pretty(`const ${exported.name}: ${text(type)}`),
          props: []
        })
        continue
      }

      const kind: ApiKind = /^use[A-Z]/.test(exported.name)
        ? 'hook'
        : /^[A-Z]/.test(exported.name)
          ? 'component'
          : 'function'
      const parameter = signature.parameters[0]?.valueDeclaration as ts.ParameterDeclaration | undefined
      const parameterType = parameter && checker.getTypeOfSymbolAtLocation(signature.parameters[0], parameter)
      // Object parameters (props, options) get a table; positional ones are read from the signature.
      const table =
        parameter && parameterType && (kind === 'component' || ts.isObjectBindingPattern(parameter.name))
          ? propsOf(parameterType, defaultsOf(parameter))
          : { props: [], inherited: false }

      entries.push({
        ...base,
        kind,
        signature:
          kind === 'component'
            ? undefined
            : await pretty(
                `function ${exported.name}${checker.signatureToString(signature, undefined, ts.TypeFormatFlags.NoTruncation)}`.replace(
                  /\{[^{}]*\}(\??): /,
                  'options$1: '
                )
              ),
        props: table.props,
        native: table.inherited ? (nativeElement(parameter?.type) ?? 'element') : undefined
      })
    }
  }

  return { entries, files: [...files] }
}
