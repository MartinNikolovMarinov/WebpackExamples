import { computed, observable } from 'mobx'

export class MasterPageStore {
  public sandbox: jc.Sandbox
  @observable public currRouteMatch: jc.RouteMatch

  constructor(sb: jc.Sandbox) {
    this.sandbox = sb
  }

  @computed public get currModuleId(): string {
    if (!this.currRouteMatch) {
      return this.sandbox.constants.HOME_PAGE
    }

    switch (this.currRouteMatch.path) {
      case '/home': return this.sandbox.constants.HOME_PAGE
      case '/news': return this.sandbox.constants.NEWS_PAGE
      case '/contact': return this.sandbox.constants.CONTACT_PAGE
      default: return null
    }
  }
}
