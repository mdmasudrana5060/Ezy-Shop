import { useCart } from "@/hooks.ts/useCart";
import { Product } from "@/types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const { handleAddToCart } = useCart();

  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        boxShadow: 12,
        p: 2,
        borderRadius: 5,
        "&:hover": { boxShadow: 24 },
      }}
    >
      {/* ✅ No <a> — pure MUI & Next.js compatible */}
      <Box
        component={Link}
        href={`/products/${product.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <CardMedia
          component="img"
          alt="product image"
          sx={{
            height: 260,
            width: "100%",
            objectFit: "contain",
          }}
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <span>{product.price}</span>
            <span style={{ color: "red", fontWeight: 600, marginLeft: 8 }}>
              ৳
            </span>
          </Typography>
        </CardContent>
      </Box>

      <CardActions>
        <Button size="small" onClick={() => handleAddToCart(product)}>
          Buy Now
        </Button>
        <Button size="small" onClick={() => handleAddToCart(product)}>
          Add Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
