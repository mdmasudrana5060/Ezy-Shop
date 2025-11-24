import {
  Box,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

type TUser = {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
};

type Props = {
  user: TUser;
  setUser: (value: TUser) => void;
  location: string;
  setLocation: (value: string) => void;
};

const UserCard = ({ user, setUser, location, setLocation }: Props) => {
  const handleChange =
    (field: keyof TUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [field]: e.target.value,
      });
    };

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
          <Typography fontWeight="bold">Delivery Address</Typography>

          <TextField
            fullWidth
            size="small"
            label="Name"
            variant="outlined"
            value={user.name}
            onChange={handleChange("name")}
          />

          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={handleChange("email")}
          />
          <TextField
            fullWidth
            size="small"
            label="Mobile"
            variant="outlined"
            value={user.contactNumber}
            onChange={handleChange("contactNumber")}
          />
          <TextField
            fullWidth
            size="small"
            label="Address"
            variant="outlined"
            value={user.address}
            onChange={handleChange("address")}
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
              <MenuItem value="Outside Dhaka">Outside Dhaka</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCard;
