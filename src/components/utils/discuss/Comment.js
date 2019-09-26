import Arweave from "../Arweave.js";

import * as config from "../../../config.json";

const Comment = {
  createComment: async (postId, comment) => {
    return await Arweave.transaction(
      {
        comment
      },
      "Comment",
      { id: postId, lookupType: "Post" }
    );
  },

  voteComment: async (commentId, vote) => {
    return await Arweave.transaction(vote, "Vote", {
      id: commentId,
      lookupType: "Comment"
    });
  },

  getVotes: async commentId => {
    const lookup = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "AppName",
        expr2: config.app.name
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Type",
          expr2: "Vote"
        },
        expr2: {
          op: "equals",
          expr1: "Comment",
          expr2: commentId
        }
      }
    };

    const mapper = async commentId => {
      const transaction = await Arweave.getClient().transactions.get(commentId);
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      return {
        id: transaction.get("id"),
        from,
        vote: transaction.get("data", {
          decode: true,
          number: true
        }),
        transaction
      };
    };

    return await Arweave.get(lookup, mapper);
  },

  getComments: async postId => {
    const lookup = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "AppName",
        expr2: config.app.name
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Type",
          expr2: "Comment"
        },
        expr2: {
          op: "equals",
          expr1: "Post",
          expr2: postId
        }
      }
    };

    const mapper = async commentId => {
      const votes = await Comment.getVotes(commentId);
      const transaction = await Arweave.getClient().transactions.get(commentId);
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      let postId;
      let timestamp;
      transaction.get("tags").forEach(tag => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });

        switch (key) {
          case "Post":
            postId = value;
            break;

          case "UnixTime":
            timestamp = value;
            break;

          default:
            break;
        }
      });

      return {
        id: transaction.get("id"),
        from,
        data: transaction.get("data", {
          decode: true,
          string: true
        }),
        votes,
        postId,
        timestamp,
        transaction
      };
    };

    let comments = await Arweave.get(lookup, mapper);
    return comments.map(e => {
      const json = JSON.parse(e.data);
      return {
        id: e.id,
        comment: json.comment,
        postId: e.postId,
        votes: e.votes,
        user: e.from,
        timestamp: e.timestamp
      };
    });
  }
};

export default Comment;
