import React from 'react'

const AnchorLink = React.forwardRef(({ name, title, label, children, href }, ref) => {
  return (
    <a href={href} ref={ref} title={title}>
      🍖 {label || name || children}
    </a>
  )
})

export default AnchorLink
