export const config = {
  appName: "New App",
  appRootSelector: "app-root",
  pageContainerSelector: "page-container",
  routes: {
    home: {
      active: true,
      path: "/",
      display: "Home",
      html: "pages/Home/home.html",
      js: "pages/Home/home.js",
    },
    about: {
      active: true,
      path: "/about",
      display: "About",
      html: "pages/About/about.html",
    },
  },
  events: {
    pageLoaded: "pageLoaded",
    navItemClicked: "navItemClicked",
  },
};
