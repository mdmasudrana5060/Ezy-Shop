import CategoryCard from "@/components/CategoryCard";

import { Box, Typography } from "@mui/material";

const FeaturedCategory = () => {
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
        {gadgetCategories.map((gadgetCategory) => (
          <Box key={gadgetCategory.label} width="100%" maxWidth={180}>
            <CategoryCard gadgetCategory={gadgetCategory} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default FeaturedCategory;
const gadgetCategories = [
  { id: 1, icon: "Drone Icon", label: "Drone" },
  { id: 2, icon: "Gimbal Icon", label: "Gimbal" },
  { id: 3, icon: "Charger Fan Icon", label: "Charger Fan" },
  { id: 4, icon: "Weight Scale Icon", label: "Weight Scale" },
  { id: 5, icon: "TV Icon", label: "TV" },
  { id: 6, icon: "Mobile Phone Icon", label: "Mobile Phone" },
  { id: 7, icon: "Mobile Accessories Icon", label: "Mobile Accessories" },
  { id: 8, icon: "Portable SSD Icon", label: "Portable SSD" },
  { id: 9, icon: "Portable WiFi Camera Icon", label: "Portable WiFi Camera" },
  { id: 10, icon: "Trimmer Icon", label: "Trimmer" },
  { id: 11, icon: "Smart Watch Icon", label: "Smart Watch" },
  { id: 12, icon: "Action Camera Icon", label: "Action Camera" },
  { id: 13, icon: "Earphone Icon", label: "Earphone" },
  { id: 14, icon: "Earbuds Icon", label: "Earbuds" },
  { id: 15, icon: "Bluetooth Speakers Icon", label: "Bluetooth Speakers" },
  { id: 16, icon: "Gaming Console Icon", label: "Gaming Console" },
  { id: 17, icon: "Keyboard Icon", label: "Keyboard" },
  { id: 18, icon: "Headphone Icon", label: "Headphone" },
  { id: 19, icon: "Mouse Icon", label: "Mouse" },
];
