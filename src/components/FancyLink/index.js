import React from 'react'
import { Link } from 'react-router-dom'
import AwesomeLink from './AwesomeLink'
import AnchorLink from './AnchorLink'
import { isUrl } from '../../utils/utils'
import styles from './styles.module.scss'

function FancyLink({ label, name, title, children, to, activeOnlyWhenExact, ...props }) {
  if (isUrl(to)) {
    return (
      <AwesomeLink
        {...props}
        name={name}
        label={label}
        title={title}
        children={children}
        activeOnlyWhenExact={activeOnlyWhenExact}
        className={`${styles.basic} ${styles.external}`}
        to={{
          pathname: '/redirect',
          search: '?link=' + encodeURIComponent(to)
        }}
      />
    )
  }

  return (
    <Link className={styles.basic} to={to} title={title} {...props}>
      {label || name || children}
    </Link>
  )
}

FancyLink.AwesomeLink = AwesomeLink
FancyLink.AnchorLink = AnchorLink

export default FancyLink
