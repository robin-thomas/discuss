import React, { useEffect, useContext } from "react";

import Post from "./Post";
import PostUtils from "../../utils/discuss/Post";
import Loader from "./Loader";
import NoPosts from "./NoPosts";
import { DataContext, DataConsumer } from "../../utils/DataProvider";

const Posts = props => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    // Load it the first time.
    PostUtils.getPosts(ctx.categoryId ? ctx.categoryId : undefined).then(
      posts => {
        ctx.setLoadingPosts(false);
        ctx.setPosts(posts);
      }
    );

    // Refreshes every 2 minutes.
    let id = setInterval(
      () =>
        PostUtils.getPosts(ctx.categoryId ? ctx.categoryId : undefined).then(
          posts => {
            // Dont load posts when an operation is going on.
            if (!ctx.loadingPosts) {
              ctx.setPosts(posts);
            }
          }
        ),
      120000 // 2 minutes.
    );
    return () => clearInterval(id);
  }, [ctx.categoryId, ctx.setPosts, ctx.setLoadingPosts]);

  return (
    <DataConsumer>
      {ctx => (
        <div className="App-posts">
          <Loader />
          {!ctx.loadingPosts && ctx.posts && ctx.posts.length > 0 ? (
            ctx.posts.map((post, index) => (
              <div key={index}>
                <Post post={post} />
                <br />
              </div>
            ))
          ) : !ctx.loadingPosts ? (
            <NoPosts />
          ) : null}
        </div>
      )}
    </DataConsumer>
  );
};

export default Posts;
