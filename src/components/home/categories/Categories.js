import React, { useState, useEffect, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Post from "./Post";
import Category from "./Category";
import CategoryUtils from "../../utils/discuss/Category";
import PostUtils from "../../utils/discuss/Post";
import { DataContext, DataConsumer } from "../../utils/DataProvider";
import EmptyRow from "../../utils/EmptyRow";

import "./Categories.css";

const Categories = props => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    let id = setInterval(async () => {
      let categories = await CategoryUtils.getAll();
      if (!categories.map(e => e.category).includes("all")) {
        categories.unshift({
          id: null,
          category: "all"
        });
      }
      ctx.setCategories(categories);
    }, 1000);
    return () => clearInterval(id);
  }, [ctx.setCategories]);

  const [activeIndex, setActiveIndex] = useState(0);
  const onClick = async (index, categoryId) => {
    setActiveIndex(index);
    ctx.setLoadingPosts(true);
    ctx.setPosts([]);

    // "all" category selected.
    if (index === 0) {
      ctx.setCategoryId(null);
      const posts = await PostUtils.getPosts();
      ctx.setPosts(posts);
    } else {
      ctx.setCategoryId(categoryId);
      const posts = await PostUtils.getPosts(categoryId);
      ctx.setPosts(posts);
    }

    ctx.setLoadingPosts(false);
  };

  return (
    <div>
      <DataConsumer>
        {ctx =>
          ctx.address ? (
            <div>
              <Post />
              <Category />
              <EmptyRow />
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
              onClick={() => onClick(index, e.id)}
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
