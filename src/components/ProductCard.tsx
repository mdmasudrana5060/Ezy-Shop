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
    id: number;
    title: string;
    description: string | undefined;
    image: string;

    price: number;
  };
}) => {
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                color: "red",
              }}
            >
              {product.price}
              {/* <Image
                src={taka}
                style={{ color: "red" }}
                alt="Taka Icon"
                width={24}
                height={24}
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "red" }}
                color="red"
                width={24}
                height={24}
                viewBox="0 0 384 512"
              >
                <path d="M36 32.3C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8L64 160l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 160c0 53 43 96 96 96l32 0c106 0 192-86 192-192l0-32c0-53-43-96-96-96l-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0c17.7 0 32 14.3 32 32l0 32c0 70.7-57.3 128-128 128l-32 0c-17.7 0-32-14.3-32-32l0-160 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-31.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
              </svg>
            </Typography>
            {/* <Typography
              variant="body2"
              sx={{ color: "text.secondary", overflow: "hidden" }}
            >
              {product.description}
            </Typography> */}
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
