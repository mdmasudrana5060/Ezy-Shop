// frontend/service/logoutUser.ts
import { redirect } from "next/navigation";
import { store } from "@/redux/store";
import { clearAuth } from "@/redux/slices/authSlice";

export const logoutUser = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    store.dispatch(clearAuth());

    redirect("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
