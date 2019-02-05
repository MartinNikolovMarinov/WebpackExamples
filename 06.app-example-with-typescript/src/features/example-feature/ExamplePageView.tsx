import * as moment from 'moment'
import * as React from 'react'
import { Props } from './ExamplePageProps'

export default class MasterPageView extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  public render(): React.ReactNode {
    return (
      <div>
        Example With Moment Js {moment().toLocaleString()}
      </div>
    )
  }
}
