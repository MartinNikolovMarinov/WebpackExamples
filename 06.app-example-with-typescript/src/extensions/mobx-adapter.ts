import { configure } from 'mobx'
import { createElement } from 'react'
import { render } from 'react-dom'

function enableDevtools(): void {
  require(['mobx-react-devtools'], (mobxDevtools) => {
    const wrapper = document.createElement('div')
    wrapper.id = 'mobx-devtools-wrapper'
    document.body.appendChild(wrapper)
    render(createElement(mobxDevtools.default), wrapper)
  })
}

function onAppInit(this: jc.Core, next: jc.Func<void>): void {
  next()

  if (!this.getService('env').isProduction) {
    configure({
      enforceActions: 'always',
      computedRequiresReaction: true,
      disableErrorBoundaries: true,
    })
    enableDevtools()
  }
}

export function mobxAdapter(): jc.Extension {
  return {
    name: 'mobx-adapter',
    install: (): Partial<jc.PluginsMap> => {
      return {
        onCoreInit: onAppInit,
      }
    },
  }
}
