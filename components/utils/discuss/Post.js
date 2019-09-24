import Arweave from "../Arweave.js";

import * as config from "../../../config.json";

const Post = {
  createPost: async ({ title, description }, categoryId) => {
    return await Arweave.transaction(
      {
        title,
        description
      },
      "Post",
      { id: categoryId, lookupType: "Category" }
    );
  },

  editPost: ({ title, description }, categoryId, postId) => {
    // TODO
  },

  votePost: async (postId, vote) => {
    return await Arweave.transaction(vote, "Vote", {
      id: postId,
      lookupType: "Post"
    });
  },

  getVotes: async postId => {
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
          expr1: "Post",
          expr2: postId
        }
      }
    };

    const mapper = async voteId => {
      const transaction = await Arweave.getClient().transactions.get(voteId);
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

  getPosts: async categoryId => {
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
          expr2: "Post"
        },
        expr2: {
          op: "equals",
          expr1: "Category",
          expr2: categoryId
        }
      }
    };

    const mapper = async postId => {
      const votes = await Post.getVotes(postId);
      const comments = await Comment.getComments(postId);

      const transaction = await Arweave.getClient().transactions.get(postId);
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      return {
        id: transaction.get("id"),
        title: transaction.get("data", {
          decode: true,
          string: true
        }),
        votes,
        from,
        transaction
      };
    };

    return await Arweave.get(lookup, mapper);
  }
};

export default Post;
