/*  ----- Base Element Component Class -----
    This is a base level component that renders itself when loaded.
    We will use this component class to create all other custom web components 
    as they will all need to be extended from the HTMLElement class and self render when parse by the DOM.
*/

export class BaseElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
}
