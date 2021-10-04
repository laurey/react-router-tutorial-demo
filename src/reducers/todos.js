import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  COMPLETE_TODO,
} from "../constants/ActionTypes";

const createTodo = (id, text) => ({
  id,
  text,
  completed: false,
});

const toggleTodo = (todos, id) =>
  todos.map((t) => (t.id !== id ? t : { ...t, completed: !t.completed }));

const editTodo = (todos, { id, text }) =>
  todos.map((t) => (t.id !== id ? t : { ...t, text }));

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, createTodo(action.payload.id, action.payload.text)];
    case TOGGLE_TODO:
      return toggleTodo(state, action.payload.id);
    case EDIT_TODO:
      return editTodo(state, action.payload);
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);
    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every((todo) => todo.completed);
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));
    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false);
    default:
      return state;
  }
};

export default todosReducer;
