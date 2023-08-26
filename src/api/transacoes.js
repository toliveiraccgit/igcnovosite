import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/pagina-agro?populate=screens.transactions.image&populate=screens.banner&${query}`
    );
  },
  getBanner: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-agro?populate=screens.banner&${query}`);
  },
  getTestemony: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-agro?populate=screens.testimonies&${query}`);
  },
  getTransactionPage: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-transacoe?populate=banner&${query}`);
  },
};
