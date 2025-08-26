import { getNewAccessToken } from "@/app/service/getNewAccessToken";
import axios from "axios";

const instance = axios.create({
  withCredentials: true, // important for sending cookies automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Request interceptor: attach accessToken from cookie if requiresAuth is true
instance.interceptors.request.use(
  function (config) {
    if (config.headers?.requiresAuth) {
      // Backend reads accessToken from cookie automatically
      // Optionally, you could read it from cookie client-side if needed
      delete config.headers.requiresAuth; // remove custom flag
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor: handle accessToken expiration
instance.interceptors.response.use(
  function (response) {
    return response; // let RTK Query handle it
  },
  async function (error) {
    const config = error.config;
    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        // refresh accessToken via refreshToken cookie
        const response = await getNewAccessToken();

        return instance(config); // retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const responseObject = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessage: error?.response?.data?.message,
    };
    return responseObject;
  }
);

export { instance };
