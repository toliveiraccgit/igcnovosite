import client from "../services/http";

export default {
  getBasic: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/partners?fields=name&${query}&sort=name`);
  },
  getAll: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/partners?populate=grupo&populate=photo&fields=name&fields=linkedin&fields=email&${query}&sort=name`
    );
  },
  getByGroupName: ({ locale, groupName }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/partners?populate=grupo&populate=photo&fields=name&fields=linkedin&fields=email&filters[grupo][name]=${groupName}&${query}&sort=name`
    );
  },
};
