import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <Row
    type="flex"
    className="todo-list"
    role="todo-list"
    style={{
      flexDirection: "column",
    }}
  >
    {todos.map((todo) => (
      <Col
        key={todo.id}
        style={{ border: "1px solid #0002", padding: ".75rem 1.25rem" }}
      >
        <TodoItem
          {...todo}
          onClick={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      </Col>
    ))}
  </Row>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
