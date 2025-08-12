"use client";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name") ?? "Unknown";
  const initialQuantity = parseInt(searchParams.get("quantity") ?? "0", 10);
  const price = parseFloat(searchParams.get("price") ?? "0");

  const [quantity, setQuantity] = useState(initialQuantity);
  const [isChecked, setIsChecked] = useState(true);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleDelete = () => console.log("Delete product");

  const totalPrice = isChecked ? price * quantity : 0;

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid item xs={12} md={8}>
          {/* Select All Card */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox checked={isChecked} color="primary" />
                  <Typography fontWeight={500}>
                    Select All ({initialQuantity} Items)
                  </Typography>
                </Box>
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Product Card */}
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                {/* Checkbox */}
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  color="primary"
                />

                {/* Name */}
                <Typography flex={1} minWidth={120} fontWeight={500}>
                  {productName}
                </Typography>

                {/* Price */}
                <Typography color="error" fontWeight={600}>
                  ৳{price.toFixed(2)}
                </Typography>

                {/* Quantity control */}
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleDecrease}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={handleIncrease}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Delete Button */}
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cart Summary
              </Typography>
              <Typography fontWeight="bold" mb={2}>
                Total Price: ৳{totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={totalPrice === 0}
                onClick={() => console.log("Proceed to checkout")}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
