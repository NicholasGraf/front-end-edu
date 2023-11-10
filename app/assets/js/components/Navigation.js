import { BaseElement } from "./BaseElement.js";

export class NavItem extends BaseElement {
  constructor(route) {
    super();
    this.route = route;
    this.id = this.route.name;
    this.display = this.route.display;
  }
  clickEvent() {
    app.router.navigate(this.route.path);
    app.events.notify(app.config.events.navItemClicked, this.route);
  }
  connectedCallback() {
    app.events.subscribe(app.config.events.pageLoaded, this);
    app.events.subscribe(app.config.events.navItemClicked, this);
    this.addEventListener("click", this.clickEvent);
    this.render();
  }
  disconnectedCallback() {
    app.events.unsubscribe(app.config.events.pageLoaded, this);
    app.events.unsubscribe(app.config.events.navItemClicked, this);
    this.removeEventListener("click", this.clickEvent);
  }
  render() {
    this.dataset.path = this.route.path;
    this.innerHTML = this.display;
  }
  update(route) {
    this.classList.remove("current");
    if (route.path == this.route.path) {
      this.classList.add("current");
    }
  }
}

export class Navigation extends BaseElement {
  constructor() {
    super();
    this.routes = app.router.routes;
    this.currentPath = app.router.currentPath || "/";
  }
  get allNavItems() {
    return this.querySelectorAll(".nav-item");
  }
  render() {
    if (this.routes.size < 2) {
      return;
    }
    this.routes.forEach((route) => {
      if (!route.active) {
        return;
      }
      let navItem = new NavItem(route);
      this.append(navItem);
    });
  }
}
