import React from "react";

import { Modal, Col, Row, Button } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

const Post = ({ show, setShow }) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton />
    <Modal.Body>
      <h5>Create New Post</h5>
      <p>No registration. No passwords. </p>
      <br />
      <Row>
        <Col md="3">
          <DataConsumer>
            {ctx => <Button variant="outline-dark">Browse</Button>}
          </DataConsumer>
        </Col>
        <Col md="9" className="ml-auto">
          <p>
            <i>Upload arweave keystore json file to login.</i>
          </p>
          <p>
            <i>Its not stored on any servers.</i>
          </p>
        </Col>
      </Row>
      <br />
      <p>
        <b>
          Don't have an Arweave wallet? Get one{" "}
          <a href="https://tokens.arweave.org/" target="_blank">
            here
          </a>
          !
        </b>
      </p>
    </Modal.Body>
  </Modal>
);

export default Post;
