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
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='6' y='6' width='12' height='12' rx='6' ry='6'/><path d='M18 16v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2'/><path d='M18 8V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2'/><path d='M12 10v2l1 1'/></svg>",
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Audio Equipment",
    icon: "headphones",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3'/></svg>",
    color: "#9333ea",
  },
  {
    id: 3,
    name: "Photography Gear",
    icon: "camera",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/></svg>",
    color: "#374151",
  },
  {
    id: 4,
    name: "Smart Home",
    icon: "home",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>",
    color: "#16a34a",
  },
  {
    id: 5,
    name: "Outdoor Tech",
    icon: "compass",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76'/></svg>",
    color: "#059669",
  },
  {
    id: 6,
    name: "Gaming Accessories",
    icon: "gamepad-2",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='6' y1='12' x2='10' y2='12'/><line x1='8' y1='10' x2='8' y2='14'/><circle cx='15' cy='13' r='1'/><circle cx='18' cy='11' r='1'/><rect x='2' y='6' width='20' height='12' rx='2'/></svg>",
    color: "#dc2626",
  },
  {
    id: 7,
    name: "Mobile Accessories",
    icon: "smartphone",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='2' width='14' height='20' rx='2' ry='2'/><path d='M12 18h.01'/></svg>",
    color: "#0891b2",
  },
  {
    id: 8,
    name: "Fitness Gadgets",
    icon: "dumbbell",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6.5 6.5 11 11'/><path d='m21 21-1-1'/><path d='m3 3 1 1'/><path d='m18 22 4-4'/><path d='m2 6 4-4'/><path d='m3 10 7-7'/><path d='m14 21 7-7'/></svg>",
    color: "#ea580c",
  },
  {
    id: 9,
    name: "Travel Gear",
    icon: "briefcase",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='7' width='20' height='14' rx='2' ry='2'/><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/></svg>",
    color: "#d97706",
  },
  {
    id: 10,
    name: "Computer Peripherals",
    icon: "monitor",
    iconSvg:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='3' width='20' height='14' rx='2' ry='2'/><line x1='8' y1='21' x2='16' y2='21'/><line x1='12' y1='17' x2='12' y2='21'/></svg>",
    color: "#4f46e5",
  },
];
