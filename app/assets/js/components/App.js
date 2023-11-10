/*  ----- Custom Component Class -----
    Here we extend HTMLElement class from the JavaScript API in the browser.
    The method "connectedCallback()" is inherited from the HTMLElement class and is initiated when the component is parsed in the DOM.
    In this example - the component is simply inserting some HTML content into itself when it is loaded.
*/
import { BaseElement } from "./BaseElement.js";

export class App extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <div class="header">
          <div class="logo">${app.config.appName}</div>
          <nav-container></nav-container>
        </div>
        <page-container></page-container>
        `;
  }
}
