import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  asyncIncrement,
  increment,
  decrement,
  incrementBy,
} from "../../actions/counter";
import styles from "./style.module.scss";

export function Counter() {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleIncrementBy = () => {
    dispatch(incrementBy(10));
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleDecrementIfOdd = () => {
    if (value % 2 !== 0) {
      dispatch(decrement());
    }
  };

  const handleAsyncIncrement = () => {
    dispatch(asyncIncrement());
  };

  // View: the UI definition
  return (
    <div className={styles.counterWrapper}>
      <span>Counter value: {value} </span>
      <div className={styles.counterContainer} style={{ marginTop: 24 }}>
        <Button
          htmlType="button"
          className={styles.btn}
          onClick={handleIncrement}
        >
          ➕
        </Button>
        <Button
          htmlType="button"
          className={styles.btn}
          onClick={handleDecrement}
        >
          ➖
        </Button>
        <Button
          htmlType="button"
          className={styles.btn}
          onClick={handleDecrementIfOdd}
        >
          ➖ If Odd
        </Button>
        <Button
          htmlType="button"
          className={styles.btn}
          onClick={handleIncrementBy}
        >
          + (Step 10)
        </Button>
        <Button
          htmlType="button"
          className={styles.btn}
          onClick={handleAsyncIncrement}
        >
          + Async(Delay 1s)
        </Button>
      </div>
    </div>
  );
}

Counter.propTypes = {
  val: PropTypes.number,
};
