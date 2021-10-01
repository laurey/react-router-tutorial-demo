import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Input } from "antd";

export function AddTodo(props) {
  const { newTodo, text, placeholder, addTodo } = props;
  const [content, setContent] = useState(text);
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (content.length !== 0) {
      addTodo(content);
      if (newTodo) {
        setContent("");
      }
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Form layout="inline" onSubmit={handleAddTodo}>
      <Form.Item label="Content" name="content" className="p-2">
        <Input
          autoFocus
          placeholder={placeholder}
          value={content}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

AddTodo.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
  addTodo: PropTypes.func.isRequired,
};

AddTodo.defaultProps = {
  text: "",
  placeholder: "Enter content",
  addTodo: () => {},
};
