import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./Header.css";

import * as config from "../../config.json";

const Header = props => (
  <header className="App-header">
    <Container style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col md="2" className="App-header-name align-self-center">
          {config.app.name}
        </Col>
        <Col md="auto" className="ml-auto align-self-center">
          <a className="App-header-link" href="#">
            Log In
          </a>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
