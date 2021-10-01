import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import Filters from "./Filters";
import VisibleTodoList from "../../containers/Todos/VisibleTodoList";

function MainSection({ todosCount }) {
  return (
    <Card className="w-50" style={{ width: "50%" }}>
      {!!todosCount && (
        <div className="text-center pb-2">Todos Total Count: {todosCount}</div>
      )}
      <Filters />
      <VisibleTodoList />
    </Card>
  );
}

MainSection.propTypes = {
  todosCount: PropTypes.number,
  completedCount: PropTypes.number,
  actions: PropTypes.object,
};

export default MainSection;
