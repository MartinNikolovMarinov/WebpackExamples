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
  public readonly MODULE_MASTER_PAGE: string = 'root'
  public readonly EXAMPLE_FEATURE: string = 'example'
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
