import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/pagina-agro?fields=cases&populate=screens.slug&${query}`
    );
  },
};
