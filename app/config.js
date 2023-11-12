export const config = {
  appName: "New App",
  appRootSelector: "app-root",
  pageContainerSelector: "page-container",
  routes: {
    "/": {
      active: true,
      display: "Home",
      html: "pages/Home/home.html",
      css: "pages/Home/home.css",
      js: "pages/Home/home.js",
    },
    "/about": {
      active: true,
      display: "About",
      html: "pages/About/about.html",
    },
  },
  events: {
    pageLoaded: "pageLoaded",
    navItemClicked: "navItemClicked",
  },
};
