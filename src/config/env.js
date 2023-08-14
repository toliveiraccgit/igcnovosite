export default {
  api: {
    URL:
      window.location.hostname.includes("dev") ||
      window.location.hostname.includes("localhost")
        ? "https://strapi-dev.igcp.com.br/api"
        : "https://strapi-prod.igcp.com.br/api",
  },
};
