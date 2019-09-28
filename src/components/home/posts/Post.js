/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import Formatter from "../../utils/Formatter";
import { Upvote, Downvote, voteCount } from "../../utils/Vote";
import PostUtils from "../../utils/discuss/Post";
import { DataConsumer } from "../../utils/DataProvider";
import { fromNow } from "../../utils/Moment";
import { selectCategory } from "../categories/Categories";

import "./Post.css";

const Post = ({ post }) => {
  const { postId, revisions, votes, comments, user } = post;

  const [blur, setBlur] = useState(voteCount(votes) < 0);

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
                <Col className="App-post-vote-count">{voteCount(votes)}</Col>
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
                  {ctx => (
                    <span onClick={() => postClick(ctx)}>
                      {revisions[0].title}
                    </span>
                  )}
                </DataConsumer>
              </Col>
            </Row>
            <Row>
              <Col className="App-posts-post-desc">
                {Formatter.formatText(revisions[0].description)}
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="App-posts-post-details App-posts-post-comment">
                  {comments.length} comments
                </span>
                <span className="App-post-details">&nbsp;·&nbsp;</span>
                <DataConsumer>
                  {ctx => (
                    <span
                      className="App-posts-post-details App-posts-post-category"
                      onClick={() =>
                        selectCategory(ctx, revisions[0].categoryId)
                      }
                    >
                      /d/
                      {
                        ctx.categories
                          .filter(e => e.id === revisions[0].categoryId)
                          .map(e => e.category)[0]
                      }
                    </span>
                  )}
                </DataConsumer>
                <span className="App-posts-post-details">by</span>
                <DataConsumer>
                  {ctx => (
                    <span
                      className="App-posts-post-details App-posts-post-user"
                      onClick={() => ctx.setPage("profile")}
                    >
                      {user}
                    </span>
                  )}
                </DataConsumer>
                <span className="App-post-details">&nbsp;·&nbsp;</span>
                <span className="App-posts-post-details">
                  {fromNow(revisions[0].timestamp)}
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
