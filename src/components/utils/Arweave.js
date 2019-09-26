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

  transaction: async (data, type, lookup) => {
    let transaction = await Arweave.arweave.createTransaction(
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
  }
};

export default Arweave;
