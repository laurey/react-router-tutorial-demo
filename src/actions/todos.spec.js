import * as types from "../constants/ActionTypes";
import * as actions from "./todos";

describe("Todo actions", () => {
  it("addTodo should create ADD_TODO action", () => {
    expect(actions.addTodo("Buy Beer")).toEqual({
      type: types.ADD_TODO,
      payload: { id: 1, text: "Buy Beer" },
    });
  });

  it("deleteTodo should create DELETE_TODO action", () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      payload: { id: 1 },
    });
  });

  it("editTodo should create EDIT_TODO action", () => {
    expect(actions.editTodo(1, "Go Shopping")).toEqual({
      type: types.EDIT_TODO,
      payload: { id: 1, text: "Go Shopping" },
    });
  });

  it("toggleTodo should create TOGGLE_TODO action", () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: types.TOGGLE_TODO,
      payload: { id: 1 },
    });
  });

  it("completeTodo should create COMPLETE_TODO action", () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      payload: { id: 1 },
    });
  });

  it("completeAllTodos should create COMPLETE_ALL_TODOS action", () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS,
    });
  });

  it("clearCompleted should create CLEAR_COMPLETED action", () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED,
    });
  });
});

describe("Todos getVisibleTodos handler", () => {
  it("getVisibleTodos should handle filter", () => {
    const todos = [
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Fix the tests",
        completed: true,
        id: 2,
      },
    ];

    expect(() => actions.getVisibleTodos(todos, undefined)).toThrow();
    expect(() => actions.getVisibleTodos(todos, null)).toThrowError("Unknown");
    expect(actions.getVisibleTodos(todos, types.SHOW_ALL)).toEqual(todos);
    expect(actions.getVisibleTodos(todos, types.SHOW_COMPLETED)).toEqual([
      {
        text: "Fix the tests",
        completed: true,
        id: 2,
      },
    ]);
    expect(actions.getVisibleTodos(todos, types.SHOW_ACTIVE)).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
    ]);
  });
});
