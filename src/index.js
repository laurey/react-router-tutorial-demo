import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import findRoute from "./config/findRoute";
import RouterWrapper from "./config/RouterWrapper";
import routes from "./config/router.config";
import "antd/dist/antd.css";
import "./index.css";

const rootElement = document.getElementById("root");

const render = async () => {
  window.g_isBrowser = true;
  let props = {};
  const pathname = window.location.pathname;
  const activeRoute = findRoute(routes, pathname);
  if (
    activeRoute &&
    activeRoute.component &&
    activeRoute.component.getInitialProps
  ) {
    props = activeRoute.component.getInitialProps
      ? await activeRoute.component.getInitialProps({
          route: activeRoute,
          isServer: false,
          location: window.location,
        })
      : {};
  }

  ReactDOM.render(
    <App>
      <RouterWrapper {...props} />
    </App>,
    rootElement,
    () => {
      console.log("app rendered!!!");
    }
  );
};

const preRenderPromises = [];
Promise.all([preRenderPromises])
  .then(() => {
    console.log("app begin to Render!!!");
    render();
  })
  .catch((err) => {
    window.console && window.console.error(err);
  });
