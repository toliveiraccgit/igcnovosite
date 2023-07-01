export default {
  // Local Teste
  // web: {
  //   BASE: import.meta.env.VITE_BASE_URL || "http://localhost:1337",
  // },
  // api: {
  //   URL: import.meta.env.VITE_API_URL || "http://localhost:1337/api",
  //   BASE: import.meta.env.VITE_API_BASE || "http://localhost:1337",
  // },

  // Original
  api: {
    URL:
      import.meta.env.VITE_API_URL ??
      "http://site-institucional-strapi-igc-development.us-east-2.elasticbeanstalk.com/api",
  },
};
