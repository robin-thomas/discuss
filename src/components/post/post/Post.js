/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Revisions from "./Revisions";
import Comment from "../Comment";
import Comments from "../comments";

import EmptyRow from "../../utils/EmptyRow";
import { fromNow } from "../../utils/Moment";
import { DataConsumer, DataContext } from "../../utils/DataProvider";
import { Upvote, Downvote, voteCount } from "../../utils/Vote";
import PostUtils from "../../utils/discuss/Post";
import Formatter from "../../utils/Formatter";
import Validation from "../../utils/Validation";

import "./Post.css";

const Post = props => {
  const ctx = useContext(DataContext);

  const vote = (ctx, vote) => {
    if (confirm("Are you sure you want to vote for this post?")) {
      PostUtils.votePost(ctx.post.postId, vote, ctx.post.user)
        .then(txId => {
          console.log(`Transaction ID: ${txId}`);
          alert("Your vote will be published soon!");
        })
        .catch(alert);
    }
  };

  return (
    <div className="App-post">
      <Row>
        <Col md="auto" className="App-post-vote text-center pr-0">
          <div>
            <DataConsumer>
              {ctx => (
                <Upvote
                  ctx={ctx}
                  votes={ctx.post.votes}
                  user={ctx.post.user}
                  onClick={() => vote(ctx, 1)}
                />
              )}
            </DataConsumer>
            <Row>
              <Col className="App-post-vote-count">
                {voteCount(ctx.post.votes)}
              </Col>
            </Row>
            <DataConsumer>
              {ctx => (
                <Downvote
                  ctx={ctx}
                  votes={ctx.post.votes}
                  user={ctx.post.user}
                  onClick={() => vote(ctx, -1)}
                />
              )}
            </DataConsumer>
          </div>
        </Col>
        <Col>
          <Row>
            <Col md="8" className="App-post-title">
              <span>
                {Validation.link(ctx.post.revisions[ctx.revision].title) ? (
                  <a
                    href={ctx.post.revisions[ctx.revision].title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctx.post.revisions[ctx.revision].title.length < 60
                      ? ctx.post.revisions[ctx.revision].title
                      : `${ctx.post.revisions[ctx.revision].title.substr(
                          0,
                          60
                        )}...`}
                  </a>
                ) : ctx.post.revisions[ctx.revision].title.length < 60 ? (
                  ctx.post.revisions[ctx.revision].title
                ) : (
                  `${ctx.post.revisions[ctx.revision].title.substr(0, 60)}...`
                )}
              </span>
            </Col>
            <Revisions />
          </Row>
          <Row>
            <Col className="App-post-content">
              {Formatter.formatText(
                ctx.post.revisions[ctx.revision].description
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="App-post-details App-post-comment">
                {ctx.post.comments.length} comments
              </span>
              <span className="App-post-details">&nbsp;·&nbsp;</span>
              <span className="App-post-details App-post-category">
                /d/
                {
                  ctx.categories
                    .filter(
                      e => e.id === ctx.post.revisions[ctx.revision].categoryId
                    )
                    .map(e => e.category)[0]
                }
              </span>
              <span className="App-post-details">by</span>
              <span
                className="App-post-details App-post-user"
                onClick={() => {
                  ctx.setPage("profile");
                  ctx.setProfile(ctx.post.user);
                }}
              >
                {ctx.post.user}
              </span>
              <span className="App-post-details">&nbsp;·&nbsp;</span>
              <span className="App-post-details">
                {fromNow(ctx.post.revisions[ctx.revision].timestamp)}
              </span>
            </Col>
          </Row>
          <EmptyRow />
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
