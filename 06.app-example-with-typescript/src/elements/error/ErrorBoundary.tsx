import { Logger } from '@services/LoggerService'
import * as React from 'react'

interface State {
  didCatch: boolean
}

interface Props {
  sandbox: jc.Sandbox
}

export class ErrorBoundary extends React.PureComponent<Props, State> {
  private readonly logger: Logger

  constructor(props: any) {
    super(props)
    this.logger = this.props.sandbox.getService('log')
    this.state = { didCatch: false }
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ didCatch: true })
    this.logger.error(error)
    this.logger.error(info.componentStack)
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
