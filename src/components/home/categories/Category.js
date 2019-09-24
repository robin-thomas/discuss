import React, { useState } from "react";

import { Modal, Col, Row, Button } from "react-bootstrap";

const Category = () => {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col
        className="App-categories-create-category text-center"
        onClick={() => setShow(true)}
      >
        <span>Create Category</span>
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h5>Create New Category</h5>
          <p>No registration. No passwords. </p>
          <br />
          <Row>
            <Col md="3">
              <Button variant="outline-dark">Browse</Button>
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
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default Category;
