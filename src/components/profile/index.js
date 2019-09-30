import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import CreateLink from "../home/categories/CreateLink";
import CreatePost from "../home/categories/CreatePost";
import CreateCategory from "../home/categories/CreateCategory";
import Header from "../header";
import ProfileDetails from "./ProfileDetails";

import EmptyRow from "../utils/EmptyRow";
import { DataConsumer } from "../utils/DataProvider";

const Profile = props => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col md="9">
          <ProfileDetails />
        </Col>
        <Col md="3">
          <DataConsumer>
            {ctx =>
              ctx.address ? (
                <div>
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

export default Profile;
