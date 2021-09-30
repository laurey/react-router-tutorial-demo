import React from 'react'
import { Row, Col } from 'antd'
import DemoContainer from '../containers/Demo'
import FancyLink from '../components/FancyLink'

function Demo() {
  return (
    <DemoContainer>
      <hr />
      <p>this is from children</p>
      <Row>
        <Col>
          <FancyLink to="/comments" name="Comments" target="_blank" />
        </Col>
        <Col>
          <FancyLink
            label="Posts"
            to={{
              pathname: '/posts',
              search: '?body=body_content'
            }}
          />
        </Col>
        <Col>
          <FancyLink to="/home#this-hash">Home</FancyLink>
        </Col>
      </Row>
    </DemoContainer>
  )
}

export default Demo
