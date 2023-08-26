import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/home?populate=banner.image&populate=banner.metrics&fields[0]=clients&fields[1]=services&${query}`
    );
  },
  getTransactions: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/home?populate=transaction.transactions.image&fields=locale&${query}`
    );
  },
};
