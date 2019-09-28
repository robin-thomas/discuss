import React from "react";

import Home from "../home";
import Post from "../post";
import Profile from "../profile";

const getComponent = page => {
  switch (page) {
    case "post":
      return <Post />;

    case "profile":
      return <Profile />;

    case "home":
    default:
      return <Home />;
  }
};

export default getComponent;
