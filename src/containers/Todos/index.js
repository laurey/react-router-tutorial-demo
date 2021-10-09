import { connect } from "react-redux";
import { AddTodo } from "./AddTodo";
import { addTodo } from "../../actions/todos";

const mapStateToProps = (state, ownProps) => ({ ...ownProps });

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  addTodo: (text) => dispatch(addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
