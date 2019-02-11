export function registerRoutes(core: jc.Core): void {
  core.addRoute('home', {
    path: '/home',
    moduleId: core.constants.HOME_PAGE,
  } as jc.RouteConfig)

  core.addRoute('contact', {
    path: '/contact',
    moduleId: core.constants.CONTACT_PAGE,
  } as jc.RouteConfig)

  core.addRoute('news', {
    path: '/news',
    moduleId: core.constants.NEWS_PAGE,
  } as jc.RouteConfig)
}
