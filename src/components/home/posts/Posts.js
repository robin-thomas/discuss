import React from "react";

import Post from "./Post";

import "./Posts.css";

const Posts = props => {
  const posts = [
    {
      title: "Amazing clone",
      votes: 12,
      content: "Discuss is a full stack clone of reddit",
      comments: 1,
      category: "programming",
      user: "john",
      timestamp: 1569298544
    },
    {
      title: "Hello",
      votes: -1,
      content: "Hello all therw!",
      comments: 2,
      category: "fun",
      user: "dan",
      timestamp: 1569298544
    },
    {
      title: "The entire Shrek movie, remade by over 200 people",
      votes: 33,
      content:
        "Now you can share your very insightful thoughts with the world. Theres a lot more things that need to be worked on...",
      comments: 3,
      category: "music",
      user: "robin"
    }
  ];

  return (
    <div className="App-posts">
      {posts.map((post, index) => (
        <div>
          <Post key={index} post={post} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Posts;
