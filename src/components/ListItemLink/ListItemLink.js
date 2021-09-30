import React from 'react'
import { Link, Route } from 'react-router-dom'

export function ListItemLink({ to, ...rest }) {
  return (
    <Route
      path={to && to.pathname ? to.pathname : to}
      children={({ match }) => (
        <li className={match ? 'active' : ''}>
          <Link to={to} {...rest} />
        </li>
      )}
    />
  )
}

export default ListItemLink
