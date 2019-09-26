import Arweave from "../Arweave.js";

import * as config from "../../../config.json";

const Category = {
  createCategory: async categoryName => {
    return await Arweave.transaction(
      {
        name: categoryName
      },
      "Category"
    );
  },

  getAll: async () => {
    const lookup = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "AppName",
        expr2: config.app.name
      },
      expr2: {
        op: "equals",
        expr1: "Type",
        expr2: "Category"
      }
    };

    const mapper = async categoryId => {
      const transaction = await Arweave.getClient().transactions.get(
        categoryId
      );
      const from = await Arweave.getClient().wallets.ownerToAddress(
        transaction.get("owner")
      );

      return {
        id: transaction.get("id"),
        name: transaction.get("data", {
          decode: true,
          string: true
        }),
        from,
        transaction
      };
    };

    const response = await Arweave.get(lookup, mapper);
    return response.map(e => {
      return {
        id: e.id,
        category: JSON.parse(e.name).name
      };
    });
  }
};

export default Category;
