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

  transaction: async (data, type, { id, lookupType }) => {
    const transaction = await Arweave.arweave.createTransaction(
      {
        data: data
      },
      /* TODO */ Arweave.wallet
    );

    transaction.addTag("AppName", config.app.name);
    transaction.addTag("AppVersion", config.app.version);
    transaction.addTag("UnixTime", Math.round(new Date().getTime() / 1000));
    transaction.addTag("Type", type);

    if (lookup !== undefined && id !== undefined) {
      transaction.addTag(lookupType, id);
    }

    await arweave.transactions.sign(transaction, Arweave.wallet);
    return await arweave.transactions.post(transaction);
  },

  get: async (lookup, mapper) => {
    const txnIds = await Arweave.getClient().arql(lookup);
    return await Promise.all(txids.map(mapper));
  },

  createPost: async post => {
    const transaction = await arweave.createTransaction(
      {
        data: post
      },
      Arweave.wallet
    );

    transaction.addTag("AppName", config.app.name);
    transaction.addTag("AppVersion", config.app.version);
    transaction.addTag("UnixTime", Math.round(new Date().getTime() / 1000));
    transaction.addTag("Type", "Post");

    await arweave.transactions.sign(transaction, Arweave.wallet);
    const response = await arweave.transactions.post(transaction);
  }
};

export default Arweave;
