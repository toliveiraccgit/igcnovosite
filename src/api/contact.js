import client from "../services/http";

export default {
  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/contact?populate=*&${query}`);
  },

  send: (data) => {
    return client.post(`/controllers/contact`, data);
  },
};
