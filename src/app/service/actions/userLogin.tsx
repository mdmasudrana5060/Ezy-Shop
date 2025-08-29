import { setAccessToken } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import { FieldValues } from "react-hook-form";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  const { accessToken, needsPasswordChange } = userInfo.data;

  if (accessToken) {
    store.dispatch(setAccessToken(accessToken));
  }
  const passwordChangeRequired = userInfo.data.needsPasswordChange;

  return { ...userInfo, passwordChangeRequired };
};
