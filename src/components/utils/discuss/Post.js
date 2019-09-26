import Comment from "./Comment";
import Arweave from "../Arweave";

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
    let lookup = {
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
    if (categoryId === undefined) {
      lookup.expr2 = {
        op: "equals",
        expr1: "Type",
        expr2: "Post"
      };
    }

    const mapper = async postId => {
      const votes = await Post.getVotes(postId);
      const comments = await Comment.getComments(postId);

      const transaction = await Arweave.getClient().transactions.get(postId);
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      let categoryId;
      transaction.get("tags").forEach(tag => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });
        if (key === "Category") {
          categoryId = value;
        }
      });

      return {
        id: transaction.get("id"),
        data: transaction.get("data", {
          decode: true,
          string: true
        }),
        votes,
        comments,
        categoryId,
        from,
        transaction
      };
    };

    let posts = await Arweave.get(lookup, mapper);
    return posts.map(e => {
      const json = JSON.parse(e.data);
      return {
        title: json.title,
        description: json.description,
        categoryId: e.categoryId,
        votes: e.votes,
        comments: e.comments
      };
    });
  }
};

export default Post;
