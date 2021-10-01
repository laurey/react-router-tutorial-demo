import { connect } from "react-redux";
import { toggleTodo, deleteTodo, getVisibleTodos } from "../../actions/todos";
import TodoList from "../../components/Todos/TodoList";

const VisibleTodoList = (props) => {
  const { todos, toggleTodo, deleteTodo } = props;
  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: "calc(100vh - 16rem)",
      }}
    >
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch) => ({
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  toggleTodo: (id) => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList);
