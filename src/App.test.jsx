import React from "react";
import { Switch, Route } from "react-router-dom";
import { renderWithRouter } from "./test-utils";
import App from "./App";

describe("App test rendering", () => {
  test("full app rendering", () => {
    const { getByText } = renderWithRouter(
      <App>
        <div>Footer content @ 2020</div>
      </App>
    );
    const footerElement = getByText(/Footer content/i);
    expect(footerElement).toBeInTheDocument();
  });

  test("landing on a non-exist page", () => {
    const { getByText, history } = renderWithRouter(
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <div>default path: {props.location.pathname}</div>
            )}
          />
          <Route
            path="*"
            render={(props) => (
              <div>No match for {props.location.pathname}</div>
            )}
          />
        </Switch>
      </App>
    );
    history.push("/some/non-exist/route");

    expect(getByText(/No match for/i)).toBeInTheDocument();
  });
});
