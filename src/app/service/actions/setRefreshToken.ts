"use server";

import { authKeys } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setRefreshToken = async (token: string, option?: any) => {
  const cookieStore = await cookies();
  cookieStore.set(authKeys.refreshToken, token);

  redirect("/");
};

export default setRefreshToken;
