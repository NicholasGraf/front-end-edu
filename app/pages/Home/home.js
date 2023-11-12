import { BasePage } from "../../assets/js/components/BasePage.js";

class Home extends BasePage {
  constructor() {
    super();
  }
  update() {
    this.setTitle(app.config.routes["/"].display);
  }
}

export const home = new Home();
