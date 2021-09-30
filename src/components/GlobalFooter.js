import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

function GlobalFooter({ copyright, children }) {
  return (
    <Footer>
      <div style={{ textAlign: 'center', height: '100%' }}>{children || copyright}</div>
    </Footer>
  )
}

export default GlobalFooter
