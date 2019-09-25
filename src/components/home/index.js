import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "../header";
import Posts from "./posts";
import Categories from "./categories";

const Home = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="10">
          <Posts />
        </Col>
        <Col md="2">
          <Categories />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Home;