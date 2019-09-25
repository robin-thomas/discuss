import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "../header";
import Post from "./post";
import Comments from "./comments";

const Home = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="10">
          <Post />
        </Col>
        <Col md="2">Hello</Col>
      </Row>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col md="10">
          <Comments />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Home;
