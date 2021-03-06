declare global {
  namespace jc {
    interface Core {
      constants?: Constants
    }

    interface Sandbox {
      constants?: Constants
    }
  }
}

class Constants {
  public readonly MASTER_PAGE: string = 'root'
  public readonly HOME_PAGE: string = 'home'
  public readonly CONTACT_PAGE: string = 'contact'
  public readonly NEWS_PAGE: string = 'news'
}

export function constants(): jc.Extension {
  return {
    name: 'constants',
    install: (core: jc.Core): Partial<jc.PluginsMap> => {
      (function(sandbox: jc.Sandbox): void {
        core.constants = sandbox.constants = new Constants()
      }(core.Sandbox.prototype))

      return {}
    },
  }
}
