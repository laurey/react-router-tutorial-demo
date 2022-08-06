import React from "react";
import { BrowserRouter } from "react-router-dom";
import LocaleWrapper from "./LocaleWrapper";
import history from "../config/history";
import routes from "../config/router.config";
import renderRoutes from "../config/renderRoutes";
import getRoutes from "../config/routes/getRoutes";
import getPaths from "./getPaths";

const cwd = __dirname || process.cwd();

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
    // console.log("__dirme => ", cwd);
    return (
      <LocaleWrapper>
        <BrowserRouter>
          {renderRoutes(
            getRoutes(
              getPaths({
                cwd,
              }),
              { routes }
            ),
            props
          )}
        </BrowserRouter>
      </LocaleWrapper>
    );
  }
}
