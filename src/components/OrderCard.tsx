"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";

const OrderCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productName = searchParams.get("name") ?? "Unknown";
  const quantity = parseInt(searchParams.get("quantity") ?? "0", 10);
  const price = parseFloat(searchParams.get("price") ?? "0");
  const total = (price * quantity).toFixed(2);

  const confirmOrder = () => {
    alert(`Order confirmed!\n${productName} x${quantity} = $${total}`);
    router.push("/");
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 3, width: 300 }}>
        <Typography variant="h6" fontWeight="bold">
          {productName}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography>Quantity: {quantity}</Typography>
        <Typography>Unit Price: ${price.toFixed(2)}</Typography>
        <Typography fontWeight="bold" mt={1}>
          Total: ${total}
        </Typography>

        <Box mt={3} display="flex" gap={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => router.push("/cart")}>
            View Cart
          </Button>
          <Button variant="contained" onClick={confirmOrder}>
            Confirm
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default OrderCard;
