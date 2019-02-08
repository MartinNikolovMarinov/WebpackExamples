import { registerModules } from '@config/module-config'
import { registerServices } from '@config/service-config'
import { constants } from '@extensions/constants'
import { publishChecking } from '@extensions/message-publish-checking'
import { mobxAdapter } from '@extensions/mobx-adapter'
import { reactAdapter } from '@extensions/react-adapter'
import { services } from '@extensions/services'
import { Core } from 'justcore'

const app: jc.Core = new Core()

app.use([
  constants(),
  services(),
  reactAdapter(),
  mobxAdapter(),
  publishChecking(),
])

app.init(() => {
  registerServices(app)
  registerModules(app)

  app.startModule(app.constants.MASTER_PAGE, {
    props: { root: document.getElementById('root') },
  })
})
