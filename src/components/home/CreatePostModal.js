import React, { useState } from "react";

import { Modal, Col, Row, Form } from "react-bootstrap";

import Input, { hashCode } from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";
import { DataConsumer } from "../utils/DataProvider";
import EmptyRow from "../utils/EmptyRow";
import Validation from "../utils/Validation";

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
    title: post.title ? !Validation.title(post.title) : true,
    content: post.description
      ? !Validation.description(post.description)
      : true,
    checksum: post.title ? hashCode(post.title + post.description) : null
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
                const validate = Validation.title(text);
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
                  value={
                    post.category === null
                      ? 0
                      : ctx.categories
                          .map(e => e.category)
                          .filter(e => e !== "all")
                          .indexOf(post.category)
                  }
                  onChange={e =>
                    setPost({
                      ...post,
                      category:
                        ctx.categories[Number(e.target.value) + 1].category
                    })
                  }
                >
                  {ctx.categories
                    .filter(e => e.category !== "all")
                    .map((e, index) => (
                      <option key={index} value={index}>
                        {e.category}
                      </option>
                    ))}
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
                const validate = Validation.description(text);
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
                  disable={
                    fail.title ||
                    fail.content ||
                    (fail.checksum !== null &&
                      fail.checksum === hashCode(post.title + post.description))
                  }
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
