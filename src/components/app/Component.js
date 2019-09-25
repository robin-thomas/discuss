import React from "react";

import Home from "../home";
import Post from "../post";

const getComponent = page => {
  switch (page) {
    case "post":
      return <Post />;

    case "home":
    default:
      return <Home />;
  }
};

export default getComponent;
