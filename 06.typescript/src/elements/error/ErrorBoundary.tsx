import * as React from 'react'

interface State {
  didCatch: boolean
}

export class ErrorBoundary extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { didCatch: false }
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ didCatch: true })
    // console.error(error)
    // console.error(info.componentStack)
  }

  public render(): React.ReactNode {
    return this.state.didCatch ? this.renderError() : this.props.children
  }

  public renderError(): React.ReactNode {
    return (
      <div className="alert alert-danger">
        <p>
          <b><i className="fa fa-warning" /> Something went wrong :(</b>
          <br />Please, try to refresh the page.
        </p>
      </div>
    )
  }
}
