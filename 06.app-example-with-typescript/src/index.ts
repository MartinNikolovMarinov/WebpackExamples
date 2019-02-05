import { registerModules } from '@config/module-config'
import { registerRoutes } from '@config/routes-config'
import { registerServices } from '@config/service-config'
import { constants } from '@extensions/constants'
import { mobxAdapter } from '@extensions/mobx-adapter'
import { reactAdapter } from '@extensions/react-adapter'
import { router } from '@extensions/router'
import { services } from '@extensions/services'
import { Core } from 'justcore'

const app: jc.Core = new Core()

app.use([
  constants(),
  services(),
  reactAdapter(),
  mobxAdapter(),
  router(),
])

app.init(() => {
  registerServices(app)
  registerModules(app)
  registerRoutes(app)
})
