import { Props } from './MasterPageView'
import { asyncComponent } from './AsyncComponent'

type MasterPageType = typeof import('./MasterPageView')

function load(): Promise<MasterPageType> {
  return import('./MasterPageView');
}

const AsyncMasterPage = asyncComponent(load());

export class MasterPageModule implements jc.Module {
  public root: HTMLElement
  public sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
  }

  public init(): void {
    this.sandbox.mountAsyncView<Props>(
      AsyncMasterPage,
      { sandbox: this.sandbox },
      this.root,
    )
  }

  public destroy(): void { }
}
