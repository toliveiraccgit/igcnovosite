import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/servicos?populate=*&${query}`);
  },

  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-servico?populate=*&${query}`);
  },
};
