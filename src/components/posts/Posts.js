import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import * as config from "../../config.json";

const Posts = props => {
  const onClick = e => {
    e.preventDefault();
  };

  return (
    <header className="App-header">
      <Row style={{ height: "100%" }}>
        <Col md="2" className="App-header-name align-self-center">
          {config.app.name}
        </Col>
        <Col md="auto" className="ml-auto align-self-center">
          <a className="App-header-link" href="#" onClick={onClick}>
            Log In
          </a>
        </Col>
      </Row>
    </header>
  );
};

export default Posts;
