import React from "react";
import { Card } from "antd";
import AddTodo from "../../containers/Todos";
import MainSection from "../../containers/Todos/MainSection";

export const Todos = () => {
  return (
    <Card className="w-75 d-flex m-auto p-2 flex-column align-items-center">
      <AddTodo newTodo />
      <MainSection />
    </Card>
  );
};
