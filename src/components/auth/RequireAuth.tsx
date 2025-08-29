"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAccessToken, clearAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { getNewAccessToken } from "@/app/service/getNewAccessToken";
import { jwtDecode } from "jwt-decode";

interface RequireAuthProps {
  role?: string;
  children: ReactNode;
}

interface DecodedToken {
  role: string;
  [key: string]: any; // other JWT fields
}

const RequireAuth = ({ role, children }: RequireAuthProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let token = accessToken;

      // If no accessToken → refresh it using refreshToken cookie
      if (!token) {
        try {
          const res = await getNewAccessToken();
          token = res?.data?.accessToken;
          if (token) dispatch(setAccessToken(token));
          else throw new Error("No token");
        } catch {
          dispatch(clearAuth());
          router.push("/login");
          return;
        }
      }

      // Role-based access check
      if (role && token) {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.role !== role) {
          router.push("/unauthorized");
          return;
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [accessToken, role, dispatch, router]);

  if (loading) return null; // Or a spinner/loading indicator

  return <>{children}</>;
};

export default RequireAuth;
