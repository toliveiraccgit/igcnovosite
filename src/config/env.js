export default {
  api: {
    URL:
      window.location.hostname.includes("dev") ||
      window.location.hostname.includes("localhost")
        ? "https://backend-institucional-development.igcp.com.br/api"
        : "https://backend-institucional-production.igcp.com.br/api",
  },
};
