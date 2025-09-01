// authService.ts
import axios from "axios";

export const getNewAccessToken = async () => {
  try {
    const hasRefreshToken = document.cookie.includes("refreshToken=");
    if (!hasRefreshToken) {
      return null; // not logged in → skip
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
