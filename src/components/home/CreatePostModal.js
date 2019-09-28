import React, { useState } from "react";

import { Modal, Col, Row, Form } from "react-bootstrap";

import Input from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";
import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";

const CreatePostModal = ({
  show,
  setShow,
  onSubmit,
  post,
  setPost,
  title,
  description,
  categoryId
}) => {
  const [fail, setFail] = useState({
    title: true,
    content: true
  });

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <h5>{title}</h5>
        <p>{description}</p>
        <br />
        <Row>
          <Col md="7">
            <Input
              value={post.title}
              placeholder="Post title"
              validate={text => {
                const validate = /^([a-zA-Z _-]+)$/.test(text);
                setFail(fail => {
                  return { ...fail, title: !validate };
                });
                setPost({ ...post, title: text });
                return { validate };
              }}
            />
          </Col>
          <Col md="5">
            <DataConsumer>
              {ctx => (
                <Form.Control
                  as="select"
                  size="sm"
                  onChange={e => setPost({ ...post, category: e.target.value })}
                >
                  {ctx.categories
                    .filter(e => e.category !== "all")
                    .map((e, index) => {
                      return categoryId === undefined || e.id !== categoryId ? (
                        <option key={index}>{e.category}</option>
                      ) : (
                        <option key={index} selected>
                          {e.category}
                        </option>
                      );
                    })}
                </Form.Control>
              )}
            </DataConsumer>
          </Col>
        </Row>
        <EmptyRow />
        <Row>
          <Col>
            <Input
              as="textarea"
              value={post.description}
              placeholder="Post content"
              validate={text => {
                const validate =
                  text !== null && text !== undefined && text.trim().length > 0;
                setFail(fail => {
                  return { ...fail, content: !validate };
                });
                setPost({ ...post, description: text });
                return { validate };
              }}
            />
          </Col>
        </Row>
        <EmptyRow />
        <Row>
          <Col>
            <DataConsumer>
              {ctx => (
                <SpinnerButton
                  variant="outline-dark"
                  text={title}
                  onClick={e => onSubmit(e, ctx)}
                  disable={fail.title || fail.content}
                />
              )}
            </DataConsumer>
          </Col>
        </Row>
        <br />
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;
