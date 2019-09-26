import React, { useState } from "react";

import { Modal, Col, Row, Form } from "react-bootstrap";

import Input from "../../utils/Input";
import SpinnerButton from "../../utils/SpinnerButton";
import { DataConsumer } from "../../utils/DataProvider";

const Post = props => {
  const [show, setShow] = useState(false);
  const [fail, setFail] = useState({
    title: true,
    content: true
  });

  const onSubmit = async e => {
    // TODO: create a new category.

    setShow(false);

    // TODO: trigger reload of categories view.
  };

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
          <p>Create a new post. No admins or moderation.</p>
          <br />
          <Row>
            <Col md="7">
              <Input
                placeholder="Post title"
                validate={text => {
                  const validate = /^([a-zA-Z _-]+)$/.test(text);
                  setFail(fail => {
                    return { ...fail, title: !validate };
                  });
                  return { validate };
                }}
              />
            </Col>
            <Col md="5">
              <DataConsumer>
                {ctx => (
                  <Form.Control as="select" size="sm">
                    {ctx.categories.map((e, index) => (
                      <option key={index}>{e.category}</option>
                    ))}
                  </Form.Control>
                )}
              </DataConsumer>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col>
              <Input
                as="textarea"
                placeholder="Post content"
                validate={text => {
                  const validate =
                    text !== null &&
                    text !== undefined &&
                    text.trim().length > 0;
                  setFail(fail => {
                    return { ...fail, content: !validate };
                  });
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
                disable={fail.title || fail.content}
              />
            </Col>
          </Row>
          <br />
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default Post;
