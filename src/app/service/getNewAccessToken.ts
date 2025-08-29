// authService.ts
import axios from "axios";

export const getNewAccessToken = async () => {
  try {
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
