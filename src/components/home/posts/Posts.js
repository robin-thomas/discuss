import React, { useEffect, useContext } from "react";

import Post from "./Post";
import PostUtils from "../../utils/discuss/Post";
import Loader from "./Loader";
import { DataContext, DataConsumer } from "../../utils/DataProvider";

import "./Posts.css";

const Posts = props => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    PostUtils.getPosts(ctx.categoryId ? ctx.categoryId : undefined).then(
      posts => {
        ctx.setLoadingPosts(false);
        ctx.setPosts(posts);
      }
    );

    let id = setInterval(
      () =>
        PostUtils.getPosts(ctx.categoryId ? ctx.categoryId : undefined).then(
          ctx.setPosts
        ),
      120000
    );
    return () => clearInterval(id);
  }, [ctx.categoryId, ctx.setPosts, ctx.setLoadingPosts]);

  return (
    <DataConsumer>
      {ctx => (
        <div className="App-posts">
          <Loader />
          {ctx.posts.map((post, index) => (
            <div key={index}>
              <Post post={post} />
              <br />
            </div>
          ))}
        </div>
      )}
    </DataConsumer>
  );
};

export default Posts;
