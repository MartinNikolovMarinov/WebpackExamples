import { MasterPageView, Props } from './MasterPageView'

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      MasterPageView,
      { sandbox: this.sandbox },
      this.root,
    )
  }

  public destroy(): void { }
}
