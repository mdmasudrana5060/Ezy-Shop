"use client";

import { useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import UserCard from "@/components/UserCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderCard = () => {
  const [location, setLocation] = useState("Inside Dhaka");
  const [deliveryOption, setDeliveryOption] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const productName = searchParams.get("name") ?? "Unknown";
  const quantity = parseInt(searchParams.get("quantity") ?? "0", 10);
  const price = parseFloat(searchParams.get("price") ?? "0");
  const deliveryFee = parseInt(deliveryOption) || 0;
  const total = (price * quantity + deliveryFee).toFixed(2);

  const confirmOrder = () => {
    alert(`Order confirmed!\n${productName} x${quantity} = $${total}`);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f0f2f5" }}>
      <Grid spacing={3} container>
        {/* UserCard Section (8 columns on md+, full width on mobile) */}
        <Grid item xs={12} md={8}>
          <Paper elevation={6} sx={{ p: 3, bgcolor: "white" }}>
            <UserCard
              name=""
              number=""
              email=""
              address=""
              location={location}
              setLocation={setLocation}
            />
          </Paper>
        </Grid>

        {/* Order Summary Section (4 columns on md+, full width on mobile) */}

        <Grid item xs={12} md={4}>
          <Paper elevation={6} sx={{ p: 3, mb: 2, bgcolor: "white" }}>
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
                      label="Inside Dhaka - 70৳"
                    />
                    <FormControlLabel
                      value=" 0৳"
                      control={<Radio />}
                      label="Pickup From Hub - 0৳"
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      value="120৳"
                      control={<Radio />}
                      label="Outside Dhaka - 120৳"
                    />
                    <FormControlLabel
                      value="30৳"
                      control={<Radio />}
                      label="Outside Pickup - 30৳"
                    />
                  </>
                )}
              </RadioGroup>
            </FormControl>
          </Paper>
          <Paper elevation={6} sx={{ p: 3, bgcolor: "white" }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight="bold">
                {productName}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>Quantity: {quantity}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                Unit Price: {price.toFixed(2)} <span>৳</span>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>Delivery Fee:{deliveryOption}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography fontWeight="bold" mt={1}>
                Total: {total} <span style={{ fontWeight: 600 }}>৳</span>
              </Typography>

              <Box mt={3} display="flex" gap={1} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => router.push("/cart")}>
                  View Cart
                </Button>
                <Button variant="contained" onClick={confirmOrder}>
                  Place Order
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
