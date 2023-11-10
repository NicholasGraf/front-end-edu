/*  ----- Import Modular JavaScript Files -----
    Here we are importing the code from other JavaScript files.
    This way we can organize code in a way that keeps it clean, easy to debug, easy to read, and allows us to add and remove modules of code throughout the application lifecycle.
*/

import { config } from "../../config.js";
import { init } from "./core/Init.js";
import { Events } from "./core/Events.js";
import { Router } from "./core/Router.js";
import { Components } from "./core/Components.js";

/*  ----- Create App Object and Initate Application -----
    Here we create an application object which keeps the application state and incorporates all the core modules via depenedency injection.
*/

let appObject = {
  config: config,
  events: new Events(),
  components: new Components(),
};
appObject.router = new Router(appObject);

init(appObject);
