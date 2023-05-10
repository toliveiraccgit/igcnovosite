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

  get_footer_igc: ({ locale }) => {
    const query = new URLSearchParams({
      type: "TREE",
      populate: "*",
      ...(locale && { locale }),
    });
    return client.get(`/navigation/render/footer-page-igc?${query}`);
  },

  get_footer_service: ({ locale }) => {
    const query = new URLSearchParams({
      type: "TREE",
      populate: "*",
      ...(locale && { locale }),
    });
    return client.get(`/navigation/render/footer-page-service?${query}`);
  },
};
