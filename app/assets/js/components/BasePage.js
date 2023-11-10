/*  ----- Base Page Class -----
    This is a base level class that simply updates the window title with the new page name.
    We will use this base class to create all other custom pages.
*/

export class BasePage {
  constructor() {}
  setTitle(title) {
    document.title = `${app.config.appName} | ${title}`;
  }
}
