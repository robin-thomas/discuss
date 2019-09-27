import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Comment from "../Comment";
import Comments from "../comments";

import Moment from "../../utils/Moment";
import { DataConsumer, DataContext } from "../../utils/DataProvider";

import "./Post.css";

const Post = props => {
  const ctx = useContext(DataContext);

  return (
    <div className="App-post">
      <Row>
        <Col md="auto" className="App-post-vote text-center pr-0">
          <div>
            <DataConsumer>
              {ctx =>
                ctx.address && ctx.address !== ctx.post.user ? (
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
              <Col className="App-post-vote-count">{ctx.post.votes.length}</Col>
            </Row>
            <DataConsumer>
              {ctx =>
                ctx.address && ctx.address !== ctx.post.user ? (
                  <Row>
                    <Col className="App-post-vote-vote">▼</Col>
                  </Row>
                ) : null
              }
            </DataConsumer>
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="App-post-title">
              <span>{ctx.post.title}</span>
            </Col>
          </Row>
          <Row>
            <Col className="App-post-content">{ctx.post.description}</Col>
          </Row>
          <Row>
            <Col>
              <span className="App-post-details App-post-comment">
                {ctx.post.comments.length} comments
              </span>
              <span className="App-post-details App-post-category">
                /d/
                {
                  ctx.categories
                    .filter(e => e.id === ctx.post.categoryId)
                    .map(e => e.category)[0]
                }
              </span>
              <span className="App-post-details">by</span>
              <span className="App-post-details App-post-user">
                {ctx.post.user}
              </span>
              <span className="App-post-details">
                {ctx.post.timestamp
                  ? Moment(
                      ctx.post.timestamp * 1000 /* milliseconds */
                    ).fromNow()
                  : ""}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <DataConsumer>
            {ctx =>
              ctx.address ? (
                <Row>
                  <Col>
                    <Comment />
                  </Col>
                </Row>
              ) : null
            }
          </DataConsumer>
          <hr />
          <Comments />
        </Col>
      </Row>
    </div>
  );
};

export default Post;
