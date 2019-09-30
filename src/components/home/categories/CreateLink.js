import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";

import PostUtils from "../../utils/discuss/Post";
import CreateLinkModal from "../CreateLinkModal";

const CreateLink = props => {
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
    if (categoryId === undefined || categoryId === null) {
      categoryId = ctx.categories[1].id;
    }

    PostUtils.createPost(
      {
        title: post.title,
        description: post.description
      },
      categoryId
    ).then(console.log);

    alert("Your link will be published soon!");

    setShow(false);
  };

  return (
    <Row>
      <Col
        className="App-categories-create-post text-center"
        onClick={() => setShow(true)}
      >
        <span>Add Link</span>
      </Col>
      <CreateLinkModal
        show={show}
        setShow={setShow}
        title="Add a link"
        description="Add a new link. No admins or moderation."
        post={post}
        setPost={setPost}
        onSubmit={onSubmit}
      />
    </Row>
  );
};

export default CreateLink;
