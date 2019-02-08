import { action } from 'mobx'
import { Props } from './MasterPageProps'
import { MasterPageStore } from './MasterPageStore'
type ViewType = typeof import('./MasterPageView')

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox
  private readonly store: MasterPageStore

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
    this.sandbox.allowedPublishMessages({})
    this.store = new MasterPageStore(this.sandbox)
  }

  public moduleWillSubscribe(): string[] {
    return [
      this.sandbox.constants.ROUTE_CHANGE_MESSAGE,
    ]
  }

  @action
  public moduleDidReceiveMessage(message: jc.Message & msg.RouteChangeMsg): void {
    switch (message.type) {
      case this.sandbox.constants.ROUTE_CHANGE_MESSAGE:
        this.store.currRouteMatch = message.match
        break
    }
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      this.sandbox.asyncView<Props>({
        resolve: async (): Promise<ViewType> => import('./MasterPageView'),
      }),
      { sandbox: this.sandbox, store: this.store },
      this.root,
    )
  }

  public destroy(): void { }
}
