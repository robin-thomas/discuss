import React, { useEffect, useContext } from "react";

import Post from "./Post";
import PostUtils from "../../utils/discuss/Post";
import { DataContext, DataConsumer } from "../../utils/DataProvider";

import "./Posts.css";

const Posts = props => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    let id = setInterval(() => PostUtils.getPosts().then(ctx.setPosts), 2000);
    return () => clearInterval(id);
  }, [ctx.posts, ctx.setPosts]);

  return (
    <DataConsumer>
      {ctx => (
        <div className="App-posts">
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
