import { registerModules } from '@config/module-config'
import { registerServices } from '@config/service-config'
import { constants } from '@extensions/constants'
import { mobxAdapter } from '@extensions/mobx-adapter'
import { reactAdapter } from '@extensions/react-adapter'
import { services } from '@extensions/services'
import { Core } from 'justcore'

const app: jc.Core = new Core()

app.use([
  // Extensions here
  constants(),
  services(),
  reactAdapter(),
  mobxAdapter(),
  // Use loginFlow(whenAuthorized)
])

app.init(() => {
  // On INIT logic here
  registerServices(app)
  registerModules(app)

  app.startModule(app.constants.MODULE_MASTER_PAGE, {
    props: {
      root: document.getElementById('root'),
    },
  })
})
