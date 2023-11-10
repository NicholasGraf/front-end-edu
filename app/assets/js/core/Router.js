export class Router {
  constructor(app) {
    if (!app) {
      throw "Router needs the app object to initiate.";
    }
    this.app = app;
    this.routes = new Map();
    this.currentPath = null;
    this.previousPath = null;
    this.currentModule = null;
    this.init();
  }
  init() {
    let routeArray = Object.values(this.app.config.routes);
    routeArray.forEach((route) => {
      if (!route.active) {
        return;
      }
      this.addRoute(route.path, {
        name: route.display.toLowerCase(),
        ...route,
      });
    });
    window.addEventListener("popstate", (e) => this.loadPopState(e));
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  async loadPopState(e) {
    this.currentPath = e.state.path;
    await this.loadPage();
  }

  async navigate(path) {
    let newPath = !path || !this.routes.get(path) || path == "/index.html" || path == "/" ? "/" : path;
    if (this.currentPath == newPath) {
      return;
    }
    if (this.currentModule) {
      let currentPathName = this.routes.get(this.currentPath).name,
        loadedModule = this.currentModule[currentPathName];
      this.app.events.unsubscribe(this.app.config.events.pageLoaded, loadedModule);
      this.currentModule = null;
    }
    window.history.pushState({ path: path }, path, path);
    this.currentPath = newPath;
    await this.loadPage();
  }

  async loadPage() {
    if (!this.routes.has(this.currentPath)) {
      console.error(`No route found for path: ${this.currentPath}`);
      return;
    }
    const route = this.routes.get(this.currentPath),
      htmlResponse = await fetch(`/${route.html}`);
    if (!htmlResponse.ok) {
      console.error(`Failed to load HTML for route: ${route.name}`);
      return;
    }
    let html = await htmlResponse.text();
    route.htmlContent = html;
    document.title = `${this.app.config.appName} | ${route.display}`;
    if (route.js) {
      try {
        this.currentModule = await import(`/${route.js}`);
        this.app.events.subscribe(this.app.config.events.pageLoaded, this.currentModule[route.name]);
      } catch {
        this.currentModule = null;
      }
    }
    this.app.events.notify(this.app.config.events.pageLoaded, route);
  }
}
