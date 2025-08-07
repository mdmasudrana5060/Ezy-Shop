"use client";
import CategoryCard from "@/components/CategoryCard";
import actionCamera from "@/assets/action-camera.png";
import Camera from "@/assets/camera.png";
import headphones from "@/assets/headphones.png";
import keyboard from "@/assets/keyboard.png";
import laptop from "@/assets/laptop.png";
import mouse from "@/assets/mouse.png";
import smartWatch from "@/assets/smart-watch.png";
import smartPhone from "@/assets/smartphone.png";
import monitor from "@/assets/web-analytics.png";

import { Box, Typography } from "@mui/material";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";

const FeaturedCategory = () => {
  const {
    data: gadgetCategories,
    isLoading,
    error,
  } = useGetAllCategoryQuery({});
  console.log(gadgetCategories);
  return (
    <Box px={{ xs: 2, md: 5 }} py={6} bgcolor="#f9f9f9">
      <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
        Featured Categories
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={6}
        justifyItems="center"
      >
        {gadgetCategories?.map((gadgetCategory) => (
          <Box key={gadgetCategory.name} width="100%" maxWidth={180}>
            <CategoryCard gadgetCategory={gadgetCategory} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default FeaturedCategory;
const gadgetCategories = [
  {
    id: 1,
    name: "Action Camera",
    icon: "watch",
    img: actionCamera,
  },
  {
    id: 2,
    name: "Headphones",
    icon: "headphones",
    img: headphones,
  },
  {
    id: 3,
    name: "Camera",
    icon: "camera",
    img: Camera,
  },
  {
    id: 4,
    name: "Keyboard",
    icon: "keyboard",
    img: keyboard,
  },

  {
    id: 5,
    name: "Mouse",
    icon: "mouse",
    img: mouse,
  },
  {
    id: 6,
    name: "Laptop",
    icon: "laptop",
    img: laptop,
  },
  {
    id: 7,
    name: "Smartphone",
    icon: "smartphone",
    img: smartPhone,
  },
  {
    id: 8,
    name: "Smart Watch",
    icon: "smart watch",
    img: smartWatch,
  },

  {
    id: 9,
    name: "Monitor",
    icon: "monitor",
    img: monitor,
  },
];
