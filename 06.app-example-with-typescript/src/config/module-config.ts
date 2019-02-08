import * as modules from '@features/index'

export function registerModules(core: jc.Core): void {
  const constants = core.constants
  core.addModule(constants.MASTER_PAGE, (sb) => new modules.MasterPageModule(sb))
  core.addModule(constants.HOME_PAGE, (sb) => new modules.HomeModule(sb))
  core.addModule(constants.CONTACT_PAGE, (sb) => new modules.ContactModule(sb))
  core.addModule(constants.NEWS_PAGE, (sb) => new modules.NewsModule(sb))
}
