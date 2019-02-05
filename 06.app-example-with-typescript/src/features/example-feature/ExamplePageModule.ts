import { Props } from './ExamplePageProps'
type ViewType = typeof import('./ExamplePageView')

export class ExamplePageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      this.sandbox.asyncView<Props>({
        resolve: async (): Promise<ViewType> => import('./ExamplePageView'),
      }),
      { sandbox: this.sandbox },
      this.root,
    )
  }

  public destroy(): void { }
}
