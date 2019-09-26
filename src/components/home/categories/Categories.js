import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import Post from "./Post";
import Category from "./Category";
import { DataConsumer } from "../../utils/DataProvider";

import "./Categories.css";

const Categories = props => {
  const categories = ["all", "hello", "funny", "videos"];

  const [activeIndex, setActiveIndex] = useState(0);
  const onClick = index => {
    setActiveIndex(index);
  };

  return (
    <div>
      <DataConsumer>
        {ctx =>
          ctx.address ? (
            <div>
              <Post />
              <Category />
              <Row>
                <Col>&nbsp;</Col>
              </Row>
            </div>
          ) : null
        }
      </DataConsumer>
      <div className="App-categories">
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
    </div>
  );
};

export default Categories;
