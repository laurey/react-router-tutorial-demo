import React from "react";
import { render } from "../../test-utils";
import Filters from "./Filters";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      activeCount: 0,
      completedCount: 0,
      onClearCompleted: jest.fn(),
    },
    propOverrides
  );

  const output = render(<Filters {...props} />, {
    initialState: {
      todos: [{ id: 0, completed: false, text: "Learn Redux" }],
    },
  });

  return {
    props,
    output,
  };
};

describe("Filters", () => {
  test("should render container", () => {
    const { output } = setup();
    expect(output.getByText("All")).toBeInTheDocument();
    expect(output.getByText("Active")).toBeInTheDocument();
  });
});
