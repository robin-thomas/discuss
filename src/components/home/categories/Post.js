import React, { useState } from "react";

import { Modal, Col, Row, Form } from "react-bootstrap";

import PostUtils from "../../utils/discuss/Post";
import Input from "../../utils/Input";
import SpinnerButton from "../../utils/SpinnerButton";
import { DataConsumer } from "../../utils/DataProvider";

const Post = props => {
  const [show, setShow] = useState(false);
  const [fail, setFail] = useState({
    title: true,
    content: true
  });
  const [post, setPost] = useState({
    title: null,
    description: null,
    category: null
  });

  const onSubmit = async (e, ctx) => {
    // create a new post.
    let categoryId = ctx.categories
      .filter(e => e.category === post.category)
      .map(e => e.id)[0];
    if (categoryId === undefined) {
      categoryId = ctx.categories[0].id;
    }

    console.log(
      await PostUtils.createPost(
        {
          title: post.title,
          description: post.description
        },
        categoryId
      )
    );

    setShow(false);
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
                    onChange={e =>
                      setPost({ ...post, category: e.target.value })
                    }
                  >
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
                  setPost({ ...post, description: text });
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
              <DataConsumer>
                {ctx => (
                  <SpinnerButton
                    variant="outline-dark"
                    text="Create"
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
    </Row>
  );
};

export default Post;
