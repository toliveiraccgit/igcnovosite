import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/testemunhos?populate=company&populate=name&populate=testimony&${query}`
    );
  },
};
