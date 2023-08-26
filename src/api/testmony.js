import client from "../services/http";

export default {
  getByType: ({ locale, type }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    const typeQuery = type ? `&filters[type]=${type}` : ``;

    return client.get(
      `/testemunhos?populate=company&populate=name&populate=testimony${typeQuery}&${query}`
    );
  },
};
