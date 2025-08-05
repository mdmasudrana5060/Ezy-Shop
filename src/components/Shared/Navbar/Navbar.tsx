"use client";
import {
  Box,
  Stack,
  Typography,
  Link,
  InputBase,
  alpha,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import LinkNext from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={LinkNext} href="/Help&Support">
            <ListItemText primary="Help & Support" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <AuthButton></AuthButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#547792", p: 2 }}>
      {isMobile ? (
        // ✅ Mobile Layout

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <IconButton onClick={toggleDrawer(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
          <Typography
            component={LinkNext}
            href="/"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
            variant="h6"
          >
            EZY SHOP
          </Typography>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
        </Stack>
      ) : (
        // ✅ Desktop Layout
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2}
        >
          <Typography
            component={LinkNext}
            href="/"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
            variant="h5"
          >
            EZY SHOP
          </Typography>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar />
            {/* <Box sx={{ width: "50%" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "4px",
                  backgroundColor: alpha("#FFFFFF", 0.15),
                  "&:hover": {
                    backgroundColor: alpha("#FFFFFF", 0.25),
                  },
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <SearchIcon sx={{ color: "#FFFFFF", mr: 1 }} />
                <InputBase
                  placeholder="Search gadgets..."
                  sx={{
                    color: "#FFFFFF",
                    width: "100%",
                    "::placeholder": {
                      color: "#FFFFFF",
                      opacity: 0.7,
                    },
                  }}
                />
              </Box>
            </Box> */}
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Link
              href="/Help&Support"
              component={LinkNext}
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                transition: "all 0.3s ease",
                ":hover": { color: "#F7AD45", fontSize: "1.1rem" },
              }}
              underline="none"
            >
              Help & Support
            </Link>

            <AuthButton />
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Navbar;
