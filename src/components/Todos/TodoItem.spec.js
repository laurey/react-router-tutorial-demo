import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

const setup = () => {
  const todo = {
    id: 0,
    text: "Learn Redux",
    completed: false,
  };

  const props = {
    onClick: jest.fn(),
    onDelete: jest.fn(),
  };

  let output = render(<TodoItem {...todo} {...props} />);

  return {
    props,
    output,
  };
};

describe("TodoItem", () => {
  test("initial render", () => {
    const { output } = setup();
    const { getByText } = output;
    expect(getByText(/learn redux/i)).toBeInTheDocument();
  });

  test("toggle Button onClick should call onClick", () => {
    const {
      output: { getByTitle },
      props,
    } = setup();
    const btn = getByTitle(/toggle/i);
    expect(btn.type).toBe("button");

    fireEvent.click(btn);
    expect(props.onClick).toBeCalled();
  });

  test("remove button onClick should call onDelete", () => {
    const {
      output: { getByTitle },
      props,
    } = setup();
    const btn = getByTitle(/remove/i);
    expect(btn.type).toBe("button");
    fireEvent.click(btn);
    expect(props.onDelete).toBeCalled();
  });
});
