/*  ----- Custom Component Class -----
    Here we extend HTMLElement class from the JavaScript API in the browser.
    The method "connectedCallback()" is inherited from the HTMLElement class and is initiated when the component is parsed in the DOM.
    In this example - the component is simply inserting some HTML content into itself when it is loaded.
*/

class AppRoot extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <h1>Welcome Uli!</h1>
        <p>This is a simple example of a Web Component called "app-root".</p>
        <p>We can use this repo to build our first framewokless application together.</p>
        <p>Feel free to customize and play with this codebase as we step through the develoment process.</p>
    `;
  }
}

/*  ----- Define the Custom Element -----
    Defining this class with the HTML tag "app-root" will register the custom tag "<app-root></app-root>" with this class.
*/

customElements.define("app-root", AppRoot);
