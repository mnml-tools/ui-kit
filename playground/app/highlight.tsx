import type { ReactNode } from 'react'

export type Language = 'tsx' | 'css' | 'sh'

// One alternation per language; the group that matched names the token. Good enough for short, well-formed
// examples, without shipping a highlighter.
const grammars: Record<Language, RegExp> = {
  tsx: new RegExp(
    [
      /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)/,
      /(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)/,
      /(?<tag>(?<=(?:^|[\s(){}>?:&|,=[])<\/?)[A-Za-z][\w.]*)/,
      /(?<keyword>\b(?:import|from|export|default|function|return|const|let|if|else|for|of|in|new|type|as|async|await|true|false|null|undefined|typeof|void|throw|try|catch)\b)/,
      /(?<number>\b\d+(?:\.\d+)?\b)/,
      /(?<attr>\b[a-zA-Z_][\w-]*(?==[{"']))/,
      /(?<type>\b[A-Z]\w*\b)/,
      /(?<fn>\b[a-z_]\w*(?=\())/
    ]
      .map((part) => part.source)
      .join('|'),
    'gm'
  ),
  css: new RegExp(
    [
      /(?<comment>\/\*[\s\S]*?\*\/)/,
      /(?<string>'[^'\n]*'|"[^"\n]*")/,
      /(?<keyword>@[\w-]+)/,
      /(?<prop>(?<=^[ \t]*)--?[\w-]+(?=\s*:[^\n]*;))/,
      /(?<attr>--[\w-]+)/,
      /(?<number>#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|%|em|rem|s)?\b)/,
      /(?<fn>\b[a-z-]+(?=\())/
    ]
      .map((part) => part.source)
      .join('|'),
    'gm'
  ),
  sh: new RegExp(
    [/(?<comment>#[^\n]*)/, /(?<string>'[^'\n]*'|"[^"\n]*")/, /(?<fn>(?<=^[ \t]*)[\w./-]+)/]
      .map((part) => part.source)
      .join('|'),
    'gm'
  )
}

export function highlight(code: string, language: Language) {
  const grammar = new RegExp(grammars[language])
  const nodes: ReactNode[] = []
  let last = 0

  for (const match of code.matchAll(grammar)) {
    const kind = Object.entries(match.groups ?? {}).find(([, value]) => value !== undefined)?.[0]
    if (!kind || !match[0]) continue
    if (match.index > last) nodes.push(code.slice(last, match.index))
    nodes.push(
      <span key={match.index} className={`tok-${kind}`}>
        {match[0]}
      </span>
    )
    last = match.index + match[0].length
  }
  nodes.push(code.slice(last))

  return nodes
}
