import { Module } from '@elements/module/Module'
import { observer } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Props } from './MasterPageProps'

@observer
class MasterPageView extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  public render(): React.ReactNode {
    const { store, sandbox } = this.props
    return (
      <div>
        <ul>
          <li>
            <a href="#/home">Home</a>
          </li>
          <li>
            <a href="#/news">News</a>
          </li>
          <li>
            <a href="#/contact">Contact</a>
          </li>
        </ul>
        <Module
          key={store.currModuleId}
          id={store.currModuleId}
          sandbox={sandbox}
          moduleProps={{ id: store.currModuleId }}
        />
      </div>
    )
  }
}

export default hot(module)(MasterPageView)
