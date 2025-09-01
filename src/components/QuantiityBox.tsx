import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/hooks.ts/useCart";

type QuantityBoxProps = {
  product: Product;
  selectedOption?: "cash" | "installment";
  selectedPrice?: number;
};

const QuantityBox = ({
  product,
  selectedOption,
  selectedPrice,
}: QuantityBoxProps) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart();
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
        <Link
          href={{
            pathname: "/orderCard",
            query: {
              name: product.title,
              price: selectedPrice,
              quantity: quantity,
            },
          }}
          passHref
          legacyBehavior
        >
          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              px: 2,
              fontWeight: "bold",
              transition: "transform 0.3s ease", // smooth animation
              "&:hover": {
                backgroundColor: "blue",
                transform: "scale(1.1)", // increase size on hover
              },
            }}
          >
            Buy Now
          </Button>
        </Link>

        <Button
          onClick={() => handleAddToCart(product, selectedPrice, quantity)}
          sx={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            px: 2,
            fontWeight: "bold",
            transition: "transform 0.3s ease", // smooth animation
            "&:hover": {
              backgroundColor: "blue",
              transform: "scale(1.1)", // increase size on hover
            },
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </>
  );
};

export default QuantityBox;
