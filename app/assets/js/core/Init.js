/*  ----- Import Components -----
    Here import all the UI components at once and register them with the core component module.
    Later we will use this component module to allow component toggles.
*/

import { App } from "../components/App.js";
import { PageContainer } from "../components/PageContainer.js";
import { NavItem, Navigation } from "../components/Navigation.js";

export const init = (appObject) => {
  window.app = appObject;

  const componentsToLoad = [
    { name: "app-root", class: App },
    { name: "page-container", class: PageContainer },
    { name: "nav-item", class: NavItem },
    { name: "nav-container", class: Navigation },
  ];

  componentsToLoad.forEach((component) => {
    app.components.add(component.name, component.class);
  });

  app.router.navigate(window.location.pathname);
};
