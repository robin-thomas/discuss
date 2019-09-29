import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";

import CreateCategoryModal from "../CreateCategoryModal";
import CategoryUtils from "../../utils/discuss/Category";

const CreateCategory = props => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");

  const onSubmit = () => {
    // create a new category.
    CategoryUtils.createCategory(category).then(console.log);

    alert("Your category will be created soon!");

    setShow(false);
  };

  return (
    <Row>
      <Col
        className="App-categories-create-category text-center"
        onClick={() => setShow(true)}
      >
        <span>Create Category</span>
      </Col>
      <CreateCategoryModal
        show={show}
        setShow={setShow}
        setCategory={setCategory}
        onSubmit={onSubmit}
      />
    </Row>
  );
};

export default CreateCategory;
