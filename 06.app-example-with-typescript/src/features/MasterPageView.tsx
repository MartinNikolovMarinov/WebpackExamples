import { Module } from '@elements/module/Module'
import { observer } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Props } from './MasterPageProps'

@observer
class MasterPageView extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.homeComponent = this.homeComponent.bind(this)
    this.newsComponent = this.newsComponent.bind(this)
    this.contactComponent = this.contactComponent.bind(this)
  }

  public render(): React.ReactNode {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="home">Home</Link>
            </li>
            <li>
              <Link to="news">News</Link>
            </li>
            <li>
              <Link to="contact">Contact</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/home" component={this.homeComponent} />
            <Route path="/news" component={this.newsComponent} />
            <Route path="/contact" component={this.contactComponent} />
          </Switch>
        </div>
      </Router>
    )
  }

  private homeComponent(): React.ReactElement<jc.Module> {
    const { sandbox } = this.props
    return (
      <Module
        key={sandbox.constants.HOME_PAGE}
        id={sandbox.constants.HOME_PAGE}
        sandbox={sandbox}
      />
    )
  }

  private newsComponent(): React.ReactElement<jc.Module> {
    const { sandbox } = this.props
    return (
      <Module
        key={sandbox.constants.NEWS_PAGE}
        id={sandbox.constants.NEWS_PAGE}
        sandbox={sandbox}
      />
    )
  }

  private contactComponent(): React.ReactElement<jc.Module> {
    const { sandbox } = this.props
    return (
      <Module
        key={sandbox.constants.CONTACT_PAGE}
        id={sandbox.constants.CONTACT_PAGE}
        sandbox={sandbox}
      />
    )
  }
}

export default hot(module)(MasterPageView)
