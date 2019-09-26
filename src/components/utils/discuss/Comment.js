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

      return {
        id: transaction.get("id"),
        from,
        comment: transaction.get("data", {
          decode: true,
          number: true
        }),
        votes,
        transaction
      };
    };

    return await Arweave.get(lookup, mapper);
  }
};

export default Comment;
