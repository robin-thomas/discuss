import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

import "./Categories.css";

const Categories = props => {
  const categories = ["all", "hello", "funny", "videos"];

  const [activeIndex, setActiveIndex] = useState(0);
  const onClick = index => {
    setActiveIndex(index);
  };

  return (
    <div className="App-categories">
      <DataConsumer>
        {ctx =>
          ctx.address ? (
            <Row>
              <Col className="App-categories-create-post text-center">
                <span>Create Post</span>
              </Col>
            </Row>
          ) : null
        }
      </DataConsumer>
      <Row>
        <Col className="App-categories-title text-center">Categories</Col>
      </Row>
      {categories.map((category, index) => (
        <Row key={index} style={{ height: "40px" }}>
          <Col
            className={`App-categories-category ${
              index === activeIndex ? "active" : ""
            } align-self-center`}
            onClick={() => onClick(index)}
          >
            <a>{category}</a>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Categories;
