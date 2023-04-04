import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/pagina-agro?populate=screens.news&populate=screens.transactions.image&populate=screens.news&populate=screens.testimonies&${query}`
    );
  },
};
