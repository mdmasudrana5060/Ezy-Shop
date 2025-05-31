import {
  Box,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

type Props = {
  name: string;
  number: string;
  email: string;
  address: string;
  location: string;
  setLocation: (value: string) => void;
};

const UserCard = ({
  name,
  number,
  email,
  address,
  location,
  setLocation,
}: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Stack direction="column" spacing={4}>
          <Typography>Delivery Address</Typography>

          <TextField fullWidth size="small" label="Name" variant="outlined" />
          <TextField fullWidth size="small" label="Mobile" variant="outlined" />
          <TextField fullWidth size="small" label="Email" variant="outlined" />
          <TextField
            fullWidth
            size="small"
            label="Address"
            variant="outlined"
          />

          {/* Location type dropdown (controlled by OrderCard) */}
          <FormControl fullWidth size="small">
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Location
              </MenuItem>
              <MenuItem value="Inside Dhaka">Inside Dhaka</MenuItem>
              <MenuItem value="outside">Outside Dhaka</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCard;
