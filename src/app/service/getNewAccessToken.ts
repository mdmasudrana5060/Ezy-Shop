// authService.ts
import axios from "axios";

export const getNewAccessToken = async (): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true, // send cookies automatically
      }
    );
    // The new accessToken is already set in cookies by the backend
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // propagate error so axios knows refresh failed
  }
};
