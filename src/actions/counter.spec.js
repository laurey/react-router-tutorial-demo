import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../constants/ActionTypes";
import * as actions from "./counter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Counter actions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("increment should create INCREMENT action", () => {
    expect(actions.increment()).toEqual({
      type: types.INCREMENT,
    });
  });

  it("incrementBy should create INCREMENTBY action", () => {
    expect(actions.incrementBy(1)).toEqual({
      type: types.INCREMENTBY,
      payload: { factor: 1 },
    });
  });

  it("decrement should create DECREMENT action", () => {
    expect(actions.decrement()).toEqual({
      type: types.DECREMENT,
    });
  });

  it("decrementBy should create DECREMENTBY action", () => {
    expect(actions.decrementBy(1)).toEqual({
      type: types.DECREMENTBY,
      payload: { factor: 1 },
    });
  });

  it("asyncIncrement should dispatch action after 1 second", () => {
    const dispatch = jest.fn();
    actions.asyncIncrement()(dispatch);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe("Counter async actions", () => {
  let store;
  beforeEach(() => {
    jest.useFakeTimers();
    store = mockStore({ value: 10 });
  });

  it("asyncIncrement wait 1 second should dispatch increment action", async () => {
    const expectedActions = [{ type: types.INCREMENT }];
    await store.dispatch(actions.asyncIncrement());
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(1);
    expect(storeActions).toEqual(expectedActions);
  });
});
