import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/pagina-ipo-advisor?populate=manager.parceiro.photo&populate=about.cards&populate=about.mobile&populate=chart.image&populate=more.cards&populate=more.mobile&${query}`
    );
  },
};
