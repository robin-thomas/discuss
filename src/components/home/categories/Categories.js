import React, { useState, useEffect, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Post from "./Post";
import Category from "./Category";
import CategoryUtils from "../../utils/discuss/Category";
import { DataContext, DataConsumer } from "../../utils/DataProvider";

import "./Categories.css";

const Categories = props => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    let id = setInterval(
      () => CategoryUtils.getAll().then(ctx.setCategories),
      1000
    );
    return () => clearInterval(id);
  }, [ctx.categories, ctx.setCategories]);

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
        {ctx.categories.map((e, index) => (
          <Row key={index} style={{ height: "40px" }}>
            <Col
              className={`App-categories-category ${
                index === activeIndex ? "active" : ""
              } align-self-center`}
              onClick={() => onClick(index)}
            >
              <span>{e.category}</span>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Categories;
