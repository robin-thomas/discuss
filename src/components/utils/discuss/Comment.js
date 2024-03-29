import Arweave from "../Arweave.js";

import moment from "moment";

import { voteCount } from "../Vote";

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

  voteComment: async (commentId, vote, user) => {
    // if vote = 1, send 0.10 AR to the user who made the post.
    // if vote = -1, send 0.10 AR to the miners.
    try {
      if (Number(vote) > 0) {
        console.log(await Arweave.transfer(user, config.arweave.tip));
      } else {
        console.log(await Arweave.transferToMiners(config.arweave.tip));
      }
    } catch (err) {
      if (Number(vote) > 0) {
        throw new Error(`Failed to reward ${config.arweave.tip}AR to ${user}`);
      } else {
        throw new Error(
          `Failed to reward ${config.arweave.tip}AR to the miners`
        );
      }
    }

    try {
      return await Arweave.transaction(vote, "Vote", {
        id: commentId,
        lookupType: "Comment"
      });
    } catch (err) {
      throw new Error("Failed to make a vote transaction!");
    }
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
        data: transaction.get("data", {
          decode: true,
          string: true
        }),
        transaction
      };
    };

    let votes = await Arweave.get(lookup, mapper);
    return votes.map(e => {
      const data = JSON.parse(e.data);
      return {
        vote: Number(data),
        user: e.from
      };
    });
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
            timestamp = Number(value);
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
    comments = comments.map(e => {
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

    // sort based on date and votes.
    return comments.sort((i, j) => {
      const firstDate = moment(i.timestamp).format("YYYY-MM-DD");
      const secondDate = moment(j.timestamp).format("YYYY-MM-DD");

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

export default Comment;
