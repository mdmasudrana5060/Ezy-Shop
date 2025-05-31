import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

const CategoryCard = ({
  gadgetCategory,
}: {
  gadgetCategory: {
    id: number;
    icon: string;
    name: string;
    iconSvg: string;
    color: string;
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
          <Box
            sx={{
              mb: 1.5,
              svg: {
                color: gadgetCategory.color,
                width: 32,
                height: 32,
              },
            }}
            dangerouslySetInnerHTML={{ __html: gadgetCategory.iconSvg }}
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
