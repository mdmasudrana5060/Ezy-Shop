"use client";

import { useDeleteCartMutation } from "@/redux/api/cartApi";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useInitPaymentMutation } from "@/redux/api/payment.APi";
import { Paper, Typography, Divider, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Summary = ({
  items,
  deliveryOption,
  user,
  location,
  paymentOption,
  paymentId,
  cartsData,
  accessToken,
}) => {
  const [createOrder] = useCreateOrderMutation();
  const [initPayment] = useInitPaymentMutation();
  const [deleteCart] = useDeleteCartMutation();
  const router = useRouter();
  console.log(user, "user from summary page");

  const price = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = parseInt(deliveryOption.replace(/[^\d]/g, "")) || 0;

  const total = price + deliveryFee;

  const confirmOrder = async () => {
    const orderData = {
      user,
      items,
      location,
      deliveryFee,
      price,
      total,
      paymentMethod:
        paymentOption === "cod" ? "cash_on_delivery" : paymentOption,
      status: "pending",
      paymentId,
    };
    console.log(orderData, "order data from summery page");
    const res = await createOrder(orderData).unwrap();

    const cartId = cartsData?.[0]?._id;

    // If Bkash/Nagad/Card → payment gateway
    if (paymentOption !== "cod") {
      const result = await initPayment(res._id).unwrap();
      window.open(result.paymentUrl, "_blank");
    }

    // Delete cart
    await deleteCart({ cartId, accessToken });

    router.push("/");
  };

  return (
    <Paper elevation={6} sx={{ p: 3, bgcolor: "white" }}>
      <Typography variant="h6" fontWeight="bold">
        Checkout Summary
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography>Subtotal: {price} ৳</Typography>
      <Typography>Delivery Fee: {deliveryFee} ৳</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography fontWeight="bold">Total: {total} ৳</Typography>

      <Box mt={3} display="flex" gap={1} justifyContent="flex-end">
        <Button variant="outlined" onClick={() => router.push("/item")}>
          View Cart
        </Button>

        <Button variant="contained" onClick={confirmOrder}>
          Place Order
        </Button>
      </Box>
    </Paper>
  );
};

export default Summary;
