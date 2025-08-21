import { FieldValues } from "react-hook-form";

import setRefreshToken from "./setRefreshToken";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const userInfo = await res.json();

  const passwordChangeRequired = userInfo.data.needsPasswordChange;

  if (userInfo.data.refreshToken) {
    setRefreshToken(userInfo.data.refreshToken, {
      redirect: "/",
    });
  }

  if (userInfo.data.accessToken) {
    setAccessToken(userInfo.data.accessToken, {
      redirect: "/",
    });
  }
  return { ...userInfo, passwordChangeRequired };
};
