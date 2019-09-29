import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";

import PostUtils from "../../utils/discuss/Post";
import CreatePostModal from "../CreatePostModal";

const CreatePost = props => {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState({
    title: null,
    description: null,
    category: null
  });

  const onSubmit = (e, ctx) => {
    // create a new post.
    let categoryId = ctx.categories
      .filter(e => e.category === post.category)
      .map(e => e.id)[0];
    if (categoryId === undefined) {
      categoryId = ctx.categories[0].id;
    }

    PostUtils.createPost(
      {
        title: post.title,
        description: post.description
      },
      categoryId
    ).then(console.log);

    alert("Your post will be created soon!");

    setShow(false);
  };

  return (
    <Row>
      <Col
        className="App-categories-create-post text-center"
        onClick={() => setShow(true)}
      >
        <span>Create Post</span>
      </Col>
      <CreatePostModal
        show={show}
        setShow={setShow}
        title="Create New Post"
        description="Create a new post. No admins or moderation."
        post={post}
        setPost={setPost}
        onSubmit={onSubmit}
      />
    </Row>
  );
};

export default CreatePost;
