import { connect } from "react-redux";
import { AddTodo } from "./AddTodo";
import { addTodo } from "../../actions/todos";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => dispatch(addTodo(text)),
  // toggleTodo: (id) => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
