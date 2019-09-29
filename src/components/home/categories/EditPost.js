import React, { useState, useContext } from "react";

import { Col, Row } from "react-bootstrap";

import CreatePostModal from "../CreatePostModal";

import PostUtils from "../../utils/discuss/Post";
import { DataConsumer, DataContext } from "../../utils/DataProvider";

const EditPost = props => {
  const ctx = useContext(DataContext);

  const [show, setShow] = useState(false);
  const [post, setPost] = useState({
    title: ctx.post.revisions[0].title,
    description: ctx.post.revisions[0].description,
    category: ctx.categories
      .filter(e => e.id === ctx.post.revisions[0].categoryId)
      .map(e => e.category)[0]
  });

  const onSubmit = (e, ctx) => {
    // create a new post.
    let categoryId = ctx.categories
      .filter(e => e.category === post.category)
      .map(e => e.id)[0];
    if (categoryId === undefined) {
      categoryId = ctx.categories[0].id;
    }

    PostUtils.editPost(
      {
        title: post.title,
        description: post.description
      },
      categoryId,
      ctx.post.postId
    ).then(console.log);

    alert("Your edited post will be published soon!");

    setShow(false);
  };

  return (
    <Row>
      <Col
        className="App-categories-create-post text-center"
        onClick={() => setShow(true)}
      >
        <span>Edit Post</span>
      </Col>
      <DataConsumer>
        {ctx => (
          <CreatePostModal
            show={show}
            setShow={setShow}
            title="Edit this Post"
            description="Edit this post. No admins or moderation."
            post={post}
            setPost={setPost}
            onSubmit={onSubmit}
            categoryId={ctx.post.revisions[0].categoryId}
          />
        )}
      </DataConsumer>
    </Row>
  );
};

export default EditPost;
