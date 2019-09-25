import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "../header";

const Home = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="10">Hello</Col>
        <Col md="2">Hello</Col>
      </Row>
    </Container>
  </div>
);

export default Home;
