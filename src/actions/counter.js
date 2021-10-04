import {
  INCREMENT,
  INCREMENTBY,
  DECREMENT,
  DECREMENTBY,
} from "../constants/ActionTypes";

export const increment = () => ({ type: INCREMENT });

export const incrementBy = (factor) => ({
  type: INCREMENTBY,
  payload: { factor },
});

export const decrement = () => ({ type: DECREMENT });

export const decrementBy = (factor) => ({
  type: DECREMENTBY,
  payload: { factor },
});

export const asyncIncrement = () => (dispatch) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // }).then(() => {
  //   dispatch(increment());
  // });
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};
