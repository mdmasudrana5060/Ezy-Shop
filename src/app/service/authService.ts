import { authKeys } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKeys.accessToken, accessToken);
};
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKeys.accessToken);

  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKeys.accessToken);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKeys.accessToken);
};
