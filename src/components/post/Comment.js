import React, { useState, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Input from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";
import { DataContext } from "../utils/DataProvider";
import CommentUtils from "../utils/discuss/Comment";

import "./Comment.css";

const Comment = props => {
  const ctx = useContext(DataContext);

  const [comment, setComment] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const onSubmit = async e => {
    console.log(await CommentUtils.createComment(ctx.post.id, comment));

    // TODO: clear the comment box.
  };

  return (
    <div className="App-comment">
      <Row>
        <Col>
          <p
            style={{
              paddingLeft: "2px",
              fontSize: "12px",
              marginBottom: "3px"
            }}
          >
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
      <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
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
