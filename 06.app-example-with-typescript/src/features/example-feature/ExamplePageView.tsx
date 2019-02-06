import * as moment from 'moment'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Props } from './ExamplePageProps'

interface State {
  time: moment.Moment
}

class ExamplePageView extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { time: null }
  }

  public componentDidMount(): void {
    this.setState({ time: moment() })
  }

  public render(): React.ReactNode {
    const { time } = this.state
    return (
      <div>
        Example With Moment Js {time ? time.seconds() : null}
      </div>
    )
  }
}

export default hot(module)(ExamplePageView)
