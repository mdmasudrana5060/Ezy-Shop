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

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useGetAllCartQuery } from "@/redux/api/cartApi";

type TCart = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  selected: boolean;
};

const Page = () => {
  const { data: cartsData, isLoading } = useGetAllCartQuery({});

  const [carts, setCarts] = useState<TCart[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(true);

  // Sync backend carts to local state when loaded
  useEffect(() => {
    if (Array.isArray(cartsData)) {
      setCarts(
        cartsData.map((cart) => ({
          ...cart,
          selected: true, // default selected
        }))
      );
    }
  }, [cartsData]);

  const handleIncrease = (id: string) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.productId === id ? { ...cart, quantity: cart.quantity + 1 } : cart
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.productId === id
          ? { ...cart, quantity: cart.quantity > 1 ? cart.quantity - 1 : 1 }
          : cart
      )
    );
  };

  const handleDelete = (id: string) => {
    setCarts((prev) => prev.filter((cart) => cart.productId !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    setIsSelectAll(checked);
    setCarts((prev) => prev.map((cart) => ({ ...cart, selected: checked })));
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    setCarts((prev) =>
      prev.map((cart: TCart) =>
        cart.productId === id ? { ...cart, selected: checked } : cart
      )
    );

    if (!checked) {
      setIsSelectAll(false);
    } else {
      setIsSelectAll(carts.every((cart) => cart.selected));
    }
  };

  const totalQuantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);

  const totalPrice = carts
    .filter((cart) => cart.selected)
    .reduce((sum, cart) => sum + cart.price * cart.quantity, 0);

  if (isLoading) return <Typography>Loading...</Typography>;

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
                  <Checkbox
                    checked={isSelectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    color="primary"
                  />
                  <Typography fontWeight={500}>
                    Select All ({totalQuantity} Items)
                  </Typography>
                </Box>
                <IconButton color="error" onClick={() => setCarts([])}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {carts.map((cart) => (
            <Card key={cart.productId} sx={{ mb: 2 }}>
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
                    checked={cart.selected}
                    onChange={(e) =>
                      handleSelectOne(cart.productId, e.target.checked)
                    }
                    color="primary"
                  />

                  {/* Name */}
                  <Typography flex={1} minWidth={120} fontWeight={500}>
                    {cart.productName}
                  </Typography>

                  {/* Price */}
                  <Typography color="error" fontWeight={600}>
                    ৳{cart.price.toFixed(2)}
                  </Typography>

                  {/* Quantity control */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleDecrease(cart.productId)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{cart.quantity}</Typography>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleIncrease(cart.productId)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Delete Button */}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(cart.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
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
