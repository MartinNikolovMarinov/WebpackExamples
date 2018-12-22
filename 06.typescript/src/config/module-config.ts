import * as modules from '@features/index'

export function registerModules(core: jc.Core): void {
  const constants = core.constants
  core.addModule(constants.MODULE_MASTER_PAGE, (sb) => new modules.MasterPageModule(sb))

  if (module.hot !== undefined) {
    module.hot.accept('../features/index', () => {
      // re-mounts the master page's view
      core.startModule(core.constants.MODULE_MASTER_PAGE)
    })
  }
}
