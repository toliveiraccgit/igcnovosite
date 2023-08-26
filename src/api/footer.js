import client from "../services/http";

export default {
  get: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/footer?fields=title_download&fields=title_igc&fields=title_service&fields=title_transactions&fields=title_contact&populate=contact&fields=title_social&populate=social&fields=download_link&populate=brand&${query}`
    );
  },
};
