import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import CreateLink from "../home/categories/CreateLink";
import CreatePost from "../home/categories/CreatePost";
import CreateCategory from "../home/categories/CreateCategory";
import EditPost from "../home/categories/EditPost";
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
                  {ctx.post.user === ctx.address ? <EditPost /> : null}
                  <CreateLink />
                  <CreatePost />
                  <CreateCategory />
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
