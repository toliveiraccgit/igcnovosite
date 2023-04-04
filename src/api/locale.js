import client from "../services/http";

export default {
  get_locales: () => {
    return client.get("/i18n/locales");
  },
};
