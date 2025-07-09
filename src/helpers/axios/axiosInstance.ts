import axios from "axios";
import { authKey } from "@/constants/authKey";
import { getFromLocalStorage } from "@/utils/local-storage";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Request interceptor: attach token only if requiresAuth flag is set
instance.interceptors.request.use(
  function (config) {
    // Only add Authorization header if requiresAuth is true
    if (config.headers?.requiresAuth) {
      const accessToken = getFromLocalStorage(authKey);
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      // Remove the custom flag so it doesn't get sent to server
      delete config.headers.requiresAuth;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor: just return the original response so RTK Query can handle it
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { instance };
