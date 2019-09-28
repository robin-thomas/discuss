import React, { useState } from "react";

import { Row, Col, Modal } from "react-bootstrap";

import Input from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";
import EmptyRow from "../utils/EmptyRow";
import Validation from "../utils/Validation";

const CreateCategoryModal = ({ show, setShow, setCategory, onSubmit }) => {
  const [disableButton, setDisableButton] = useState(true);

  return (
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
                const validate = Validation.category(text);
                setDisableButton(!validate);
                setCategory(text);
                return { validate };
              }}
            />
          </Col>
        </Row>
        <EmptyRow />
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
  );
};

export default CreateCategoryModal;
