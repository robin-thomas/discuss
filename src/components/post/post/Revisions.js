import React from "react";

import { Row, Col, Form } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

const Revisions = props => (
  <Col md="auto" className="ml-auto">
    <Row>
      <Col md="4" className="text-right">
        <span className="App-post-details">Revisions: </span>
      </Col>
      <Col md="7" className="ml-auto pl-0">
        <DataConsumer>
          {ctx => (
            <Form.Control
              as="select"
              size="sm"
              onChange={e => ctx.setRevision(e.target.value)}
            >
              {ctx.post.revisions.map((e, index) => (
                <option key={index} value={index}>
                  Revision {ctx.post.revisions.length - index}
                </option>
              ))}
            </Form.Control>
          )}
        </DataConsumer>
      </Col>
    </Row>
  </Col>
);

export default Revisions;
