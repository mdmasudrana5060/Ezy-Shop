import { getNewAccessToken } from "@/app/service/getNewAccessToken";
import axios from "axios";
import { setAccessToken, clearAuth } from "@/redux/slices/authSlice";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Request interceptor: ONLY attach accessToken (no refresh logic)
instance.interceptors.request.use(
  async function (config) {
    // Import store inside the function to avoid circular dependency
    const { store } = await import("@/redux/store");
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    // Only attach token if it exists, don't try to refresh here
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 → try refresh
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        // Import store inside the function
        const { store } = await import("@/redux/store");

        // Get new accessToken using refreshToken cookie
        const res = await getNewAccessToken();
        const newToken = res?.data?.accessToken;

        if (newToken) {
          // Save new accessToken in Redux
          store.dispatch(setAccessToken(newToken));

          // Retry original request with new token
          config.headers.Authorization = `Bearer ${newToken}`;
          return instance(config);
        }
      } catch (refreshError) {
        // Import store for logout
        const { store } = await import("@/redux/store");
        store.dispatch(clearAuth());
        return Promise.reject(refreshError);
      }
    }

    const responseObject = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessage: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  }
);

export { instance };
