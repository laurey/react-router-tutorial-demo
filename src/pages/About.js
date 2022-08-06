import React from "react";
import { Row, Col } from "antd";
import DemoContainer from "../containers/Demo";
import FancyLink from "../components/FancyLink";

function Abount() {
  return (
    <div>
      <h1>Abount Page</h1>
      <DemoContainer className="about-page-container">
        <hr />
        <Row type="flex" className="d-flex">
          <Col className="pb-2">
            <FancyLink to="/comments" name="Comments" target="_blank" />
          </Col>
          <Col className="pb-2">
            <FancyLink
              to="/logout?redirect=/todos"
              name="LOGOUT"
              title="LOG OUT"
            />
          </Col>
          <Col className="pb-2">
            <FancyLink.AnchorLink
              href="/counter?title=i0s"
              name="Counter"
              title="Counter page"
            />
          </Col>
          <Col className="pb-2">
            <FancyLink
              label="Blog"
              title="Blog"
              to={{
                pathname: "/blog",
                search: "?body=body_content",
              }}
            />
          </Col>
          <Col className="pb-2">
            <FancyLink.AwesomeLink title="TODOS" to="/todos#this-hash">
              Todos
            </FancyLink.AwesomeLink>
          </Col>
          <Col className="pb-2">
            <FancyLink title="HOME PAGE" to="/home#this-hash">
              Home
            </FancyLink>
          </Col>
        </Row>
      </DemoContainer>
    </div>
  );
}

export default Abount;
