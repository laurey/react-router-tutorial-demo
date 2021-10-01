import React from "react";
import { render } from "../../test-utils";
import MainSection from "./MainSection";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      todosCount: 3,
    },
    propOverrides
  );

  const output = render(<MainSection {...props} />, {
    initialState: {
      todos: [
        { id: 0, completed: false, text: "Learn Redux" },
        { id: 1, completed: true, text: "Learn React" },
        { id: 2, completed: false, text: "Learn ES6" },
      ],
    },
  });

  return {
    props,
    output,
  };
};

describe("MainSection", () => {
  test("should render container", () => {
    const { output } = setup();
    expect(output.getByText(/todos total count/i)).toBeInTheDocument();
    expect(output.getByText(/show:/i)).toBeInTheDocument();
    expect(output.getByText(/es6/i)).toBeInTheDocument();
    expect(output.getAllByText(/learn/i).length).toBe(3);
  });
});
