import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import Moment from "../../utils/Moment";

import "./Post.css";

const Post = ({
  post: { votes, comments, category, user, timestamp, title, content }
}) => {
  const [blur, setBlur] = useState(votes && votes < 0 ? true : false);

  const onClick = e => {
    if (e.target.classList.contains("App-post-blur")) {
      setBlur(false);
    }
  };

  return (
    <Row>
      <Col>
        <div className="App-post">
          <Row className={`${blur ? "App-post-blur" : ""}`} onClick={onClick}>
            <Col md="auto" className="App-post-vote text-center pr-0">
              <div>
                <Row>
                  <Col className="App-post-vote-vote">▲</Col>
                </Row>
                <Row>
                  <Col className="App-post-vote-count">{votes}</Col>
                </Row>
                <Row>
                  <Col className="App-post-vote-vote">▼</Col>
                </Row>
              </div>
            </Col>
            <Col md="11">
              <Row>
                <Col className="App-post-title">
                  <span>{title}</span>
                </Col>
              </Row>
              <Row>
                <Col className="App-post-content">{content}</Col>
              </Row>
              <Row>
                <Col>
                  <span className="App-post-details App-post-comment">
                    {comments} comments
                  </span>
                  <span className="App-post-details App-post-category">
                    /d/{category}
                  </span>
                  <span className="App-post-details">by</span>
                  <span className="App-post-details App-post-user">{user}</span>
                  <span className="App-post-details">
                    {timestamp
                      ? Moment(timestamp * 1000 /* milliseconds */).fromNow()
                      : ""}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Post;
