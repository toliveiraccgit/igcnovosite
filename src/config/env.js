export default {
  // Local
  // api: {
  //   URL: import.meta.env.VITE_API_URL || "http://localhost:1337/api",
  // },

  // Environments (dev, prod)
  api: {
    URL:
      window.location.hostname.includes("development") ||
      window.location.hostname.includes("localhost")
        ? "https://strapi-dev.igcp.com.br/api"
        : "https://strapi-prod.igcp.com.br/api",
  },
};
