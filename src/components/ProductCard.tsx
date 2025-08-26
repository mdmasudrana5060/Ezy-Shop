import { useCart } from "@/hooks.ts/useCart";
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

const ProductCard = ({
  product,
}: {
  product: {
    id: string;
    title: string;
    description: string | undefined;
    image: string;
    price: number;
  };
}) => {
  const { addToCart } = useCart();
  return (
    <Link href={`/products/${product.id}`} passHref legacyBehavior>
      <Box
        component="a"
        sx={{
          textDecoration: "none",
        }}
      >
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
          <CardActions>
            <Button
              size="small"
              // onClick={(e) => {
              //   e.preventDefault();
              //   e.stopPropagation();
              //   // handle Buy Now
              // }}
            >
              Buy Now
            </Button>
            <Button
              size="small"
              onClick={() => addToCart(product)}
              // onClick={(e) => {
              //   e.preventDefault();
              //   e.stopPropagation();
              //   // handle Add Cart
              // }}
            >
              Add Cart
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Link>
  );
};
export default ProductCard;
