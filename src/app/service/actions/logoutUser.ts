import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export const logoutUser = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  redirect("/");
};
