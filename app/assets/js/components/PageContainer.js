import { BaseElement } from "./BaseElement.js";

export class PageContainer extends BaseElement {
  constructor() {
    super();
    this.current = app.config.routes.home;
  }
  connectedCallback() {
    app.events.subscribe(app.config.events.pageLoaded, this);
    this.render();
  }
  disconnectedCallback() {
    app.events.unsubscribe(app.config.events.pageLoaded, this);
  }
  render() {
    this.innerHTML = "Loading...";
  }
  update(route) {
    this.id = route.name;
    this.currentPath = route.path;
    if (route.htmlContent) {
      this.innerHTML = route.htmlContent;
    }
    if (route.css) {
      this.insertAdjacentHTML("afterbegin", `<link rel="stylesheet" href="${route.css}" media="all" />`);
    }
  }
}
