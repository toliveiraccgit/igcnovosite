export default {
  // Local Teste
  web: {
    BASE: import.meta.env.VITE_BASE_URL || "http://localhost:1337",
  },
  api: {
    URL: import.meta.env.VITE_API_URL || "http://localhost:1337/api",
    BASE: import.meta.env.VITE_API_BASE || "http://localhost:1337",
  },

  // Original
  // web: {
  //   BASE: import.meta.env.VITE_BASE_URL || "https://api.igcp.com.br",
  // },
  // api: {
  //   URL: import.meta.env.VITE_API_URL || "https://api.igcp.com.br/api",
  //   BASE: import.meta.env.VITE_API_BASE || "https://api.igcp.com.br",
  // },
};
