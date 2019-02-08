type ViewType = typeof import('./NewsView')

export class NewsModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountView(
      this.sandbox.asyncView({
        resolve: async (): Promise<ViewType> => import('./NewsView'),
      }),
      {},
      this.root,
    )
  }

  public destroy(): void { }
}
