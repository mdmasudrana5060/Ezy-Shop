"use server";

import { authKeys } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setRefreshToken = async (
  token: string,
  options?: { redirect?: string }
) => {
  const cookieStore = await cookies();

  cookieStore.set(authKeys.refreshToken, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  if (options?.redirect) {
    redirect(options.redirect);
  }
};

export default setRefreshToken;
