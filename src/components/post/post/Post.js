import React from "react";

import { Row, Col } from "react-bootstrap";

import Moment from "../../utils/Moment";
import { DataConsumer } from "../../utils/DataProvider";

import "./Post.css";

const Post = props => {
  const post = {
    title: "Amazing clone",
    votes: 12,
    content: "Discuss is a full stack clone of reddit",
    comments: 1,
    category: "programming",
    user: "john",
    timestamp: 1569298544
  };

  return (
    <div className="App-post">
      <Row>
        <Col>
          <div className="App-post">
            <Row>
              <Col md="auto" className="App-post-vote text-center pr-0">
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
                    <Col className="App-post-vote-count">{post.votes}</Col>
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
              <Col md="11">
                <Row>
                  <Col className="App-post-title">
                    <span>{post.title}</span>
                  </Col>
                </Row>
                <Row>
                  <Col className="App-post-content">{post.content}</Col>
                </Row>
                <Row>
                  <Col>
                    <span className="App-post-details App-post-comment">
                      {post.comments} comments
                    </span>
                    <span className="App-post-details App-post-category">
                      /d/{post.category}
                    </span>
                    <span className="App-post-details">by</span>
                    <span className="App-post-details App-post-user">
                      {post.user}
                    </span>
                    <span className="App-post-details">
                      {post.timestamp
                        ? Moment(
                            post.timestamp * 1000 /* milliseconds */
                          ).fromNow()
                        : ""}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Post;
