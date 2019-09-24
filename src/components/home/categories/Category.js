import React, { useState } from "react";

import { Modal, Col, Row } from "react-bootstrap";

import Input from "../../utils/Input";
import SpinnerButton from "../../utils/SpinnerButton";

const Category = () => {
  const [show, setShow] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const onSubmit = async () => {
    // TODO: create a new category.

    setShow(false);

    // TODO: trigger reload of categories view.
  };

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
          <p>Create a new category. No admins or moderation.</p>
          <br />
          <Row>
            <Col md="7">
              <Input
                placeholder="Category name"
                validate={text => {
                  const validate = /^([a-zA-Z_-]+)$/.test(text);
                  setDisableButton(!validate);
                  return { validate };
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col>
              <SpinnerButton
                variant="outline-dark"
                text="Create"
                onClick={onSubmit}
                disable={disableButton}
              />
            </Col>
          </Row>
          <br />
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default Category;