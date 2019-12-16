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
      const route = this.routerConfig.filter(item => item.path === hash)[0];
      if (!route) return null;
      this.renderRoute(route);
    });
  }

  renderRoute(route) {
    const { component } = route;
    const x = new component();
    this.container.innerHTML = x.render();
  }

  init() {
    this.initHashChange();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export default Router;
