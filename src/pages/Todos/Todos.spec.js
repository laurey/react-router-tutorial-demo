import React from "react";
import { render, screen } from "../../test-utils";
import { Todos } from "./Todos";

test("renders learn redux link", () => {
  render(<Todos />, {
    initialState: {
      todos: [{ id: 0, completed: false, text: "Learn Redux" }],
    },
  });
  const linkElement = screen.getByText(/learn redux/i);
  expect(linkElement).toBeInTheDocument();
});
