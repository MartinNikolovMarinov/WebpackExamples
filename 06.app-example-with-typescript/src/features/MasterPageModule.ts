import { Props } from './MasterPageProps'
type ViewType = typeof import('./MasterPageView')

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
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
