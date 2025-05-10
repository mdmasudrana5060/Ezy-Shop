import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import link from "next/link";
const page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <Stack direction="row" spacing={4}>
        {/* Right - Form */}
        <Box sx={{ width: "50%" }}>
          <Stack direction="column" spacing={2}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button variant="contained" value="submit">
              Submit
            </Button>
          </Stack>
          <Divider orientation="horizontal" flexItem />
          <Typography sx={{ mt: 2 }}>
            Already have an account?
            <Link sx={{ mx: 1 }} component={link} href="register">
              Register
            </Link>
          </Typography>
        </Box>
        {/* Left - Image */}
        <Box sx={{ width: "50%" }}>
          <img
            src="https://via.placeholder.com/300" // Replace with your image URL
            alt="Placeholder"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
export default page;
