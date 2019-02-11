import { Props } from './MasterPageProps'
import { MasterPageStore } from './MasterPageStore'
type ViewType = typeof import('./MasterPageView')

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    const sandbox = this.sandbox
    const store = new MasterPageStore(sandbox)

    sandbox.mountView<Props>(
      sandbox.asyncView<Props>({
        resolve: async (): Promise<ViewType> => import('./MasterPageView'),
      }),
      { sandbox, store },
      this.root,
    )
  }

  public destroy(): void { }
}
