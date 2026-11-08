import { Api } from '../app/Api.tsx'
import { Link, Note, Section } from '../app/content.tsx'
import { Example } from '../app/Example.tsx'

export function ButtonPage() {
  return (
    <>
      <Example name="button/Variants" title="Variants">
        Use <code>variant="primary"</code> for the one main action of a view or dialog; everything else is the default.
      </Example>
      <Example name="button/States" title="Disabled and busy">
        Put a <Link to="spinner">Spinner</Link> before the label while an action runs, and disable the button so it
        cannot run twice.
      </Example>
      <Example name="button/InForm" title="Inside a form">
        Like a native <code>&lt;button&gt;</code>, it has no default <code>type</code>, so it submits its form. Set{' '}
        <code>type="button"</code> on every button that is not the submit.
      </Example>
      <Section title="API">
        <Api name="Button" />
        <Api name="ButtonVariant" />
      </Section>
    </>
  )
}

export function IconButtonPage() {
  return (
    <>
      <Example name="icon-button/Basic" title="Icons">
        Borderless and square. An icon is not a name: give each one an <code>aria-label</code> (and a <code>title</code>{' '}
        for the tooltip), and hide the icon itself with <code>aria-hidden</code>.
      </Example>
      <Example name="icon-button/Refreshing" title="Busy">
        <code>spinClassName</code> rotates the icon in place while the action runs.
      </Example>
      <Section title="API">
        <Api name="IconButton" />
      </Section>
    </>
  )
}

export function SpinnerPage() {
  return (
    <>
      <Example name="spinner/Sizes" title="Sizes">
        A rotating <code>Loader2</code>, 15px by default.
      </Example>
      <Example name="spinner/AnyIcon" title="Spin any icon">
        <code>spinClassName</code> (<code>mnml-spin</code>) gives any element the same rotation.
      </Example>
      <Section title="API">
        <Api name="Spinner" />
        <Api name="spinClassName" />
      </Section>
    </>
  )
}

export function StatusDotPage() {
  return (
    <>
      <Example name="status-dot/Basic" title="Live status">
        A 5px square in <code>--indicator</code>: neutral grey, or the accent once one is set. It is decorative, so keep
        a text label next to it.
      </Example>
      <Section title="API">
        <Api name="StatusDot" />
      </Section>
    </>
  )
}

export function DirtyIndicatorPage() {
  return (
    <>
      <Example name="dirty-indicator/Basic" title="Unsaved changes">
        A 5px square in <code>--edited-accent</code>. It carries an accessible label (“Unsaved changes” by default), so
        screen readers announce it. <Link to="tabs">Tab</Link> shows one when <code>dirty</code> is set.
      </Example>
      <Section title="API">
        <Api name="DirtyIndicator" />
      </Section>
    </>
  )
}

export function MessagePage() {
  return (
    <>
      <Example name="message/Tones" title="Tones">
        <code>error</code> is a boxed alert (<code>role="alert"</code>, announced at once); <code>success</code> is a
        quiet status line (<code>role="status"</code>), usually with a leading icon.
      </Example>
      <Example name="message/TestConnection" title="After an action">
        Render the message only once there is something to say: a live region announces what is added to it.
      </Example>
      <Section title="API">
        <Api name="Message" />
        <Api name="MessageTone" />
      </Section>
    </>
  )
}

export function BadgePage() {
  return (
    <>
      <Example name="badge/Basic" title="Labels">
        A small mono label for a short fact, such as a driver name or a version.
      </Example>
      <Section title="API">
        <Api name="Badge" />
      </Section>
    </>
  )
}

export function AvatarPage() {
  return (
    <>
      <Example name="avatar/Basic" title="Colours and sizes">
        The background, border and letter are mixed from <code>color</code> and the current mode, so any colour stays
        readable in light and dark. It is hidden from assistive technology: put the name next to it.
      </Example>
      <Section title="API">
        <Api name="Avatar" />
      </Section>
    </>
  )
}

export function HighlightedTextPage() {
  return (
    <>
      <Example name="highlighted-text/FuzzyMatch" title="Fuzzy match">
        Pass the positions a matcher found; consecutive ones are joined into one <code>&lt;mark&gt;</code>.
      </Example>
      <Note>
        It has no CSS of its own: style the marks with an app rule such as <code>mark {'{ … }'}</code>.
      </Note>
      <Section title="API">
        <Api name="HighlightedText" />
      </Section>
    </>
  )
}

export function SeparatorPage() {
  return (
    <>
      <Example name="separator/Basic" title="Between inline items">
        A faint middle dot with a little space on each side, as in the <Link to="status-bar">status bar</Link>.
      </Example>
      <Section title="API">
        <Api name="Separator" />
      </Section>
    </>
  )
}
