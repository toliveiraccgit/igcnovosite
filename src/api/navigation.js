import client from "../services/http";

export default {
  get_navigation: ({ locale }) => {
    const query = new URLSearchParams({
      type: "TREE",
      populate: "*",
      ...(locale && { locale }),
    });
    return client.get(`/navigation/render/main-navigation?${query}`);
  },
};
