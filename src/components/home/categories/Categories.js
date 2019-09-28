import React, { useEffect, useContext } from "react";

import { Row, Col } from "react-bootstrap";

import CreatePost from "./CreatePost";
import CreateCategory from "./CreateCategory";

import CategoryUtils from "../../utils/discuss/Category";
import PostUtils from "../../utils/discuss/Post";
import { DataContext, DataConsumer } from "../../utils/DataProvider";
import EmptyRow from "../../utils/EmptyRow";

import "./Categories.css";

const selectCategory = async (ctx, categoryId) => {
  ctx.setLoadingPosts(true);
  ctx.setPosts([]);

  ctx.setCategoryId(categoryId);
  const posts = await PostUtils.getPosts(categoryId);
  ctx.setPosts(posts);

  ctx.setLoadingPosts(false);
};

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

  return (
    <div>
      <DataConsumer>
        {ctx =>
          ctx.address ? (
            <div>
              <CreatePost />
              <CreateCategory />
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
                e.id === ctx.categoryId ? "active" : ""
              } align-self-center`}
              onClick={() => selectCategory(ctx, e.id)}
            >
              <span>{e.category}</span>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export { selectCategory };
export default Categories;
