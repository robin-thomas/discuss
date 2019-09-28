import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import CreatePost from "../home/categories/CreatePost";
import CreateCategory from "../home/categories/CreateCategory";
import Header from "../header";

import EmptyRow from "../utils/EmptyRow";
import { DataConsumer } from "../utils/DataProvider";

const Profile = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="9">Hello</Col>
        <Col md="3">
          <DataConsumer>
            {ctx =>
              ctx.address ? (
                <div>
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

export default Profile;
