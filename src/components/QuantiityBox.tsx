import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityBox = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
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
  );
};

export default QuantityBox;
