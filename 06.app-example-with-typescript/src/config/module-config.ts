import * as modules from '@features/index'

export function registerModules(core: jc.Core): void {
  const constants = core.constants
  core.addModule(constants.MODULE_MASTER_PAGE, (sb) => new modules.MasterPageModule(sb))
  core.addModule(constants.EXAMPLE_FEATURE, (sb) => new modules.ExamplePageModule(sb))
}
