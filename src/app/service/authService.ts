"use server";

import { authKeys } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

// ✅ Get decoded user info from cookie
export const getUserInfo = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(authKeys.accessToken)?.value;

  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
  return null;
};

// ✅ Check login status
export const isLoggedIn = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(authKeys.accessToken)?.value;
  return !!authToken;
};

// ✅ Remove cookie
export const removeUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(authKeys.accessToken);
};

// ✅ Request new access token using refresh token
export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true, // refresh token should be in cookie
  });
};
