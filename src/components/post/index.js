import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import NewPost from "../home/categories/Post";
import NewCategory from "../home/categories/Category";
import Header from "../header";
import Post from "./post";
import EmptyRow from "../utils/EmptyRow";
import { DataConsumer } from "../utils/DataProvider";

const Home = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="9">
          <Post />
        </Col>
        <Col md="3">
          <DataConsumer>
            {ctx =>
              ctx.address ? (
                <div>
                  <NewPost />
                  <NewCategory />
                </div>
              ) : null
            }
          </DataConsumer>
        </Col>
      </Row>
      <EmptyRow />
    </Container>
  </div>
);

export default Home;
