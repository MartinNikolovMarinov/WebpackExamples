import { Props } from './MasterPageProps'
type ViewType = typeof import('./MasterPageView')

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
    this.sandbox.allowedPublishMessages({
      [`${this.sandbox.constants.MESSAGE_ONE}`]: true,
    })
  }

  public moduleWillSubscribe(): string[] {
    return [
      this.sandbox.constants.MESSAGE_ONE,
    ]
  }

  public moduleDidReceiveMessage(message: jc.Message & {data?: string}): void {
    switch (message.type) {
      case this.sandbox.constants.MESSAGE_ONE:
        this.sandbox.getService('log').log(this.sandbox.constants.MESSAGE_ONE, ': ' , message.data)
        break
    }
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      this.sandbox.asyncView<Props>({
        resolve: async (): Promise<ViewType> => import('./MasterPageView'),
      }),
      { sandbox: this.sandbox },
      this.root,
    )
  }

  public destroy(): void { }
}
