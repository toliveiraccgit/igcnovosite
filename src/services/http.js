import axios from "axios";
import config from "../config/env";

const client = axios.create({
  baseURL: config.api.URL,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
