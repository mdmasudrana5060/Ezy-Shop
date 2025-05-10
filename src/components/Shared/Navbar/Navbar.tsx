import { Box, Stack, Typography, Link, InputBase, alpha } from "@mui/material";
import link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <Box sx={{ backgroundColor: "#547792", p: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2}
      >
        {/* Left - Company Name */}

        <Typography
          component={link}
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
          variant="h5"
          href="/"
        >
          EZY SHOP
        </Typography>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "50%" }}>
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
          </Box>
        </Box>

        {/* Right - Actions */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Link
            href="/login"
            component={link}
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
          <Link
            href="/login"
            component={link}
            sx={{
              fontWeight: "bold",
              color: "#FFFFFF",
              transition: "all 0.3s ease",
              ":hover": { color: " #F7AD45", fontSize: "1.1rem" },
            }}
            underline="none"
          >
            Login
          </Link>
          <Link
            href="/register"
            component={link}
            sx={{
              fontWeight: "bold",
              color: "#FFFFFF",
              transition: "all 0.3s ease",
              ":hover": { color: "#F7AD45", fontSize: "1.1rem" },
            }}
            underline="none"
          >
            Register
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};
export default Navbar;
