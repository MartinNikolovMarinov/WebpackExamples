export function registerRoutes(app: jc.Core): void {
  app.router.route('/', (match: jc.RouteMatch) => {
    app.startModule(app.constants.MODULE_MASTER_PAGE, {
      props: {
        root: document.getElementById('root'),
      },
    })
  })

  app.router.route('/example', (match: jc.RouteMatch) => {
    app.startModule(app.constants.EXAMPLE_FEATURE, {
      props: {
        root: document.getElementById('root'),
      },
    })
  })
}
