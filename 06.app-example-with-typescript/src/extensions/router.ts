import { Router } from './router/Router'

function matchedRoute(this: jc.Sandbox): jc.RouteMatch {
  return this._extensionsOnlyCore.router.current
}

function onCoreInitPlugin(this: jc.Core, next: jc.Func<void>): void {
  next()

  window.addEventListener('hashchange', () => this.router.start(window.location.hash))
  this.router.start(window.location.hash)
}

export function router(): jc.Extension {
  return {
    name: 'router',
    install: (core: jc.Core): Partial<jc.PluginsMap> => {
      (function(sandbox: jc.Sandbox): void {
        core.router = new Router(core)
        sandbox.matchedRoute = matchedRoute
      }(core.Sandbox.prototype))

      return {
        onCoreInit: onCoreInitPlugin,
      }
    },
  }
}
