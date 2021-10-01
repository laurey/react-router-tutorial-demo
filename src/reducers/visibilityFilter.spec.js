import { setVisibilityFilter } from "../actions/todos";
import visibilityFilter from "./visibilityFilter";

describe("visibilityFilter", () => {
  test("should handle initial state", () => {
    expect(visibilityFilter(undefined, { type: "@@INIT" })).toEqual("SHOW_ALL");
  });

  test("should handle SET_VISIBILITY_FILTER", () => {
    expect(
      visibilityFilter(undefined, setVisibilityFilter("SHOW_ACTIVE"))
    ).toEqual("SHOW_ACTIVE");
  });
});
