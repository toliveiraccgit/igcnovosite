export default {
  web: {
    BASE: import.meta.env.VITE_BASE_URL || "https://api.igcp.com.br",
  },
  api: {
    URL: import.meta.env.VITE_API_URL || "https://api.igcp.com.br/api",
    BASE: import.meta.env.VITE_API_BASE || "https://api.igcp.com.br",
  },
};
