import { Props } from './HomeProps'
type ViewType = typeof import('./HomeView')

export class HomeModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      this.sandbox.asyncView<Props>({
        resolve: async (): Promise<ViewType> => import('./HomeView'),
      }),
      { sandbox: this.sandbox },
      this.root,
    )
  }

  public destroy(): void { }
}
