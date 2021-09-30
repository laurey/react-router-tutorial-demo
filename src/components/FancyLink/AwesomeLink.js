import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import styles from './styles.module.scss'

function AwesomeLink({ label, name, to, title, target, className, activeOnlyWhenExact }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  })

  return (
    <div className={match ? styles.active : ''}>
      {match && '> '}
      <Link to={to} target={target} className={className} title={title}>
        {label || name}
      </Link>
    </div>
  )
}

export default AwesomeLink
