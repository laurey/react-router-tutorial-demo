import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

function TodoItem(props) {
  const { onClick, onDelete, completed, text } = props;
  return (
    <div className="flex-todo-item">
      <div
        className="d-inline-block p-2"
        style={{
          display: "inline-block",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {text}
      </div>
      <div className="float-right" style={{ float: "right" }}>
        <Button
          htmlType="button"
          role="button"
          type="ghost"
          onClick={onClick}
          name="toggle"
          title="toggle"
        >
          Toggle
        </Button>
        <Button
          htmlType="button"
          role="button"
          type="danger"
          title="remove"
          onClick={onDelete}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default TodoItem;
