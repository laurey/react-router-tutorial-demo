import React from "react";
import { render } from "@testing-library/react";
import TodoList from "./TodoList";

const setup = () => {
  const props = {
    todos: [
      {
        text: "Go Shopping",
        completed: false,
        id: 0,
      },
      {
        text: "Go Skating",
        completed: true,
        id: 1,
      },
    ],
    deleteTodo: jest.fn(),
    toggleTodo: jest.fn(),
  };

  const output = render(<TodoList {...props} />);

  return {
    props,
    output,
  };
};

describe("TodoList", () => {
  test("should render container", () => {
    const {
      output: {
        container: { firstChild },
      },
    } = setup();
    expect(firstChild.className).toContain("todo-list");
  });

  test("should render todos", () => {
    const {
      output: { getByRole, getByText },
    } = setup();
    const todoList = getByRole("todo-list");
    expect(todoList.childElementCount).toBe(2);
    expect(getByText("Go Skating")).toBeInTheDocument();
    expect(getByText("Go Skating").style.textDecoration).toBe("line-through");
  });
});
