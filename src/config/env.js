export default {
  web: {
    BASE: import.meta.env.VITE_BASE_URL || "http://api.igcp.com.br",
  },
  api: {
    URL: import.meta.env.VITE_API_URL || "http://api.igcp.com.br/api",
    BASE: import.meta.env.VITE_API_BASE || "http://api.igcp.com.br",
  },
};

