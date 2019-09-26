import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";
import Moment from "../../utils/Moment";

import "./Post.css";

const Post = ({
  post: { votes, comments, categoryId, user, timestamp, title, description }
}) => {
  const [blur, setBlur] = useState(votes && votes < 0 ? true : false);

  const onClick = e => {
    if (e.target.classList.contains("App-posts-post-blur")) {
      setBlur(false);
    }
  };

  const postClick = ctx => {
    ctx.setPage("post");
  };

  return (
    <Row>
      <Col className="App-posts-post">
        <Row
          className={`${blur ? "App-posts-post-blur" : ""}`}
          onClick={onClick}
        >
          <Col md="auto" className="App-posts-post-vote text-center px-0">
            <div>
              <DataConsumer>
                {ctx =>
                  ctx.address ? (
                    <Row>
                      <Col className="App-post-vote-vote">▲</Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>&nbsp;</Col>
                    </Row>
                  )
                }
              </DataConsumer>
              <Row>
                <Col className="App-post-vote-count">{votes.length}</Col>
              </Row>
              <DataConsumer>
                {ctx =>
                  ctx.address ? (
                    <Row>
                      <Col className="App-post-vote-vote">▼</Col>
                    </Row>
                  ) : null
                }
              </DataConsumer>
            </div>
          </Col>
          <Col className="App-posts-post-content">
            <Row>
              <Col className="App-posts-post-title">
                <DataConsumer>
                  {ctx => <span onClick={() => postClick(ctx)}>{title}</span>}
                </DataConsumer>
              </Col>
            </Row>
            <Row>
              <Col className="App-posts-post-desc">{description}</Col>
            </Row>
            <Row>
              <Col>
                <span className="App-posts-post-details App-posts-post-comment">
                  {comments.length} comments
                </span>
                <DataConsumer>
                  {ctx => (
                    <span className="App-posts-post-details App-posts-post-category">
                      /d/
                      {
                        ctx.categories
                          .filter(e => e.id === categoryId)
                          .map(e => e.category)[0]
                      }
                    </span>
                  )}
                </DataConsumer>
                <span className="App-posts-post-details">by</span>
                <span className="App-posts-post-details App-posts-post-user">
                  {user}
                </span>
                <span className="App-posts-post-details">
                  {timestamp
                    ? Moment(timestamp * 1000 /* milliseconds */).fromNow()
                    : ""}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Post;
