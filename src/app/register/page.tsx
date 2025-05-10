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
const Register = () => {
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
        {/* Left - Image */}
        <Box sx={{ width: "50%" }}>
          <img
            src="https://via.placeholder.com/300" // Replace with your image URL
            alt="Placeholder"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>

        {/* Right - Form */}
        <Box sx={{ width: "50%" }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />
            </Stack>
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
            <TextField
              size="small"
              id="outlined-basic"
              label="Mobile"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Date Of Birth"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="District"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="City"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Area"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Address"
              variant="outlined"
            />
            <Button variant="contained" value="submit">
              Submit
            </Button>
          </Stack>
          <Divider orientation="horizontal" flexItem />
          <Typography sx={{ mt: 2 }}>
            Already have an account?
            <Link sx={{ mx: 1 }} component={link} href="login">
              Login
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
export default Register;
