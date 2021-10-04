import todos from "./todos";
import * as types from "../constants/ActionTypes";

describe("todos reducer", () => {
  it("should handle initial state", () => {
    expect(todos(undefined, {})).toEqual([
      // {
      //   text: "Use Redux",
      //   completed: false,
      //   id: 0,
      // },
    ]);
  });

  it("should handle ADD_TODO", () => {
    expect(
      todos([], {
        type: types.ADD_TODO,
        payload: { text: "Run the tests", id: 1 },
      })
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
    ]);

    expect(
      todos(
        [
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.ADD_TODO,
          payload: { text: "Run the tests", id: 1 },
        }
      )
    ).toEqual([
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

    expect(
      todos(
        [
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
        ],
        {
          type: types.ADD_TODO,
          payload: { text: "Fix the tests", id: 2 },
        }
      )
    ).toEqual([
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
        completed: false,
        id: 2,
      },
    ]);
  });

  it("should handle DELETE_TODO", () => {
    expect(
      todos(
        [
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
        ],
        {
          type: types.DELETE_TODO,
          payload: { id: 1 },
        }
      )
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle TOGGLE_TODO", () => {
    expect(
      todos(
        [
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
        ],
        {
          type: types.TOGGLE_TODO,
          payload: { id: 1 },
        }
      )
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
    ]);
  });

  it("should handle EDIT_TODO", () => {
    expect(
      todos(
        [
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.EDIT_TODO,
          payload: { text: "Fix the tests", id: 1 },
        }
      )
    ).toEqual([
      {
        text: "Fix the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle COMPLETE_TODO", () => {
    expect(
      todos(
        [
          {
            text: "Run the tests",
            completed: false,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_TODO,
          payload: { id: 1 },
        }
      )
    ).toEqual([
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle COMPLETE_ALL_TODOS", () => {
    expect(
      todos(
        [
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).toEqual([
      {
        text: "Run the tests",
        completed: true,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: true,
        id: 0,
      },
    ]);

    expect(
      todos(
        [
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: true,
            id: 0,
          },
        ],
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 1,
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should handle CLEAR_COMPLETED", () => {
    expect(
      todos(
        [
          {
            text: "Run the tests",
            completed: true,
            id: 1,
          },
          {
            text: "Use Redux",
            completed: false,
            id: 0,
          },
        ],
        {
          type: types.CLEAR_COMPLETED,
        }
      )
    ).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0,
      },
    ]);
  });

  it("should not generate duplicate ids after CLEAR_COMPLETED", () => {
    expect(
      [
        {
          type: types.COMPLETE_TODO,
          payload: { id: 0 },
        },
        {
          type: types.CLEAR_COMPLETED,
        },
        {
          type: types.ADD_TODO,
          payload: { text: "Write more tests", id: 2 },
        },
      ].reduce(todos, [
        {
          id: 0,
          completed: false,
          text: "Use Redux",
        },
        {
          id: 1,
          completed: false,
          text: "Write tests",
        },
      ])
    ).toEqual([
      {
        text: "Write tests",
        completed: false,
        id: 1,
      },
      {
        text: "Write more tests",
        completed: false,
        id: 2,
      },
    ]);
  });
});
