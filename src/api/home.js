import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/home?populate=banner.image&populate=banner.metrics&populate=transaction.transactions.image&populate=testmonys&${query}`
    );
  },
};
