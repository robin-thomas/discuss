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
    ctx.setRevision(0);
  };

  const vote = (ctx, vote) => {
    if (confirm("Are you sure you want to vote for this post?")) {
      PostUtils.votePost(postId, vote, user)
        .then(txId => {
          console.log(`Transaction ID: ${txId}`);
          alert("Your vote will be published soon!");
        })
        .catch(alert);
    }
  };

  return (
    <Row>
      <Col className="App-posts-post">
        <Row
          className={`${blur ? "App-posts-post-blur" : ""}`}
          onClick={onClick}
        >
          <Col md="1" xs="2" className="App-posts-post-vote text-center px-0">
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
          <Col md="11" xs="10" className="App-posts-post-content">
            <Row>
              <Col className="App-posts-post-title">
                <DataConsumer>
                  {ctx => (
                    <span onClick={() => postClick(ctx)}>
                      {revisions[0].title.length < 60
                        ? revisions[0].title
                        : `${revisions[0].title.substr(0, 60)}...`}
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
              <Col md="12" xs="12">
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
                <span className="App-post-details">&nbsp;·&nbsp;</span>
                <span className="App-posts-post-details">
                  {fromNow(revisions[0].timestamp)}
                </span>
              </Col>
              <Col md="12" xs="12">
                <span className="App-posts-post-details">by</span>
                <DataConsumer>
                  {ctx => (
                    <span
                      className="App-posts-post-details App-posts-post-user"
                      onClick={() => {
                        ctx.setPage("profile");
                        ctx.setProfile(user);
                      }}
                    >
                      {user}
                    </span>
                  )}
                </DataConsumer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Post;
