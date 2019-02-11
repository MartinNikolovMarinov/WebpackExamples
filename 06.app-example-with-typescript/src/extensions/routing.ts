import { History } from 'history'
import createBrowserHistory from 'history/createBrowserHistory'

const BROWSER_HISTORY = createBrowserHistory()

declare global {
  namespace jc {
    interface RouteConfig {
      path: string,
      moduleId: string,
    }

    interface Sandbox {
      browserHistory?: History,
      routesMap?: Record<string, RouteConfig>,
    }

    interface Core {
      browserHistory?: History,
      routesMap?: Record<string, RouteConfig>,
      addRoute?(routeId: string, routeProps: RouteConfig): void,
    }
  }
}

function addRoute(this: jc.Sandbox, routeId: string, routeProps: jc.RouteConfig): void {
  this.routesMap[routeId] = routeProps
}

export function routing(): jc.Extension {
  return {
    name: 'routing',
    install: (core): Partial<jc.PluginsMap> => {
      (function(sb: jc.Sandbox): void {
        core.browserHistory = BROWSER_HISTORY
        core.routesMap = {}
        core.addRoute = addRoute
        sb.browserHistory = core.browserHistory
        sb.routesMap = core.routesMap
      }(core.Sandbox.prototype))

      return {}
    },
  }
}
