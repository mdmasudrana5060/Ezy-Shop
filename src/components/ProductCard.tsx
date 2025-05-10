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

const ProductCard = ({ blog }) => {
  return (
    <Link href={`/Products/${blog.slug}`} passHref legacyBehavior>
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
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardMedia
            component="img"
            alt={blog.title}
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {blog.description}
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
