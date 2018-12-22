import { EnvironmentService } from '@services/EnvironmentService'

declare global {
  namespace jc {
    interface GetServiceOverloads {
      getService?(name: 'env'): EnvironmentService
    }
  }
}

export function registerServices(core: jc.Core): void {
  core.addService('env', EnvironmentService)
}
