"use server";

import { authKeys } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = async (token: string, option?: any) => {
  const cookieStore = await cookies();
  cookieStore.set(authKeys.accessToken, token);

  if (option?.passwordChangeRequired) {
    redirect("/");
  }

  if (!option?.passwordChangeRequired && option?.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
