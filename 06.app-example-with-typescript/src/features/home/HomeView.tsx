import * as moment from 'moment'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Props } from './HomeProps'

interface State {
  time: moment.Moment
}

class HomeView extends React.Component<Props, State> {
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
       HOME {time ? time.seconds() : null}
      </div>
    )
  }
}

export default hot(module)(HomeView)
