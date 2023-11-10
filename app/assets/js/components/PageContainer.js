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
  render(html) {
    if (!html) {
      return;
    }
    this.innerHTML = html;
  }
  update(route) {
    this.id = route.name;
    this.currentPath = route.path;
    this.render(route.htmlContent);
  }
}
