import { observer } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Link, Router } from 'react-router-dom'
import { Props } from './MasterPageProps'

@observer
class MasterPageView extends React.Component<Props> {
  public render(): React.ReactNode {
    const { sandbox: { browserHistory }, store } = this.props
    return (
      <Router history={browserHistory}>
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
          {store.getRoutes()}
        </div>
      </Router>
    )
  }

  // private homeComponent(): React.ReactElement<jc.Module> {
  //   const { sandbox } = this.props
  //   return (
  //     <Module
  //       key={sandbox.constants.HOME_PAGE}
  //       id={sandbox.constants.HOME_PAGE}
  //       sandbox={sandbox}
  //     />
  //   )
  // }

  // private newsComponent(): React.ReactElement<jc.Module> {
  //   const { sandbox } = this.props
  //   return (
  //     <Module
  //       key={sandbox.constants.NEWS_PAGE}
  //       id={sandbox.constants.NEWS_PAGE}
  //       sandbox={sandbox}
  //     />
  //   )
  // }

  // private contactComponent(): React.ReactElement<jc.Module> {
  //   const { sandbox } = this.props
  //   return (
  //     <Module
  //       key={sandbox.constants.CONTACT_PAGE}
  //       id={sandbox.constants.CONTACT_PAGE}
  //       sandbox={sandbox}
  //     />
  //   )
  // }
}

export default hot(module)(MasterPageView)
