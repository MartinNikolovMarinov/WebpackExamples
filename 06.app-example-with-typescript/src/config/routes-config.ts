export function registerRoutes(app: jc.Core): void {
  app.router.route('/home', (match: jc.RouteMatch) => {
    const msg: msg.RouteChangeMsg = {
      type: app.constants.ROUTE_CHANGE_MESSAGE,
      match: match,
    }
    app.publishAsync(msg)
  })

  app.router.route('/news', (match: jc.RouteMatch) => {
    const msg: msg.RouteChangeMsg = {
      type: app.constants.ROUTE_CHANGE_MESSAGE,
      match: match,
    }
    app.publishAsync(msg)
  })

  app.router.route('/contact', (match: jc.RouteMatch) => {
    const msg: msg.RouteChangeMsg = {
      type: app.constants.ROUTE_CHANGE_MESSAGE,
      match: match,
    }
    app.publishAsync(msg)
  })
}
