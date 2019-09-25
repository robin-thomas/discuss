import React from "react";

import { Row, Col } from "react-bootstrap";

import Input from "../utils/Input";
import SpinnerButton from "../utils/SpinnerButton";

import "./Comment.css";

const Comment = props => {
  return (
    <div className="App-comment">
      <Row>
        <Col>
          <div style={{ padding: "10px" }}>
            <Input
              as="textarea"
              placeholder="enter your comment"
              cls="App-comment-textarea"
            />
          </div>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "10px", marginBottom: "10px", marginRight: "0px" }}
      >
        <Col md="auto" className="ml-auto">
          <SpinnerButton variant="outline-primary" text="Add Comment" />
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
