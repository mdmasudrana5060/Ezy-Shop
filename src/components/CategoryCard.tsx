import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const CategoryCard = ({
  gadgetCategory,
}: {
  gadgetCategory: { id: string; icon: string; label: string };
}) => {
  return (
    <Link
      href={`/featuredCategory/${gadgetCategory.id}`}
      passHref
      legacyBehavior
    >
      <Card
        component="a" // ✅ this makes the card behave like a link
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          borderRadius: 4,
          boxShadow: 3,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
          textDecoration: "none", // remove underline
          color: "inherit", // keep text color
        }}
      >
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {gadgetCategory.label}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
