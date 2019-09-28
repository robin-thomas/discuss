import React from "react";

import { Row, Col } from "react-bootstrap";

import { fromNow } from "../../utils/Moment";
import { DataConsumer } from "../../utils/DataProvider";
import { Upvote, Downvote, voteCount } from "../../utils/Vote";

const Comment = ({ commentId, comment, votes, user, timestamp, onClick }) => {
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
          </Col>
        </Row>
        <Row>
          <Col className="App-post-content">{comment}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
