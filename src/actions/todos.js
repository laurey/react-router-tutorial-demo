import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  COMPLETE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from "../constants/ActionTypes";

let nextTodoId = 0;
export const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const deleteTodo = (id) => ({ type: DELETE_TODO, id });

export const editTodo = (id, text) => ({ type: EDIT_TODO, id, text });

export const completeTodo = (id) => ({ type: COMPLETE_TODO, id });

export const completeAllTodos = () => ({ type: COMPLETE_ALL_TODOS });

export const clearCompleted = () => ({ type: CLEAR_COMPLETED });

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const VisibilityFilters = {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
};
