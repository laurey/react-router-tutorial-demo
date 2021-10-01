import React from "react";
import FilterLink from "../../containers/Todos/FilterLink";
import { VisibilityFilters } from "../../actions/todos";

const Footer = () => (
  <div className="p-2">
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
);

export default Footer;