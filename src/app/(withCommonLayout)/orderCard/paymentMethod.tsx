"use client";

import {
  Paper,
  Typography,
  Divider,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import Image from "next/image";
import bkash from "../../../assets/bkash.png";
import nagad from "../../../assets/Nagad-Logo.png";
import debit from "../../../assets/rok-ssl-card-icon-sslNew.png";

const PaymentMethods = ({ paymentOption, setPaymentOption }) => {
  return (
    <Paper elevation={6} sx={{ p: 3, mb: 2, bgcolor: "white" }}>
      <Typography variant="h6" fontWeight="bold">
        Payment Method
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        <FormControlLabel
          value="cod"
          control={<Radio checked={paymentOption === "cod"} />}
          onChange={() => setPaymentOption("cod")}
          label="Cash On Delivery"
        />

        <Typography fontWeight="bold">Mobile Wallet</Typography>

        <Stack direction="row" spacing={3}>
          <FormControlLabel
            value="bkash"
            control={<Radio checked={paymentOption === "bkash"} />}
            onChange={() => setPaymentOption("bkash")}
            label={<Image src={bkash} alt="Bkash" width={90} height={35} />}
          />

          <FormControlLabel
            value="nagad"
            control={<Radio checked={paymentOption === "nagad"} />}
            onChange={() => setPaymentOption("nagad")}
            label={<Image src={nagad} alt="Nagad" width={90} height={35} />}
          />
        </Stack>

        <Typography fontWeight="bold">Debit/Credit Card</Typography>

        <FormControlLabel
          value="card"
          control={<Radio checked={paymentOption === "card"} />}
          onChange={() => setPaymentOption("card")}
          label={<Image src={debit} alt="Card" width={180} height={35} />}
        />
      </Stack>
    </Paper>
  );
};

export default PaymentMethods;
