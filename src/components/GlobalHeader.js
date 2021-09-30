import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

function GlobalHeader(props) {
  const {
    isMobile,
    menusData,
    theme,
    logo,
    collapsed,
    layout: setting,
    onCollapse,
    ...rest
  } = props
  const { navHeight } = setting

  const { pathname } = useLocation()

  return (
    <div className="rtc-global-header">
      {isMobile && (
        <Link to="/" className="rtc-global-logo" key="logo">
          <img src={logo} alt="logo" width="32" />
        </Link>
      )}
      <Menu
        mode="horizontal"
        theme={theme}
        selectedKeys={[pathname]}
        style={{ lineHeight: `${navHeight}px` }}
        {...rest}
      >
        {menusData
          .filter((route) => !route.hideInMenu)
          .map((route) => {
            return (
              <Menu.Item key={route.path.pathname || route.path}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            )
          })}
      </Menu>
    </div>
  )
}

GlobalHeader.propTypes = {
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  menusData: PropTypes.array
}

GlobalHeader.defaultProps = {
  theme: 'dark',
  isMobile: false,
  collapsed: false
}

export default GlobalHeader
