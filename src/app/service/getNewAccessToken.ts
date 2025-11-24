// authService.ts
export const getNewAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include", // equivalent to withCredentials: true
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
