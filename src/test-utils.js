// test-utils.js
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render as rtlRender } from "@testing-library/react";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>),
    history,
  };
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { renderWithRouter };
