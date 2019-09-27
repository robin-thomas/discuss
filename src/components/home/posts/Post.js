/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import { Upvote, Downvote } from "../../utils/Vote";
import PostUtils from "../../utils/discuss/Post";
import { DataConsumer } from "../../utils/DataProvider";
import Moment from "../../utils/Moment";

import "./Post.css";

const Post = ({ post }) => {
  const {
    postId,
    votes,
    comments,
    categoryId,
    user,
    timestamp,
    title,
    description
  } = post;

  const [blur, setBlur] = useState(votes && votes < 0 ? true : false);

  const onClick = e => {
    if (e.target.classList.contains("App-posts-post-blur")) {
      setBlur(false);
    }
  };

  const postClick = ctx => {
    ctx.setPage("post");
    ctx.setPost(post);
  };

  const vote = async (ctx, vote) => {
    if (confirm("Are you sure you want to vote for this post?")) {
      console.log(await PostUtils.votePost(postId, vote, user));
    }
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
                {ctx => (
                  <Upvote
                    ctx={ctx}
                    votes={votes}
                    user={user}
                    onClick={() => vote(ctx, 1)}
                  />
                )}
              </DataConsumer>
              <Row>
                <Col className="App-post-vote-count">{votes.length}</Col>
              </Row>
              <DataConsumer>
                {ctx => (
                  <Downvote
                    ctx={ctx}
                    votes={votes}
                    user={user}
                    onClick={() => vote(ctx, -1)}
                  />
                )}
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
                <span className="App-post-details">&nbsp;·&nbsp;</span>
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
                <span className="App-post-details">&nbsp;·&nbsp;</span>
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
