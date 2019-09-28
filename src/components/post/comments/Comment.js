import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import { fromNow } from "../../utils/Moment";
import { DataConsumer } from "../../utils/DataProvider";
import { Upvote, Downvote, voteCount } from "../../utils/Vote";

import "./Comment.css";

const Comment = ({ commentId, comment, votes, user, timestamp, onClick }) => {
  const [blur, setBlur] = useState(voteCount(votes) < 0);

  const toggleBlur = () => {
    setBlur(blur => !blur);
  };

  return (
    <Row>
      <Col md="auto" className="pr-0">
        <DataConsumer>
          {ctx => (
            <div>
              <Upvote
                ctx={ctx}
                votes={votes}
                user={user}
                onClick={() => onClick(ctx, 1, commentId, user)}
              />
              <Downvote
                ctx={ctx}
                votes={votes}
                user={user}
                onClick={() => onClick(ctx, -1, commentId, user)}
              />
            </div>
          )}
        </DataConsumer>
      </Col>
      <Col>
        <Row>
          <Col>
            <span className="App-post-details App-post-user">{user}</span>
            <span className="App-post-details">&nbsp;·&nbsp;</span>
            <span className="App-post-details">{voteCount(votes)} points</span>
            <span className="App-post-details">&nbsp;·&nbsp;</span>
            <span className="App-post-details">{fromNow(timestamp)}</span>
            <span className="App-post-details">&nbsp;&nbsp;</span>
            {voteCount(votes) < 0 ? (
              <span
                className="App-post-details App-post-comment-unblur-trigger"
                title="Show this comment"
                onClick={toggleBlur}
              >
                ⊕
              </span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col className={`App-post-content ${blur ? "blur" : "unblur"}`}>
            {comment}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
