import { ErrorBoundary } from '@elements/error/ErrorBoundary'
import * as React from 'react'
import { asyncComponent, Configuration } from 'react-async-component'
import { render, unmountComponentAtNode } from 'react-dom'

declare global {
  namespace jc {
    interface Sandbox {
      mountView?<TProps>(
        View: React.ComponentType<TProps>,
        props: TProps,
        root: HTMLElement,
      ): void,
      asyncView<TProps>(config: Configuration<TProps>): React.ComponentType<TProps>
    }

    interface Module {
      root?: HTMLElement
    }
  }
}

function mountView<TProps>(
  this: jc.Sandbox,
  View: React.ComponentType<TProps>,
  props: TProps,
  root: HTMLElement,
): void {
  if (View === undefined) {
    unmountComponentAtNode(root)
    return
  }

  normalizeViewDisplayName(View, this.moduleId)
  render(
    <ErrorBoundary sandbox={this}>
      <View {...props} />
    </ErrorBoundary>,
    root,
  )
}

function asyncView<TProps>(config: Configuration<TProps>): React.ComponentType<TProps> {
  return asyncComponent(config)
}

function normalizeViewDisplayName<TProps>(View: React.ComponentType<TProps>, moduleId: string): void {
  View.displayName = View.displayName !== undefined ? View.displayName : `${moduleId}-view`
}

function setRoot(this: jc.Module, next: jc.Func<void>, props?: { root?: HTMLElement }): void {
  this.root = props ? props.root : undefined
  next()
}

function unmountView(this: jc.Module, next: jc.Func<void>): void {
  next()

  if (this.root) {
    unmountComponentAtNode(this.root)
    this.root = undefined
  }
}

export function reactAdapter(): jc.Extension {
  return {
    name: 'react-adapter',
    install: (core): Partial<jc.PluginsMap> => {
      (function(sb: jc.Sandbox): void {
        sb.mountView = mountView
        sb.asyncView = asyncView
      }(core.Sandbox.prototype))

      return {
        onModuleInit: setRoot,
        onModuleDestroy: unmountView,
      }
    },
  }
}
