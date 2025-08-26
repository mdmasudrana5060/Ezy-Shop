"use client";

import { logoutUser } from "@/app/service/actions/logoutUser";
import { getUserInfo } from "@/app/service/authService";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();

      setUserInfo(user);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser(router);
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

  return (
    <>
      {userInfo && userInfo.userEmail ? (
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
