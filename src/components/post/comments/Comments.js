/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React from "react";

import { Row, Col } from "react-bootstrap";

import Moment from "../../utils/Moment";
import { DataConsumer } from "../../utils/DataProvider";
import { Upvote, Downvote, voteCount } from "../../utils/Vote";
import CommentUtils from "../../utils/discuss/Comment";

import "./Comments.css";

const Comments = props => {
  const vote = async (ctx, vote, commentId, user) => {
    if (confirm("Are you sure you want to vote for this post?")) {
      console.log(await CommentUtils.votePost(commentId, vote, user));
    }
  };

  return (
    <DataConsumer>
      {ctx =>
        ctx.post.comments.map((e, index) => (
          <Row key={index}>
            <Col md="auto" className="pr-0">
              <DataConsumer>
                {ctx => (
                  <div>
                    <Upvote
                      ctx={ctx}
                      votes={e.votes}
                      user={e.user}
                      onClick={() => vote(ctx, 1, e.id, e.user)}
                    />
                    <Downvote
                      ctx={ctx}
                      votes={e.votes}
                      user={e.user}
                      onClick={() => vote(ctx, -1, e.id, e.user)}
                    />
                  </div>
                )}
              </DataConsumer>
            </Col>
            <Col>
              <Row>
                <Col>
                  <span className="App-post-details App-post-user">
                    {e.user}
                  </span>
                  <span className="App-post-details">&nbsp;·&nbsp;</span>
                  <span className="App-post-details">
                    {voteCount(e.votes)} points
                  </span>
                  <span className="App-post-details">&nbsp;·&nbsp;</span>
                  <span className="App-post-details">
                    {e.timestamp
                      ? Moment(e.timestamp * 1000 /* milliseconds */).fromNow()
                      : ""}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col className="App-post-content">{e.comment}</Col>
              </Row>
            </Col>
          </Row>
        ))
      }
    </DataConsumer>
  );
};

export default Comments;
