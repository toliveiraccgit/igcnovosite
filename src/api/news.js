import client from "../services/http";

export default {
  get: ({ locale, count = 5 }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/news?populate=*&sort=createdAt:desc&pagination[pageSize]=${count}&${query}`
    );
  },

  highlights: ({ locale, count = 1 }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/news?populate=*&filters[flag][$eq]=Destaque&sort=createdAt:desc&pagination[pageSize]=${count}&${query}`
    );
  },

  find: ({ locale, id }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/news/${id}?populate=*&${query}`);
  },

  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-new?populate=*&${query}`);
  },
};
