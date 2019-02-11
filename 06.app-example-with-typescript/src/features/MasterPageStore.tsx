import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Module } from '~/elements/module/Module'

export class MasterPageStore {
  private readonly sandbox: jc.Sandbox

  constructor(sandbox: jc.Sandbox) {
    this.sandbox = sandbox
    this.createModule = this.createModule.bind(this)
  }

  public getRoutes(): React.ReactNode {
    const routesMap: Record<string, jc.RouteConfig> = this.sandbox.routesMap
    const routeIds: string[] = Object.keys(routesMap)

    const mappedRoutes = routeIds.map((id: string, index: number) => {
      const currentRoute: jc.RouteConfig = routesMap[id]
      return (
        <Route
          key={`${id} ${index}`}
          path={currentRoute.path}
          component={this.createModule(currentRoute)}
        />
      )
    })

    return (
      <Switch>{mappedRoutes}</Switch>
    )
  }

  private createModule(currentRoute: jc.RouteConfig): () => React.ReactElement<jc.Module> {
    return (): React.ReactElement<jc.Module> => {
      return (<Module id={currentRoute.moduleId} sandbox={this.sandbox} />)
    }
  }
}
