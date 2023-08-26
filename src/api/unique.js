import client from "../services/http";

export default {
  getBasic: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/unique?populate=media&fields=title&fields=label&fields=description&${query}`
    );
  },
  getPartners: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/unique?populate=partners&fields=locale&${query}`);
  },
  getSpecialization: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/unique?populate=icon&fields=highlight&fields=highlight_description&${query}`
    );
  },
  getGlobalAtuation: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/unique?fields=global_title&fields=global_description&fields=global_num1&fields=global_num1_description&fields=global_num2&fields=global_num2_description&fields=global_num3&fields=global_num3_description&fields=global_map&${query}`
    );
  },
};
