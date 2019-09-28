import AR from "arweave/web";

import config from "../../config.json";

const Arweave = {
  arweave: null,
  wallet: null,

  getClient: () => {
    if (Arweave.arweave === null) {
      Arweave.arweave = AR.init({
        host: config.arweave.host,
        port: config.arweave.port,
        protocol: config.arweave.protocol
      });
    }

    return Arweave.arweave;
  },

  getAddress: async wallet => {
    Arweave.wallet = wallet;
    return await Arweave.getClient().wallets.jwkToAddress(wallet);
  },

  status: async txnId => {
    return await Arweave.getClient().transactions.getStatus(txnId);
  },

  transfer: async (to, amount) => {
    let transaction = await Arweave.getClient().createTransaction(
      {
        target: to,
        quantity: Arweave.getClient().ar.arToWinston(amount)
      },
      Arweave.wallet
    );

    await Arweave.getClient().transactions.sign(transaction, Arweave.wallet);
    const response = await Arweave.getClient().transactions.post(transaction);

    if (response.status === 400 || response.status === 500) {
      throw new Error("Transaction failed");
    }

    return transaction.id;
  },

  transaction: async (data, type, lookup) => {
    let transaction = await Arweave.getClient().createTransaction(
      {
        data: JSON.stringify(data)
      },
      Arweave.wallet
    );

    transaction.addTag("AppName", config.app.name);
    transaction.addTag("AppVersion", config.app.version);
    transaction.addTag("UnixTime", Math.round(new Date().getTime() / 1000));
    transaction.addTag("Type", type);

    lookup = lookup || {};
    const { id, lookupType } = lookup;

    if (lookupType !== undefined && id !== undefined) {
      transaction.addTag(lookupType, id);
    }

    await Arweave.getClient().transactions.sign(transaction, Arweave.wallet);
    const response = await Arweave.getClient().transactions.post(transaction);

    if (response.status === 400 || response.status === 500) {
      throw new Error("Transaction failed");
    }

    return transaction.id;
  },

  get: async (lookup, mapper) => {
    const txnIds = await Arweave.getClient().arql(lookup);
    return await Promise.all(txnIds.map(mapper));
  },

  account: async address => {
    const lookup = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "App-Name",
        expr2: "arweave-id"
      },
      expr2: {
        op: "equals",
        expr1: "from",
        expr2: address
      }
    };

    const mapper = async id => {
      const transaction = await Arweave.getClient().transactions.get(id);

      let type = null;
      transaction.get("tags").forEach(tag => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });

        if (key === "Type") {
          type = value;
        }
      });

      return {
        data: transaction.get("data", {
          decode: true,
          string: true
        }),
        type
      };
    };

    const response = await Arweave.get(lookup, mapper);

    // Since latest changes are on top,
    // we wont reset any profile data we found already.
    return response.reduce((p, e) => {
      if (e.type === "name" && !("data" in p)) {
        p.name = e.data;
      } else if (e.type === "email" && !("email" in p)) {
        p.email = e.data;
      } else if (e.type === "twitter" && !("twitter" in p)) {
        p.twitter = e.data;
      }

      return p;
    }, {});
  }
};

export default Arweave;
