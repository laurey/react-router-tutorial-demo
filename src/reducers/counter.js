import {
  INCREMENT,
  DECREMENT,
  INCREMENTBY,
  DECREMENTBY,
} from "../constants/ActionTypes";

const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + 1,
    };
  } else if (action.type === DECREMENT) {
    return { ...state, value: state.value - 1 };
  } else if (action.type === INCREMENTBY) {
    return {
      ...state,
      value: state.value + action.payload.factor,
    };
  } else if (action.type === DECREMENTBY) {
    return {
      ...state,
      value: state.value - action.payload.factor,
    };
  }

  // otherwise return the existing state unchanged
  return state;
}

export default counterReducer;
