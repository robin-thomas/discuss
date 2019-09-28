import moment from "moment";

import Comment from "./Comment";
import Arweave from "../Arweave";

import { voteCount } from "../Vote";

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

  editPost: async ({ title, description }, categoryId, postId) => {
    return await Arweave.transaction(
      {
        title,
        description,
        postId
      },
      "Post",
      { id: categoryId, lookupType: "Category" }
    );
  },

  votePost: async (postId, vote, user) => {
    // TODO:
    // if vote = 1, send 0.10 AR to the user who made the post.
    // if vote = -1, send 0.10 AR to the miners.
    // await Arweave.transfer(user, '0.01');
    console.log(user, postId);

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

      let timestamp;
      transaction.get("tags").forEach(tag => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });

        switch (key) {
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
        timestamp,
        transaction
      };
    };

    let comments = await Arweave.get(lookup, mapper);
    return comments.map(e => {
      return {
        commentId: e.id,
        postId: postId,
        user: e.from,
        vote: parseInt(e.data),
        timestamp: e.timestamp
      };
    });
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
    if (categoryId === undefined || categoryId === null) {
      lookup.expr2 = {
        op: "equals",
        expr1: "Type",
        expr2: "Post"
      };
    }

    const mapper = async postId => {
      const votes = await Post.getVotes(postId);
      const comments = await Comment.getComments(postId);

      console.log(postId, votes, comments);

      const transaction = await Arweave.getClient().transactions.get(postId);
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      let categoryId;
      let timestamp;
      transaction.get("tags").forEach(tag => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });

        switch (key) {
          case "Category":
            categoryId = value;
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
        data: transaction.get("data", {
          decode: true,
          string: true
        }),
        votes,
        comments,
        categoryId,
        timestamp,
        from,
        transaction
      };
    };

    let posts = await Arweave.get(lookup, mapper);
    posts = posts.map(e => {
      const json = JSON.parse(e.data);
      return {
        postId: json.postId ? json.postId : e.id,
        title: json.title,
        description: json.description,
        categoryId: e.categoryId,
        votes: e.votes,
        comments: e.comments,
        user: e.from,
        timestamp: e.timestamp
      };
    });

    // reduce it to include revisions (title, description, categoryId, timestamp).
    posts = posts.reduce((p, e) => {
      if (p[e.postId] === undefined) {
        p[e.postId] = {
          postId: e.postId,
          votes: e.votes,
          comments: e.comments,
          user: e.user
        };
      }

      p[e.postId].votes = e.votes;
      p[e.postId].comments = e.comments;

      if (!("revisions" in p[e.postId])) {
        p[e.postId].revisions = [];
      }
      p[e.postId].revisions.push({
        title: e.title,
        description: e.description,
        categoryId: e.categoryId,
        timestamp: e.timestamp
      });

      return p;
    }, {});

    posts = Object.keys(posts).reduce((p, key) => {
      p.push(posts[key]);
      return p;
    }, []);

    // sort based on date and votes.
    return posts.sort((i, j) => {
      const firstDate = moment(Number(i.revisions[0].timestamp)).format(
        "YYYY-MM-DD"
      );
      const secondDate = moment(Number(j.revisions[0].timestamp)).format(
        "YYYY-MM-DD"
      );

      if (moment(firstDate).isAfter(secondDate)) {
        return -1; // i comes before j.
      } else if (moment(firstDate).isBefore(secondDate)) {
        return 1; // j comes before i.
      }

      // Dates match. sort based on voteCount.
      if (voteCount(i.votes) > voteCount(j.votes)) {
        return -1; // i comes before j.
      }

      return 0; // unchanged.
    });
  }
};

export default Post;
