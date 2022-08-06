import React from "react";
import { Router, BrowserRouter } from "react-router-dom";
import LocaleWrapper from "./LocaleWrapper";
import history from "./history";
import routes from "../config/router.config";
import renderRoutes from "../config/renderRoutes";
import getRoutes from "../config/routes/getRoutes";
import patchRoutes from "../config/routes/patchRoutes";

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {}

    this.unListen = history.listen(routeChangeHandler);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <LocaleWrapper>
        <BrowserRouter>
          {renderRoutes(patchRoutes(getRoutes(routes)), props)}
        </BrowserRouter>
      </LocaleWrapper>
    );
  }
}
