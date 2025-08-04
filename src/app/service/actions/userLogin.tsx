import { FieldValues } from "react-hook-form";

import setRefreshToken from "./setRefreshToken";

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
      passwordChangeRequired,
    });
  }
  return userInfo;
};
