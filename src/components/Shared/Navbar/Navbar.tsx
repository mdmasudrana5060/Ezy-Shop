import { Box, Stack, Typography, Link } from "@mui/material";
import link from "next/link";

const Navbar = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2}
      >
        {/* Left - Company Name */}
        <Typography variant="h6">EZY SHOP</Typography>

        {/* Center - Search Box */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "50%" }}>
            <Typography>Search Box</Typography>
          </Box>
        </Box>

        {/* Right - Actions */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Link
            href="/login"
            component={link}
            sx={{
              fontWeight: "bold",
              color: "blue",
              ":hover": { color: "darkblue" },
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
              color: "blue",
              ":hover": { color: "darkblue" },
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
              color: "blue",
              ":hover": { color: "darkblue" },
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
