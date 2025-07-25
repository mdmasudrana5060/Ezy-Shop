import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({
  gadgetCategory,
}: {
  gadgetCategory: {
    id: number;
    icon: string;
    name: string;
    img: string;
  };
}) => {
  return (
    <Link
      href={{
        pathname: "/featuredCategory/featuredCategory.id",
        query: {
          name: gadgetCategory.name,
        },
      }}
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
          <Image
            src={gadgetCategory.img}
            width={64}
            height={64}
            alt="gadget category image"
          />
          <Typography variant="h6" color="text.primary">
            {gadgetCategory.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
