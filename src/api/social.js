import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/pagina-social?populate[supports][populate]=*&populate[image][populate]=*&${query}`
    );
  },
};
