import { Component } from 'react'
import type { ReactNode } from 'react'
import { Message } from '@mnml-tools/ui'

/** Keeps one broken example from blanking the whole page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {}

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    return this.state.error ? <Message tone="error">{String(this.state.error)}</Message> : this.props.children
  }
}
