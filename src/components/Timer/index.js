import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Button, Col } from "antd";
import useInterval from "../../hooks/useInterval";
import styles from "./style.module.scss";

function Timer(props) {
  const { value } = props;
  const [count, setCount] = useState(value);
  const [delay, setDelay] = useState(1000);

  const handleIncrement = useCallback((num = 100) => {
    setDelay((prev) => prev + num);
  }, []);

  const handleDecrement = useCallback((num = 100) => {
    setDelay((prev) => {
      let data = prev - num;
      if (data <= 0) {
        data = 100;
      }

      return data;
    });
  }, []);

  const handleStop = useCallback((id) => {
    setDelay(null);
  }, []);

  const handleReset = useCallback(() => {
    setDelay(1000);
    setCount(value);
  }, [value]);

  useInterval(() => {
    setCount((prev) => prev + 1);
  }, delay);

  return (
    <Row
      type="flex"
      className="d-flex align-items-center p-4 flex-column"
      style={{ padding: "24px 0" }}
    >
      <Col>
        <p style={{ padding: 12 }}>Count: {count}</p>
      </Col>
      <Col>
        <div className="btn-list-flex" style={{ display: "flex" }}>
          <Button
            className={styles.btn}
            type="primary"
            htmlType="button"
            onClick={handleStop}
          >
            Stop
          </Button>
          <Button
            className={styles.btn}
            type="primary"
            htmlType="button"
            onClick={() => handleIncrement(500)}
          >
            Slower
          </Button>
          <Button
            className={styles.btn}
            type="primary"
            htmlType="button"
            onClick={() => handleIncrement()}
          >
            Slow
          </Button>
          <Button
            className={styles.btn}
            type="info"
            htmlType="button"
            onClick={() => handleDecrement()}
          >
            Fast
          </Button>
          <Button
            className={styles.btn}
            type="info"
            htmlType="button"
            onClick={() => handleDecrement(200)}
          >
            Faster
          </Button>
          <Button
            className={styles.btn}
            type="info"
            htmlType="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Col>
    </Row>
  );
}

Timer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Timer;
