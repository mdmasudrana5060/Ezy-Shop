// frontend/service/logoutUser.ts
import { store } from "@/redux/store";
import { clearAuth } from "@/redux/slices/authSlice";
import { removeUser } from "../authService";

export const logoutUser = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    store.dispatch(clearAuth());
    await removeUser();

    // Use window.location for immediate redirect
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed", error);
    // Still clear auth state and redirect even if logout request fails
    store.dispatch(clearAuth());
    await removeUser();
    window.location.href = "/";
  }
};
