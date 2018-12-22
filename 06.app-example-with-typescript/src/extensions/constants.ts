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
  public MODULE_MASTER_PAGE: string = 'root'
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
