import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TodoActions from "../../actions/todos";
import MainSection from "../../components/Todos/MainSection";

const mapStateToProps = (state) => ({
  todosCount: state.todos.length,
  completedCount: TodoActions.getCompletedTodoCount(state.todos),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
