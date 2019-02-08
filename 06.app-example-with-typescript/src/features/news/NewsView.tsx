import * as React from 'react'
import { hot } from 'react-hot-loader'

export class NewsPage extends React.Component {
  public render(): React.ReactNode {
    return (<h1>News</h1>)
  }
}

export default hot(module)(NewsPage)
