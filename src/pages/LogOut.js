import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Spin, Row, Col } from 'antd'
import useInterval from '../hooks/useInterval'
import { getPageQuery } from '../utils/utils'

const delay = 1000

function LogOut(props) {
  const { state } = useLocation()
  const [count, setCount] = useState(props.count || 10)
  const [loading, setLoading] = useState(true)
  const redirect = useMemo(() => {
    const query = getPageQuery()
    const target =
      (query && query.redirect) || (state && state.redirect) || props.redirect
    return (target && target.to) || target
  }, [props.redirect, state])

  useInterval(
    () => {
      setCount((prev) => --prev)
      if (count === 1) {
        setLoading(false)
      }
    },
    loading ? delay : null
  )

  if (loading) {
    return (
      <Spin spinning>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <strong style={{ fontSize: 48 }}>{count}</strong>s later, you'll log out!!
            {redirect && (
              <div style={{ fontSize: 24 }}>
                redirect state data: {JSON.stringify(redirect)}
              </div>
            )}
          </Col>
        </Row>
      </Spin>
    )
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div>
      <h1>you'v logged out successfully!!!!!</h1>
      <div>
        <Link to="/" replace>
          Go Home
        </Link>
      </div>
    </div>
  )
}

LogOut.propTypes = {
  count: PropTypes.number,
  redirect: PropTypes.shape({
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    push: PropTypes.bool,
    from: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool
  })
}

export default LogOut
