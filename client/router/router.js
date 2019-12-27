class Router {
  routerConfig = null;
  container = null;
  location = window.location;

  constructor(container, config) {
    this.container = container;
    this.routerConfig = config;
  }

  initHashChange() {
    window.addEventListener("hashchange", () => {
      let { hash } = this.location;
      if (!hash.length) hash = "#";
      const route = this.routerConfig.filter(item => {
        if (hash.indexOf('/') > -1) {
          const splitHash = hash.split('/');
          const param = splitHash[1];
          const baseRoute = splitHash[0];
          return item.path === baseRoute;
        }
        return item.path === hash;
      })[0];
      if (!route) return null;
      this.renderRoute(route);
    });
  }

  renderRoute(route) {
    const { component } = route;
    this.container.innerHTML = component.render();
    if (component.registerEventHandlers) component.registerEventHandlers();
  }

  init() {
    this.initHashChange();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export default Router;
