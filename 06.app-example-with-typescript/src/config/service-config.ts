import { EnvironmentService } from '@services/EnvironmentService'
import { Logger, LogLevel } from '@services/LoggerService'

declare global {
  namespace jc {
    interface GetServiceOverloads {
      getService?(name: 'env'): EnvironmentService
      getService?(name: 'log'): Logger
    }
  }
}

export function registerServices(core: jc.Core): void {
  core.addService('env', EnvironmentService)
  if (process.env.NODE_ENV === 'production') {
    core.addService('log', Logger, LogLevel.Error)
  } else {
    core.addService('log', Logger, LogLevel.Trace)
  }
}
