"use client";

import {
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const DeliveryOptions = ({ location, deliveryOption, setDeliveryOption }) => {
  return (
    <Paper elevation={6} sx={{ p: 3, mb: 2, mt: 2, bgcolor: "white" }}>
      <FormControl>
        <FormLabel>Delivery Options</FormLabel>

        <RadioGroup
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)}
        >
          {location === "Inside Dhaka" ? (
            <>
              <FormControlLabel
                value="70৳"
                control={<Radio />}
                label="Home Delivery - 70৳"
              />
              <FormControlLabel
                value="0৳"
                control={<Radio />}
                label="Pickup From Hub - 0৳"
              />
            </>
          ) : (
            <>
              <FormControlLabel
                value="120৳"
                control={<Radio />}
                label="Home Delivery - 120৳"
              />
              <FormControlLabel
                value="30৳"
                control={<Radio />}
                label="Pickup From Hub - 30৳"
              />
            </>
          )}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default DeliveryOptions;
