import React from "react";

import { Row, Col } from "react-bootstrap";

const hasVoted = (ctx, votes) => {
  return votes.filter(e => e.user === ctx.address).length > 0;
};

const hasUpvoted = (ctx, votes) => {
  return votes.filter(e => e.user === ctx.address && e.vote === 1).length > 0;
};

const hasDownvoted = (ctx, votes) => {
  return votes.filter(e => e.user === ctx.address && e.vote === -1).length > 0;
};

const voteCount = votes => {
  if (votes.length === 0) {
    return 0;
  }
  return votes.map(e => e.vote).reduce((prev, curr) => prev + curr);
};

const Upvote = ({ ctx, votes, user, onClick }) => {
  return ctx.address && hasVoted(ctx, votes) && hasUpvoted(ctx, votes) ? (
    <Row>
      <Col className="App-post-vote-voted">▲</Col>
    </Row>
  ) : ctx.address && hasVoted(ctx, votes) ? (
    <Row>
      <Col>&nbsp;</Col>
    </Row>
  ) : ctx.address && ctx.address !== user ? (
    <Row>
      <Col className="App-post-vote-vote" onClick={onClick}>
        ▲
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>&nbsp;</Col>
    </Row>
  );
};

const Downvote = ({ ctx, votes, user, onClick }) => {
  return ctx.address && hasVoted(ctx, votes) && hasDownvoted(ctx, votes) ? (
    <Row>
      <Col className="App-post-vote-vote">▼</Col>
    </Row>
  ) : ctx.address && hasVoted(ctx, votes) ? (
    <Row>
      <Col>&nbsp;</Col>
    </Row>
  ) : ctx.address && ctx.address !== user ? (
    <Row>
      <Col className="App-post-vote-vote" onClick={onClick}>
        ▼
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>&nbsp;</Col>
    </Row>
  );
};

export { voteCount };
export { Upvote };
export { Downvote };