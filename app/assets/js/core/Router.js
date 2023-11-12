export class Router {
  constructor(config, events) {
    if (!config) {
      console.error("Router needs the app config object to initiate.");
    }
    if (!events) {
      console.error("Router needs the events module to initiate.");
    }
    this.config = config;
    this.events = events;
    this.routes = new Map();
    this.currentPath = null;
    this.previousPath = null;
    this.currentModule = null;
    this.init();
  }
  init() {
    for (const route in this.config.routes) {
      let routeObject = this.config.routes[route];
      if (!routeObject.active) {
        return;
      }
      this.addRoute(route, routeObject);
    }
    window.addEventListener("popstate", (e) => this.loadPopState(e));
  }

  addRoute(path, route) {
    route.path = path;
    route.name = path == "/" ? "root" : route.path.replace("/", "");
    this.routes.set(path, route);
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
      this.events.unsubscribe(this.events.pageLoaded, this.currentModule);
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
    const route = this.routes.get(this.currentPath);
    if (route.html) {
      const htmlResponse = await fetch(`/${route.html}`);
      if (!htmlResponse.ok) {
        console.error(`Failed to load HTML for route: ${route.name}`);
        return;
      }
      let html = await htmlResponse.text();
      route.htmlContent = html;
    }
    if (route.js) {
      this.currentModule = await import(`/${route.js}`);
      this.events.subscribe(this.config.events.pageLoaded, this.currentModule[0]);
    } else {
      this.currentModule = null;
    }
    document.title = `${this.config.appName} | ${route.display}`;
    this.events.notify(this.config.events.pageLoaded, route);
  }
}
