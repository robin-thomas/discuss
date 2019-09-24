import React, { useState } from "react";

import { Modal, Col, Row, Button, Form } from "react-bootstrap";

const Post = () => {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col
        className="App-categories-create-post text-center"
        onClick={() => setShow(true)}
      >
        <span>Create Post</span>
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h5>Create New Post</h5>
          <p>Create a new category. No admins or moderation.</p>
          <br />
          <Row>
            <Col md="7">
              <Form.Control placeholder="Category name" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="outline-dark">Create</Button>
            </Col>
          </Row>
          <br />
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default Post;
