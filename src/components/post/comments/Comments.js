import React from "react";

import { Row, Col } from "react-bootstrap";

import Moment from "../../utils/Moment";
import { DataConsumer } from "../../utils/DataProvider";

import "./Comments.css";

const Comments = props => {
  return (
    <DataConsumer>
      {ctx =>
        ctx.post.comments.map((e, index) => (
          <Row key={index}>
            <Col md="auto">
              <DataConsumer>
                {ctx =>
                  ctx.address && ctx.address !== e.user ? (
                    <div>
                      <Row>
                        <Col className="App-post-vote-vote">▲</Col>
                      </Row>
                      <Row>
                        <Col className="App-post-vote-vote">▼</Col>
                      </Row>
                    </div>
                  ) : null
                }
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
                    {ctx.post.votes.length} points
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
