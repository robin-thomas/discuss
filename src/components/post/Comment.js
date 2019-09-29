import React, { useState, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Input from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";
import { DataContext } from "../utils/DataProvider";
import CommentUtils from "../utils/discuss/Comment";

import "./Comment.css";

const Comment = props => {
  const ctx = useContext(DataContext);

  const [key, setKey] = useState(Math.random().toString(36));
  const [comment, setComment] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const onSubmit = e => {
    CommentUtils.createComment(ctx.post.postId, comment).then(console.log);

    alert("Your comment will be published soon!");

    // clear the comment box.
    setKey(Math.random().toString(36));
  };

  return (
    <div className="App-comment">
      <Row>
        <Col>
          <p className="App-comment-container">
            Comment as&nbsp;
            <span className="App-post-details App-post-comment-user">
              {ctx.address}
            </span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Input
              key={key}
              as="textarea"
              placeholder="What are your throughts?"
              cls="App-comment-textarea"
              validate={text => {
                const validate =
                  text !== null && text !== undefined && text.trim().length > 0;
                setDisableButton(!validate);
                setComment(text);
                return { validate };
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className="App-comment-btn-container">
        <Col md="auto" className="ml-auto">
          <SpinnerButton
            variant="outline-primary"
            text="Add Comment"
            disable={disableButton}
            onClick={onSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
