import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Stack,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityBox = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, m: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          border="1px solid #ccc"
          borderRadius="8px"
          overflow="hidden"
          width="120px"
          height="40px"
        >
          {/* Left (+) */}
          <Box
            width="33.33%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRight="1px solid #ccc"
          >
            <IconButton size="small" onClick={handleIncrement}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Center (number) */}
          <Box
            width="33.33%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRight="1px solid #ccc"
          >
            <Typography variant="body1">{quantity}</Typography>
          </Box>

          {/* Right (−) */}
          <Box
            width="33.33%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              size="small"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            px: 2,
            fontWeight: "bold",
          }}
        >
          Buy Now
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle fontWeight="bold">Order Summary</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" justifyContent="space-between" gap={2}>
            {/* Left side - single message box */}
            <Paper elevation={2} sx={{ p: 2, width: "60%" }}>
              <Typography>
                You have added{" "}
                <span style={{ color: "red" }}>{product.title}</span> to your
                shopping cart!
              </Typography>
            </Paper>

            {/* Right side - stacked small boxes */}
            <Stack spacing={1} sx={{ width: "35%" }}>
              <Paper elevation={1} sx={{ p: 1 }}>
                <Typography>Quantity: {quantity}</Typography>
              </Paper>
              <Paper elevation={1} sx={{ p: 1 }}>
                <Typography>Price: ${product.regular_price}</Typography>
              </Paper>
              <Paper elevation={1} sx={{ p: 1 }}>
                <Typography fontWeight="bold">
                  Total: ${quantity * product.regular_price}
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              alert("Order Confirmed!");
              setOpen(false);
            }}
            variant="contained"
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuantityBox;
