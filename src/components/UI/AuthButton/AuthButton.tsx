"use client";

import { logoutUser } from "@/app/service/actions/logoutUser";
import { getNewAccessToken } from "@/app/service/getNewAccessToken";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearAuth, setAccessToken } from "@/redux/slices/authSlice";
import { Button } from "@mui/material";
import Link from "next/link";

import { useEffect, useState } from "react";

const AuthButton = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkToken = async () => {
      // Only try to refresh token on initial load (when both are null/false)
      if (!accessToken && !isLoggedIn) {
        try {
          const res = await getNewAccessToken();
          const newToken = res?.data?.accessToken;
          if (newToken) {
            dispatch(setAccessToken(newToken));
          }
        } catch (err) {
          // Silently handle token refresh failures
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [accessToken, isLoggedIn, dispatch]);

  const handleLogout = () => {
    logoutUser();
    dispatch(clearAuth());
  };

  const baseButtonStyles = {
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "none" as const,
    padding: "6px 16px",
    borderRadius: "4px",
    textDecoration: "none",
    transition:
      "color 0.3s ease, transform 0.3s ease, background-color 0.3s ease",
    "&:hover": {
      color: "#F7AD45",
      transform: "scale(1.05)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:disabled": {
      color: "rgba(255, 255, 255, 0.5)",
      transform: "none",
    },
  };

  if (loading) {
    return null; // or show a spinner if you want
  }

  return (
    <>
      {isLoggedIn ? (
        <Button
          sx={{
            ...baseButtonStyles,
            minWidth: "70px",
          }}
          disableRipple
          onClick={handleLogout}
        >
          LogOut
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
          sx={{
            ...baseButtonStyles,
            minWidth: "60px",
          }}
          disableRipple
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
