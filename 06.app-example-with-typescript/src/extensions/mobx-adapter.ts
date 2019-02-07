import { configure } from 'mobx'
import { createElement } from 'react'
import { render } from 'react-dom'

async function enableDevtools(): Promise<void> {
  const mobxDevtools = await import('mobx-react-devtools')
  const wrapper = document.createElement('div')
  wrapper.id = 'mobx-devtools-wrapper'
  document.body.appendChild(wrapper)
  render(createElement(mobxDevtools.default), wrapper)
}

async function onAppInit(this: jc.Core, next: jc.Func<void>): Promise<void> {
  next()

  if (this.getService('env').isProduction) {
    return
  }

  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    disableErrorBoundaries: true,
  })
  await enableDevtools()
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
