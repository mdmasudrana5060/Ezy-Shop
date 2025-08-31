"use server";
import { authKeys } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import { cookies } from "next/headers";

// ✅ Get decoded user info from cookie
// export const getUserInfo = async () => {
//   const cookieStore = await cookies();
//   const authToken = cookieStore.get(authKeys.accessToken)?.value;

//   if (authToken) {
//     const decodedData: any = decodedToken(authToken);
//     return {
//       ...decodedData,
//       role: decodedData?.role?.toLowerCase(),
//     };
//   }
//   return null;
// };

// ✅ Check login status
// export const isLoggedIn = async () => {
//   const cookieStore = await cookies();
//   const authToken = cookieStore.get(authKeys.accessToken)?.value;
//   return !!authToken;
// };

// ✅ Remove cookie
// export const removeUser = async () => {
//   const cookieStore = await cookies();
//   cookieStore.delete(authKeys.accessToken);
// };
