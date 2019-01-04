/* tslint:disable: no-console naming-convention */

import { Hash } from './Hash'
import { Route } from './Route'

export class Router implements jc.Router {

  public defaultHash: string
  private readonly routes: { [path: string]: Route }
  private readonly hash: Hash
  private currentRoute: Route

  constructor(core: jc.Core) {
    this.defaultHash = null
    this.routes = Object.create(null)
    this.hash = new Hash()
    this.currentRoute = null

    this.route = core.createHook('onRouteAdd', this.route, this)
    this.start = core.createHook('onRouteStart', this.start, this)
  }

  public get paths(): string[] {
    return Object.keys(this.routes)
  }

  public get current(): jc.RouteMatch {
    const current = this.currentRoute
    return {
      path: current ? current.path : null,
      params: current ? current.params : null,
    }
  }

  public route(path: string, onStart: (match: jc.RouteMatch) => void): void {
    if (path in this.routes) {
      throw new Error(`route(): ${path} has already been added`)
    }

    this.routes[path] = new Route(path, onStart)
  }

  public start(hash: string): void {
    this.hash.value = hash
    this.currentRoute = this.__findRoute()
    if (this.currentRoute) {
      this.currentRoute.start(this.hash)
      return
    }

    if (typeof this.defaultHash === 'string') {
      this.__startDefaultRoute(hash)
    } else {
      console.warn(`start(): No route matches ${hash}`)
    }
  }

  private __findRoute(): Route {
    const paths = this.paths
    for (let i = 0, len = paths.length; i < len; i++) {
      const path = paths[i]
      const route = this.routes[path]
      if (route.matches(this.hash)) {
        return route
      }
    }

    return null
  }

  private __startDefaultRoute(hash: string): void {
    window.history.replaceState(
      null,
      null,
      `${window.location.pathname}#${this.defaultHash}`,
    )

    this.hash.value = this.defaultHash
    this.currentRoute = this.__findRoute()
    if (this.currentRoute) {
      this.currentRoute.start(this.hash)
    } else {
      console.warn(`start(): No route handler for ${hash}`)
    }
  }
}
