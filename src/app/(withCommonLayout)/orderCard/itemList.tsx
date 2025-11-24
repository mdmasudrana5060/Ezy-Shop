"use client";

import {
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const ItemList = ({ items }) => {
  console.log(items, "items from itemlist");

  if (!items || !items.length) {
    return (
      <Paper elevation={6} sx={{ p: 3, mb: 2, bgcolor: "white" }}>
        <Typography>No items found</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6} sx={{ p: 3, mb: 2, bgcolor: "white" }}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Your Items
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {items.map((item) => (
        <Card key={item.productId} sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight={500}>{item.productName}</Typography>

              <Typography color="error" fontWeight={600}>
                ৳{item.price}
              </Typography>

              <Typography>{item.quantity}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default ItemList;
