import { authKeys } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
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
