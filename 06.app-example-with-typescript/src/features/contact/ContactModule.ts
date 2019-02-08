type ViewType = typeof import('./ContactView')

export class ContactModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountView(
      this.sandbox.asyncView({
        resolve: async (): Promise<ViewType> => import('./ContactView'),
      }),
      {},
      this.root,
    )
  }

  public destroy(): void { }
}
