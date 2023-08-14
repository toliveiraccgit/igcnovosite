import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/servicos?populate=button&populate=description&populate=name&populate=image.url&${query}`
    );
  },
};
