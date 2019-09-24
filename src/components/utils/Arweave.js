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

  transaction: async (data, type, { id, lookupType }) => {
    const transaction = await Arweave.arweave.createTransaction(
      {
        data: data
      },
      Arweave.wallet
    );

    transaction.addTag("AppName", config.app.name);
    transaction.addTag("AppVersion", config.app.version);
    transaction.addTag("UnixTime", Math.round(new Date().getTime() / 1000));
    transaction.addTag("Type", type);

    if (lookupType !== undefined && id !== undefined) {
      transaction.addTag(lookupType, id);
    }

    await Arweave.getClient().transactions.sign(transaction, Arweave.wallet);
    return await Arweave.getClient().transactions.post(transaction);
  },

  get: async (lookup, mapper) => {
    const txnIds = await Arweave.getClient().arql(lookup);
    return await Promise.all(txnIds.map(mapper));
  },

  createPost: async post => {
    const transaction = await Arweave.getClient().createTransaction(
      {
        data: post
      },
      Arweave.wallet
    );

    transaction.addTag("AppName", config.app.name);
    transaction.addTag("AppVersion", config.app.version);
    transaction.addTag("UnixTime", Math.round(new Date().getTime() / 1000));
    transaction.addTag("Type", "Post");

    await Arweave.getClient().transactions.sign(transaction, Arweave.wallet);
    const response = await Arweave.getClient().transactions.post(transaction);
  }
};

export default Arweave;
