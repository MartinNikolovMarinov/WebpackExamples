import * as React from 'react'
import { hot } from 'react-hot-loader'

export class ContactView extends React.Component {
  public render(): React.ReactNode {
    return (<h1>Contacts</h1>)
  }
}

export default hot(module)(ContactView)
