import React from "react";
import { render } from "../../test-utils";
import Filters from "./Filters";

const setup = () => {
  const output = render(<Filters />, {
    initialState: {
      todos: [{ id: 0, completed: false, text: "Learn Redux" }],
    },
  });

  return {
    output,
  };
};

describe("Filters", () => {
  it("should render container correctly", () => {
    const { output } = setup();
    expect(output.getByText("All")).toBeInTheDocument();
    expect(output.getByText("Active")).toBeInTheDocument();
    expect(output.getByText("Completed")).toBeInTheDocument();
  });
});
