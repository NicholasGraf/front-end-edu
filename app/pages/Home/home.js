import { BasePage } from "../../assets/js/components/BasePage.js";

import styles from "./home.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];

class Home extends BasePage {
  constructor() {
    super();
  }
  update() {
    this.setTitle(app.config.routes.home.display);
  }
}

export const home = new Home();
