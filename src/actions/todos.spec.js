import * as types from "../constants/ActionTypes";
import * as actions from "./todos";

describe("Todo actions", () => {
  test("addTodo should create ADD_TODO action", () => {
    expect(actions.addTodo("Buy Beer")).toEqual({
      type: types.ADD_TODO,
      payload: { id: 1, text: "Buy Beer" },
    });
  });

  test("deleteTodo should create DELETE_TODO action", () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      payload: { id: 1 },
    });
  });

  test("editTodo should create EDIT_TODO action", () => {
    expect(actions.editTodo(1, "Go Shopping")).toEqual({
      type: types.EDIT_TODO,
      payload: { id: 1, text: "Go Shopping" },
    });
  });

  test("toggleTodo should create TOGGLE_TODO action", () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: types.TOGGLE_TODO,
      payload: { id: 1 },
    });
  });

  test.skip("completeAll should create COMPLETE_ALL_TODOS action", () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS,
    });
  });

  test.skip("clearCompleted should create CLEAR_COMPLETED action", () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED,
    });
  });
});
