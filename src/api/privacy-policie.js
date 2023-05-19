import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/privacy-policie?populate=*&${query}`);
  },
};
