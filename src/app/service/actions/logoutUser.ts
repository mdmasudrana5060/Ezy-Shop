import { authKeys } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
  // Remove from localStorage (client-side)
  localStorage.removeItem(authKeys.accessToken);

  // Delete cookies (server-side)
  await deleteCookies([
    authKeys.refreshToken,
    authKeys.accessToken,
    "refreshToken",
    "accessToken",
  ]);

  // Navigate and refresh
  router.push("/");
  router.refresh();
};
