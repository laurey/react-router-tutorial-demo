import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import defaultRoutes from '../common/route'

function TopHeader(props) {
  const [visible, setVisible] = useState(true)
  const { theme, isMobile, collapsed, layout: setting, menusData } = props
  const { menuPos, fixedHeader, autoHideHeader, navHeight } = setting

  const isTop = menuPos === 'topmenu'

  const width = useMemo(() => {
    if (isMobile || !fixedHeader || isTop) {
      return '100%'
    }

    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 230px)'
  }, [isMobile, fixedHeader, isTop, collapsed])

  const handleScroll = useCallback(() => {
    if (!autoHideHeader) {
      return
    }

    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          setVisible(true)
        } else if (scrollTop > 300 && visible) {
          setVisible(false)
        } else if (scrollTop < 300 && !visible) {
          setVisible(true)
        }

        this.oldScrollTop = scrollTop
        this.ticking = false
      })
    }
  }, [autoHideHeader, visible])

  const { pathname } = useLocation()

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={`rtc-layout-${theme || 'light'}-header ${
        fixedHeader ? 'rtc-layout-fixed-header' : ''
      }`}
      style={{
        width
      }}
    >
      <Menu
        theme={theme}
        selectedKeys={[pathname]}
        mode="horizontal"
        style={{ lineHeight: `${navHeight}px` }}
      >
        {menusData
          .filter((menu) => !menu.hideInMenu)
          .map((menu) => {
            return (
              <Menu.Item key={menu.path.pathname || menu.path}>
                <Link to={menu.path}>{menu.name}</Link>
              </Menu.Item>
            )
          })}
      </Menu>
    </div>
  )
}

TopHeader.propTypes = {
  theme: PropTypes.string,
  menusData: PropTypes.array
}

TopHeader.defaultProps = {
  theme: 'dark',
  isMobile: false,
  collapsed: false,
  // menusData: []
  menusData: defaultRoutes
}

export default TopHeader
