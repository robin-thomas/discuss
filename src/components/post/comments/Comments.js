/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React from "react";

import Comment from "./Comment";
import { DataConsumer } from "../../utils/DataProvider";
import CommentUtils from "../../utils/discuss/Comment";

const Comments = props => {
  const vote = (ctx, vote, commentId, user) => {
    if (confirm("Are you sure you want to vote for this post?")) {
      CommentUtils.voteComment(commentId, vote, user)
        .then(txId => {
          console.log(`Transaction ID: ${txId}`);
          alert("Your vote will be published soon!");
        })
        .catch(alert);
    }
  };

  return (
    <DataConsumer>
      {ctx =>
        ctx.post.comments.map((e, index) => (
          <Comment
            key={index}
            commentId={e.id}
            votes={e.votes}
            user={e.user}
            timestamp={e.timestamp}
            comment={e.comment}
            onClick={vote}
          />
        ))
      }
    </DataConsumer>
  );
};

export default Comments;
