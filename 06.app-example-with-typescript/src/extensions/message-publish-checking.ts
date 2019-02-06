declare global {
  namespace jc {
    interface Sandbox {
      allowedPublishMessages?(this: jc.Sandbox, allowedMessages: Record<string, boolean>): void
    }
  }
}

const moduleMessageMap: Map<string, Record<string, boolean>> = new Map<string, Record<string, boolean>>()

function checkMessage(this: jc.Module, next: jc.Func<void>, message: jc.Message): void {
  if (!moduleMessageMap.has(this.sandbox.moduleId)) {
    throw new Error('Message faild: allowedPublishMessages was not ' +
      `initialized for this module ${this.sandbox.moduleId}`)
  }

  const allowedMessages = moduleMessageMap.get(this.sandbox.moduleId)
  if (!allowedMessages[message.type]) {
    throw new Error(`Message faild: You can't publish ${message.type}, because it was not defined ` +
      `in the allowed to publish messages for ${this.sandbox.moduleId} module`)
  }
  next()
}

function allowedPublishMessages(this: jc.Sandbox, allowedMessages: Record<string, boolean>): void {
  moduleMessageMap.set(this.instanceId, allowedMessages)
}

export function publishChecking(): jc.Extension {
  return {
    name: 'message-publish-checking',
    install: (core): Partial<jc.PluginsMap> => {
      (function(sb: jc.Sandbox): void {
        sb.allowedPublishMessages = allowedPublishMessages
      }(core.Sandbox.prototype))

      return {
        onModuleReceiveMessage: checkMessage,
      }
    },
  }
}
