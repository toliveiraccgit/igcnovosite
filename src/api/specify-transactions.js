import client from "../services/http";

export default {
  get: ({ locale, sector }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/transacoes?populate=image&populate=setor&filters[setor][name]=${sector}&${query}`
    );
  },
};
