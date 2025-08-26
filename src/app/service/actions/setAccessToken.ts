// "use server";

// import { authKeys } from "@/constants/authKey";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const setAccessToken = async (token: string, option?: any) => {
//   const cookieStore = await cookies();
//   cookieStore.set(authKeys.accessToken, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 60 * 24, // 24 hourss
//   });

//   if (option && option.passwordChangeRequired) {
//     redirect("/");
//   }
//   if (option && !option.passwordChangeRequired && option.redirect) {
//     redirect(option.redirect);
//   }
// };

// export default setAccessToken;
