"use client";

import QuantityBox from "@/components/QuantiityBox";
import {
  Box,
  Button,
  Grid,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

/* ----------------------- small helpers ----------------------- */
const badgeStyle = {
  backgroundColor: "yellow",
  padding: "4px 8px",
  borderRadius: "20px",
  fontWeight: 600,
  color: "black",
};

const renderSpecs = (specs: Record<string, Record<string, string>>) =>
  Object.entries(specs).map(([section, values]) => (
    <Box key={section} mb={2}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: "blue" }}
      >
        {section.replace(/_/g, " ").toUpperCase()}
      </Typography>
      {Object.entries(values).map(([k, v]) => (
        <Typography key={k} sx={{ ml: 2 }}>
          {k}: {v}
        </Typography>
      ))}
    </Box>
  ));

/* ----------------------- main page ----------------------- */
const Page = ({ params }: { params: { id: string } }) => {
  const [selectedOption, setSelectedOption] = useState<"cash" | "installment">(
    "cash"
  );

  const productId = parseInt(params.id, 10);
  const matchedProduct = products.find((p) => p.id === productId);

  if (!matchedProduct) return <div>Product not found</div>;

  const monthlyInstallment = Math.ceil(matchedProduct.regular_price / 12);

  return (
    <Box>
      {/* ---------- Hero / price section ---------- */}
      <Box
        m={8}
        display="flex"
        justifyContent="space-around"
        p={2}
        bgcolor="grey.100"
      >
        <Stack mt={8}>
          <Image
            src={matchedProduct.image}
            alt={matchedProduct.title}
            width={300}
            height={300}
          />
        </Stack>

        <Stack mt={6} maxWidth="700px">
          <Typography variant="h5" sx={{ color: "blue" }}>
            {matchedProduct.title}
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ rowGap: 1 }}>
            <Typography sx={badgeStyle}>
              Price: {matchedProduct.price}
            </Typography>
            <Typography sx={badgeStyle}>
              Regular Price: {matchedProduct.regular_price}
            </Typography>
            <Typography sx={badgeStyle}>
              Stock: {matchedProduct.status}
            </Typography>
            <Typography sx={badgeStyle}>
              Product Code: {matchedProduct.product_code}
            </Typography>
            <Typography sx={badgeStyle}>
              Brand: {matchedProduct.brand}
            </Typography>
          </Stack>

          <Stack m={1}>
            <Typography variant="h6" fontWeight={400} mt={1}>
              Key Features:
            </Typography>
            <ul style={{ marginTop: 0, paddingLeft: 20 }}>
              {matchedProduct?.key_features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </Stack>

          {/* Payment options */}
          <Stack m={1}>
            <Typography fontWeight="bold">Payment Options</Typography>
            <Box display="flex" gap={2} mt={1}>
              {/* cash */}
              <Stack
                p={2}
                border="2px solid blue"
                direction="row"
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedOption("cash")}
                gap={1}
              >
                <Radio checked={selectedOption === "cash"} />
                <Box>
                  <Typography fontWeight="bold">
                    {matchedProduct.price}
                    <span style={{ color: "red", fontWeight: 600 }}>৳</span>
                    <del style={{ marginLeft: 8 }}>
                      {matchedProduct.regular_price}
                      <span style={{ color: "red", fontWeight: 600 }}>৳</span>
                    </del>
                  </Typography>
                  <Typography>Cash Discount Price</Typography>
                  <Typography>Online/Cash Payment</Typography>
                </Box>
              </Stack>

              {/* installment */}
              <Stack
                p={2}
                border="2px solid blue"
                direction="row"
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedOption("installment")}
                gap={1}
              >
                <Radio checked={selectedOption === "installment"} />
                <Box>
                  <Typography fontWeight="bold">
                    {monthlyInstallment}
                    <span style={{ color: "red", fontWeight: 600 }}>৳</span>
                    /month
                  </Typography>
                  <Typography>12-Month Installment</Typography>
                  <Typography>Monthly Payment Plan</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>

          <QuantityBox product={matchedProduct} />
        </Stack>
      </Box>

      {/* ---------- quick nav chips ---------- */}

      <Box
        sx={{
          width: "100%",
          maxWidth: { md: "74%" },
          mx: 1,
          my: 2,
        }}
      >
        <Grid container spacing={4}>
          {[
            { label: "Specification", count: null },
            { label: "Description", count: null },
            { label: "Question", count: matchedProduct.question?.length || 0 },
            { label: "Reviews", count: matchedProduct.reviews?.length || 0 },
          ].map((chip, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Paper
                elevation={16}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: i === 0 ? "#FF7F50" : "#FFFFFF",
                  color: "black",
                  borderRadius: 2,
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#FF7F50", color: "white" },
                }}
              >
                <Typography variant="h6">
                  {chip.label}
                  {chip.count !== null && ` ${chip.count}`}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ---------- unified detail cards ---------- */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          {/* Specification */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
              border: "1px solid #ddd",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Specification
            </Typography>
            {renderSpecs(matchedProduct?.specification)}
          </Paper>

          {/* Description */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
              border: "1px solid #ddd",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {matchedProduct.description}
            </Typography>
          </Paper>

          {/* Questions */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 8,
              border: "1px solid #ddd",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Questions ({matchedProduct.question?.length || 0})
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#FF7F50", p: 1, borderRadius: 10 }}
              >
                Ask Question
              </Button>
            </Box>

            {matchedProduct.question && matchedProduct.question.length > 0 ? (
              matchedProduct.question.map((q, idx) => (
                <Box
                  key={idx}
                  mb={1}
                  p={1}
                  sx={{ bgcolor: "#fafafa", borderRadius: 1 }}
                >
                  <Typography>
                    <strong>Q:</strong> {q.question}
                  </Typography>
                  <Typography>
                    <strong>A:</strong> {q.answer || "No answer yet."}
                  </Typography>
                </Box>
              ))
            ) : (
              <Stack
                sx={{
                  minHeight: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#fff",
                  borderRadius: 1,
                }}
              >
                <Typography color="textSecondary">No questions yet.</Typography>
              </Stack>
            )}
          </Paper>

          {/* Reviews */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              mb: 3,
              border: "1px solid #ddd",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Reviews ({matchedProduct.reviews?.length || 0})
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#FF7F50", p: 1, borderRadius: 10 }}
              >
                Write Review
              </Button>
            </Box>

            {matchedProduct.reviews && matchedProduct.reviews.length > 0 ? (
              matchedProduct.reviews.map((r, idx) => (
                <Box
                  key={idx}
                  mb={1}
                  p={1}
                  sx={{ bgcolor: "#fafafa", borderRadius: 1 }}
                >
                  <Typography>
                    <strong>{r.user}</strong> rated {r.rating}/5
                  </Typography>
                  <Typography>{r.comment}</Typography>
                </Box>
              ))
            ) : (
              <Stack
                sx={{
                  minHeight: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#fff",
                  borderRadius: 1,
                }}
              >
                <Typography color="textSecondary">No reviews yet.</Typography>
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;

const products = [
  {
    id: 1716109200001,
    title: "SJCAM SJ8 Pro Action Camera",
    slug: "sjcam-sj8-pro-action-camera",
    brand: "SJCAM",
    model: "SJ8 Pro",
    category: "Action Camera",
    status: "In Stock",
    product_code: "SJ8PRO",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/sjcam/sjcam-sj8/sjcam-sj8-01-228x228.jpg",
    price: 15500,
    regular_price: 17000,
    key_features: [
      "12 MP Sony CMOS Sensor",
      "4 K 60 fps + 6-Axis Gyro IS",
      '2.33" Touch LCD & Front Status Screen',
      "Built-in Wi-Fi / Bluetooth",
      "40 m Waterproof Housing Included",
    ],
    specification: {
      main_features: {
        Sensor: "1/2.3″ 12 MP CMOS",
        Video: "4 K 60 fps / 1080 p 120 fps",
        Display: "2.33″ rear • 0.96″ front",
        Battery: "1200 mAh (removable)",
        Stabilization: "Gyro Electronic IS",
      },
      physical_attribute: { Weight: "85 g (without case)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Compact 4 K60 action cam with dual screens, gyro stabilization and Wi-Fi remote control—ready for every adventure.",
  },
  {
    id: 1716109200002,
    title: "SJCAM SJ6 Pro Action Camera",
    slug: "sjcam-sj6-pro-action-camera",
    brand: "SJCAM",
    model: "SJ6 Pro",
    category: "Action Camera",
    status: "In Stock",
    product_code: "SJ6PRO",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/sjcam/sj6-pro/sj6-pro-01-228x228.webp",
    price: 13500,
    regular_price: 15000,
    key_features: [
      "14 MP Sensor (24 MP Int.)",
      "4 K 30 fps Recording",
      "Front & Rear LCDs",
      "Gyro Anti-Shake EIS",
      "Wi-Fi App Control",
    ],
    specification: {
      main_features: {
        Sensor: "14 MP (24 MP interpolated)",
        Video: "4 K 30 fps / 2.7 K 60 fps",
        Display: '2" rear • 1" front',
        Battery: "1000 mAh",
        Waterproof: "30 m (with case)",
      },
      physical_attribute: { Weight: "82 g" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Dual-screen 4 K cam delivering crisp footage, gyro EIS and full accessory ecosystem for outdoor sports.",
  },
  {
    id: 1716109200003,
    title: "AKASO Brave 7 LE Action Camera",
    slug: "akaso-brave-7-le-action-camera",
    brand: "AKASO",
    model: "Brave 7 LE",
    category: "Action Camera",
    status: "In Stock",
    product_code: "BRAVE7LE",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/akaso/brave-7-le/brave-7-le-01-228x228.webp",
    price: 16500,
    regular_price: 18000,
    key_features: [
      "20 MP Sensor",
      "4 K 30 fps + EIS 2.0",
      "IPX7 Waterproof Body",
      "Dual Color Screens",
      "Voice Control",
    ],
    specification: {
      main_features: {
        Sensor: "1/2.3″ 20 MP CMOS",
        Video: "4 K 30 fps / 1080 p 60 fps",
        Stabilization: "EIS 2.0",
        Battery: "2 × 1350 mAh (hot-swap)",
        Waterproof: "1 m bare • 40 m with case",
      },
      physical_attribute: { Weight: "127 g (with battery)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Weatherproof vlogging-ready camera with front selfie screen, steady 4 K video and hands-free voice commands.",
  },
  {
    id: 1716109200004,
    title: "DJI Osmo Action 4 (Standard Combo)",
    slug: "dji-osmo-action-4-standard-combo",
    brand: "DJI",
    model: "Osmo Action 4",
    category: "Action Camera",
    status: "In Stock",
    product_code: "OA4STD",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/action-camera/dji/osmo-action-4-standard-combo/osmo-action-4-standard-combo-02-228x228.webp",
    price: 48000,
    regular_price: 50000,
    key_features: [
      "1/1.3″ 10 MP Sensor",
      "4 K 120 fps 10-bit HDR",
      "RockSteady 3.0 & HorizonSteady",
      "Dual Touch Screens",
      "18 m Waterproof (no case)",
    ],
    specification: {
      main_features: {
        Sensor: "1/1.3″ 10 MP CMOS",
        Video: "4 K 120 fps / 2.7 K 120 fps",
        Stabilization: "RockSteady 3.0",
        Battery: "1770 mAh Extreme",
        Connectivity: "Wi-Fi / Bluetooth",
      },
      physical_attribute: { Weight: "145 g" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Flagship DJI cam delivering superb low-light 4 K120, horizon lock and long-life battery—made for creators on the move.",
  },
  {
    id: 1716109200005,
    title: "Canon EOS 2000D DSLR Camera (18-55 IS II)",
    slug: "canon-eos-2000d-dslr-camera",
    brand: "Canon",
    model: "EOS 2000D",
    category: "DSLR Camera",
    status: "In Stock",
    product_code: "EOS2000D",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/dslr-camera/canon/2000d/2000d-01-228x228.webp",
    price: 42500,
    regular_price: 45000,
    key_features: [
      "24.1 MP APS-C CMOS Sensor",
      "DIGIC 4+ Processor",
      "Full-HD 30 fps Video",
      "9-Point AF System",
      "Built-in Wi-Fi & NFC",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 24.1 MP CMOS",
        ISO: "100 – 6400 (exp. 12800)",
        Video: "1080 p 30 fps",
        Lens_Mount: "Canon EF/EF-S",
        Screen: '3" 920 k-dot LCD',
      },
      physical_attribute: { Weight: "475 g (body only)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Beginner-friendly DSLR delivering crisp 24 MP stills, intuitive guided modes and easy wireless sharing.",
  },
  {
    id: 1716109200006,
    title: "Canon EOS 1500D DSLR Camera (18-55 IS II)",
    slug: "canon-eos-1500d-dslr-camera",
    brand: "Canon",
    model: "EOS 1500D",
    category: "DSLR Camera",
    status: "In Stock",
    product_code: "EOS1500D",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/dslr-camera/canon/1500d/1500d-11-228x228.webp",
    price: 39900,
    regular_price: 42000,
    key_features: [
      "24.1 MP APS-C Sensor",
      "Full-HD Video",
      "Scene Intelligent Auto",
      "Optical Viewfinder",
      "Wi-Fi & NFC",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 24.1 MP CMOS",
        ISO: "100 – 6400",
        Video: "1080 p 30 fps",
        Mount: "Canon EF/EF-S",
        Screen: '3" 920 k-dot LCD',
      },
      physical_attribute: { Weight: "475 g (body only)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Lightweight DSLR with sharp sensor and wireless connectivity—ideal for hobbyists stepping up their photography.",
  },
  {
    id: 1716109200007,
    title: "Canon EOS 4000D DSLR Camera (18-55)",
    slug: "canon-eos-4000d-dslr-camera",
    brand: "Canon",
    model: "EOS 4000D",
    category: "DSLR Camera",
    status: "In Stock",
    product_code: "EOS4000D",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/dslr-camera/canon/eos-4000d/eos-4000d-01-228x228.webp",
    price: 35500,
    regular_price: 37500,
    key_features: [
      "18 MP APS-C Sensor",
      "Full-HD 30 fps Recording",
      "9-Point AF",
      "Scene Intelligent Auto",
      "Wi-Fi Sharing",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 18 MP CMOS",
        ISO: "100 – 6400",
        Video: "1080 p 30 fps",
        Mount: "Canon EF/EF-S",
        Screen: '2.7" 230 k-dot LCD',
      },
      physical_attribute: { Weight: "436 g (body only)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Affordable DSLR with guided UI and Wi-Fi, perfect for first-time interchangeable-lens shooters.",
  },

  {
    id: 1716109200008,
    title: "Canon EOS 250D DSLR Camera (18-55 IS STM)",
    slug: "canon-eos-250d-dslr-camera",
    brand: "Canon",
    model: "EOS 250D",
    category: "DSLR Camera",
    status: "In Stock",
    product_code: "EOS250D",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/dslr-camera/canon/eos-250d/eos-250d-01-228x228.webp",
    price: 62500,
    regular_price: 65000,
    key_features: [
      "24.1 MP Dual-Pixel CMOS AF",
      "4 K 24 fps Video",
      "DIGIC 8 Processor",
      "Vari-Angle Touch LCD",
      "Wi-Fi & Bluetooth",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 24.1 MP CMOS",
        ISO: "100 – 25600",
        Video: "4 K 24 fps / FHD 60 fps",
        Mount: "Canon EF/EF-S",
        Screen: '3" vari-angle LCD',
      },
      physical_attribute: { Weight: "449 g (body only)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "World’s lightest 4 K DSLR combines Dual-Pixel AF with flip screen—great for family, travel and vlogging.",
  },

  {
    id: 1716109200009,
    title: "Nikon Z50 Mirrorless Camera (Body)",
    slug: "nikon-z50-mirrorless-camera-body",
    brand: "Nikon",
    model: "Z50",
    category: "Mirrorless Camera",
    status: "In Stock",
    product_code: "Z50BODY",
    image:
      "https://www.startech.com.bd/image/cache/catalog/dslr-camera/nikon/z50-mirrorless/z50-mirrorless-1-228x228.jpg",
    price: 94000,
    regular_price: 98000,
    key_features: [
      "20.9 MP DX CMOS Sensor",
      "EXPEED 6 Processor",
      "4 K 30 fps Video",
      "Eye-Detection AF",
      "Wi-Fi & Bluetooth",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 20.9 MP CMOS",
        ISO: "100 – 51200",
        Video: "4 K 30 fps / FHD 120 fps",
        Mount: "Nikon Z",
        Screen: '3.2" tilt-down LCD',
      },
      physical_attribute: { Weight: "450 g (body)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Compact Z-mount body with stunning image quality, fast hybrid AF and flip screen—ideal for everyday creators.",
  },
  {
    id: 1716109200010,
    title: "Canon EOS RP Mirrorless Camera + 24-105 mm",
    slug: "canon-eos-rp-mirrorless-camera-24-105",
    brand: "Canon",
    model: "EOS RP",
    category: "Mirrorless Camera",
    status: "In Stock",
    product_code: "EOSRPKIT",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/mirriorless/canon/eos-rp-with-lens/eos-rp-with-lens-01-228x228.webp",
    price: 145000,
    regular_price: 155000,
    key_features: [
      "26.2 MP Full-Frame CMOS",
      "Dual-Pixel AF",
      "4 K 24 fps Recording",
      "Vari-Angle Touch LCD",
      "RF 24-105 mm Lens Included",
    ],
    specification: {
      main_features: {
        Sensor: "Full-Frame 26.2 MP",
        ISO: "100 – 40000",
        Video: "4 K 24 fps / FHD 60 fps",
        Mount: "Canon RF",
        Screen: '3" vari-angle touch',
      },
      physical_attribute: { Weight: "485 g (body)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Affordable full-frame mirrorless kit delivering rich color, fast AF and versatile zoom for travel & portraits.",
  },
  {
    id: 1716109200011,
    title: "Sony α6400 Mirrorless Camera (Body)",
    slug: "sony-a6400-mirrorless-camera-body",
    brand: "Sony",
    model: "Alpha 6400",
    category: "Mirrorless Camera",
    status: "In Stock",
    product_code: "A6400BODY",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/mirriorless/sony/a6400/a6400-01-228x228.webp",
    price: 99500,
    regular_price: 105000,
    key_features: [
      "24.2 MP APS-C Exmor CMOS",
      "Real-Time Eye AF & Tracking",
      "4 K 30 fps w/ No Crop",
      "425-Point Phase AF",
      "180° Flip LCD",
    ],
    specification: {
      main_features: {
        Sensor: "APS-C 24.2 MP CMOS",
        ISO: "100 – 32000",
        Video: "4 K 30 fps / FHD 120 fps",
        Mount: "Sony E",
        Screen: '3" flip-up touch',
      },
      physical_attribute: { Weight: "403 g (body)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Fast-focusing mirrorless body with stunning 4 K, real-time tracking AF and compact design—perfect for action, vlog and travel.",
  },

  {
    id: 1716109200012,
    title: "Sony ZV-1 Compact Vlog Camera",
    slug: "sony-zv1-vlog-camera",
    brand: "Sony",
    model: "ZV-1",
    category: "Compact Camera",
    status: "In Stock",
    product_code: "ZV1",
    image:
      "https://www.startech.com.bd/image/cache/catalog/digital-camera/sony/zv-1/zv-1-228x228.jpg",
    price: 78900,
    regular_price: 82000,
    key_features: [
      "20.1 MP 1″ Exmor RS Sensor",
      "24–70 mm F1.8–2.8 ZEISS Lens",
      "4 K 30 fps & S-Log3",
      "Product Showcase AF",
      "Directional 3-Capsule Mic",
    ],
    specification: {
      main_features: {
        Sensor: "1″ 20.1 MP Stacked CMOS",
        Lens: "24–70 mm equiv. F1.8–2.8",
        Video: "4 K 30 fps / FHD 120 fps",
        Stabilization: "Active SteadyShot",
        Screen: '3" side-flip touch',
      },
      physical_attribute: { Weight: "294 g (with battery)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Pocket-sized powerhouse for vloggers—features lightning-fast AF, bright ZEISS optics and high-quality on-camera mic.",
  },
  {
    id: 1716109200013,
    title: "Sony FDR-AX43 4 K Handycam",
    slug: "sony-fdr-ax43-4k-handycam",
    brand: "Sony",
    model: "FDR-AX43",
    category: "Video Camera",
    status: "In Stock",
    product_code: "AX43",
    image:
      "https://www.startech.com.bd/image/cache/catalog/camera/video-camera/sony/fdr-ax43/fdr-ax43-01-228x228.webp",
    price: 88500,
    regular_price: 92000,
    key_features: [
      "4 K 24/30 fps Recording",
      "1/2.5″ 8.29 MP Sensor",
      "Balanced Optical SteadyShot",
      "20× Optical Zoom ZEISS Lens",
      "Built-in 3-Channel Mic",
    ],
    specification: {
      main_features: {
        Sensor: "1/2.5″ 8.29 MP CMOS",
        Lens: "26.8–536 mm equiv.",
        Video: "4 K 30 fps / FHD 60 fps",
        Stabilization: "BOSS Gimbal OIS",
        Storage: "SD / SDHC / SDXC",
      },
      physical_attribute: { Weight: "640 g (with battery)" },
      warranty_information: { Warranty: "1 year Warranty" },
    },
    description:
      "Handycam with gimbal-type stabilization ensuring ultra-smooth 4 K footage, powerful zoom and superb audio.",
  },

  {
    id: 1716109200014,
    title: "T-WOLF H150 Wired Gaming Headphone",
    slug: "t-wolf-h150-wired-gaming-headphone",
    brand: "T-WOLF",
    model: "H150",
    category: "headphone",
    status: "In Stock",
    product_code: "36278",
    description: `The T-WOLF H150 is designed for comfort, with a flexible and adjustable headphone that can be customized to fit any head size, ensuring a snug yet comfortable fit for long hours of usage. The ear cups are padded with soft, breathable material to reduce ear strain during extended gaming or music sessions. Its high-quality drivers produce clear, immersive sound with deep bass and sharp highs, improving the overall audio experience whether you're playing video games or listening to music. The T-WOLF H150 is visually stunning, with a sleek and futuristic appearance that compliments its high-performance capabilities. The headphone is designed to be sturdy and endure the demands of regular use while keeping a fashionable appearance. In addition to its practical and attractive advantages, the T-WOLF H150 is simple to set up and operate, making it ideal for both rookie and expert users. The T-WOLF H150 Wired Gaming Headphone is the ideal combination of style, comfort, and high-quality sound, making it a must-have item for anybody who appreciates both performance and appearance in their audio equipment.`,
    price: 450,
    regular_price: 490,
    payment_options: "41৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "Model: H150",
      "Plug Type: 3.5 mm",
      "Strong Impression with Excellent Sound Quality",
      "90-Degree Rotation Ability",
      "Sophisticated Design",
    ],
    specifications: {
      input_jack: "3.5mm Stereo",
      connectivity: "Wired",
      rotation: "90-degree Rotation",
      color: "Black",
      microphone: {
        frequency: "30 - 16 KHz",
        size: "Ergonomic",
      },
      warranty: "1 Year Manufacturing Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/t-wolf/h150/h150-01-228x228.webp",
  },

  {
    id: 1716109200015,
    title: "OneOdio Focus A10",
    slug: "oneodio-focus-a10",
    brand: "OneOdio",
    model: "Focus A10",
    category: "headphone",
    product_code: "SJ8PRO1",
    status: "In Stock",
    price: 2500,
    regular_price: 2700,
    key_features: [
      "Model: Focus A10",
      "Over-Ear Design",
      "High Fidelity Sound",
      "Noise Isolation",
      "Adjustable Headband",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/focus-a10-1-228x228.webp",
  },

  {
    id: 1716109200016,
    title: "OneOdio Focus A5",
    slug: "oneodio-focus-a5",
    brand: "OneOdio",
    model: "Focus A5",
    category: "headphone",
    product_code: "SJ8PRO2",
    status: "In Stock",
    price: 2200,
    regular_price: 2400,
    key_features: [
      "Model: Focus A5",
      "Over-Ear Comfortable Design",
      "Balanced Sound",
      "Durable Construction",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/focus-a5-228x228.webp",
  },

  {
    id: 1716109200017,
    title: "OneOdio Fusion A70",
    slug: "oneodio-fusion-a70",
    brand: "OneOdio",
    model: "Fusion A70",
    category: "headphone",
    product_code: "SJ8PRO3",
    status: "In Stock",
    price: 3500,
    regular_price: 3800,
    key_features: [
      "Model: Fusion A70",
      "Active Noise Cancelling",
      "Wireless & Wired Mode",
      "High Bass",
      "Comfortable Earcups",
    ],
    specifications: {
      connectivity: "Wired & Wireless",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/fusion-a70-228x228.webp",
  },

  {
    id: 1716109200018,
    title: "OneOdio Focus A10 (Alternate)",
    slug: "oneodio-focus-a10-alt",
    brand: "OneOdio",
    model: "Focus A10",
    category: "headphone",
    product_code: "SJ8PRO3",
    status: "In Stock",
    price: 2500,
    regular_price: 2700,
    key_features: [
      "Model: Focus A10",
      "Over-Ear Design",
      "High Fidelity Sound",
      "Noise Isolation",
      "Adjustable Headband",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/focus-a10-1-228x228.webp",
  },

  {
    id: 1716109200019,
    title: "OneOdio Monitor 80",
    slug: "oneodio-monitor-80",
    brand: "OneOdio",
    model: "Monitor 80",
    category: "headphone",
    product_code: "SJ8PQR1",
    status: "In Stock",
    price: 3200,
    regular_price: 3400,
    key_features: [
      "Model: Monitor 80",
      "Studio Quality Sound",
      "Over-Ear Design",
      "Durable Frame",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/monitor-80-01-228x228.webp",
  },

  {
    id: 1716109200020,
    title: "OneOdio Monitor 60",
    slug: "oneodio-monitor-60",
    brand: "OneOdio",
    model: "Monitor 60",
    category: "headphone",
    product_code: "SJ8PQR2",
    status: "In Stock",
    price: 2800,
    regular_price: 3000,
    key_features: [
      "Model: Monitor 60",
      "Clear Audio",
      "Comfortable Padding",
      "Adjustable Headband",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/monitor-60-1-228x228.webp",
  },

  {
    id: 1716109200021,
    title: "OneOdio Monitor 40",
    slug: "oneodio-monitor-40",
    brand: "OneOdio",
    model: "Monitor 40",
    category: "headphone",
    product_code: "SJ8PQR3",
    status: "In Stock",
    price: 2400,
    regular_price: 2600,
    key_features: [
      "Model: Monitor 40",
      "Lightweight",
      "Good Sound Quality",
      "Affordable",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/monitor-40-228x228.webp",
  },

  {
    id: 1716109200022,
    title: "OneOdio A71D",
    slug: "oneodio-a71d",
    brand: "OneOdio",
    model: "A71D",
    category: "headphone",
    product_code: "SJ8PQR4",
    status: "In Stock",
    price: 2000,
    regular_price: 2200,
    key_features: [
      "Model: A71D",
      "Wired Connection",
      "Clear Sound",
      "Comfortable Design",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/oneodio/a71d-228x228.webp",
  },

  {
    id: 1716109200023,
    title: "HOCO W106 Wired Headphone",
    slug: "hoco-w106-wired-headphone",
    brand: "HOCO",
    model: "W106",
    category: "headphone",
    product_code: "SJ8PQR5",
    status: "In Stock",
    price: 1500,
    regular_price: 1700,
    key_features: ["Model: W106", "Wired", "Clear Audio", "Lightweight Design"],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headphone/hoco/w106/w106-01-228x228.webp",
  },

  {
    id: 1716109200024,
    title: "Redragon H130 Wired Gaming Headset",
    slug: "redragon-h130-wired-gaming-headset",
    brand: "Redragon",
    model: "H130",
    category: "headphone",
    product_code: "SJ8PQR6",
    status: "In Stock",
    price: 3200,
    regular_price: 3500,
    key_features: [
      "Model: H130",
      "Wired Gaming Headset",
      "Noise Cancelling Microphone",
      "Comfortable Ear Cushions",
    ],
    specifications: {
      connectivity: "Wired",
      input_jack: "3.5mm Stereo",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/headset/redragon/h130/h130-01-228x228.webp",
  },
  {
    id: 1716109200025,
    title: "Jedel K29 Wired Keyboard",
    slug: "jedel-k29-wired-keyboard",
    brand: "Jedel",
    model: "K29",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40428",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/jedel/k29/k29-01-228x228.webp",
    price: 400,
    regular_price: 440,
    key_features: [
      "Model: K29",
      "Number of keys: 104",
      "Connection Type: Wired",
      "Cable length: 1.5m",
      "Feature: Slim Design, Wide Compatibility",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.5 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "1 year Warranty",
      },
    },
    description:
      "The Jedel K29 Wired Keyboard is a full-sized, high-performance keyboard built for speed and durability...",
  },
  {
    id: 1716109200026,
    title: "T-Wolf T15 Gaming Keyboard",
    slug: "t-wolf-t15-gaming-keyboard",
    brand: "T-Wolf",
    model: "T15",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40429",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/t-wolf/t15/t15-01-228x228.webp",
    price: 750,
    regular_price: 850,
    key_features: [
      "Model: T15",
      "Rainbow backlit keys",
      "Connection Type: Wired",
      "Durable design",
      "Multimedia shortcuts",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.6 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "T-Wolf T15 is a stylish wired gaming keyboard with backlighting and comfortable key response for daily and gaming use.",
  },
  {
    id: 1716109200027,
    title: "PC Power 403 Standard Keyboard",
    slug: "pc-power-403-standard-keyboard",
    brand: "PC Power",
    model: "403",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40430",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/pc-power/403/403-228x228.webp",
    price: 390,
    regular_price: 420,
    key_features: [
      "Model: 403",
      "Standard layout",
      "Connection Type: Wired",
      "Ergonomic design",
      "Plug and Play",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.5 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "6 months",
      },
    },
    description:
      "PC Power 403 is a reliable full-size keyboard perfect for office or home use with a simple plug-and-play interface.",
  },
  {
    id: 1716109200028,
    title: "Xtrike Me CMX-415 Gaming Keyboard",
    slug: "xtrike-me-cmx-415-gaming-keyboard",
    brand: "Xtrike Me",
    model: "CMX-415",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40431",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/xtrike-me/cmx-415/cmx-415-01-228x228.webp",
    price: 1150,
    regular_price: 1300,
    key_features: [
      "Model: CMX-415",
      "RGB backlight",
      "Connection Type: Wired",
      "Spill-resistant design",
      "Multimedia keys",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.6 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black with RGB",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "The Xtrike Me CMX-415 is a durable, stylish gaming keyboard with RGB lighting and functional design for gamers.",
  },
  {
    id: 1716109200029,
    title: "Havit KB487L Backlit Keyboard",
    slug: "havit-kb487l-backlit-keyboard",
    brand: "Havit",
    model: "KB487L",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40432",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/havit/kb487l/kb487l-01-228x228.jpg",
    price: 990,
    regular_price: 1100,
    key_features: [
      "Model: KB487L",
      "Backlit design",
      "Connection Type: Wired",
      "Mechanical feel",
      "Comfortable keystrokes",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.6 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black with red backlight",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "Havit KB487L is designed with backlit keys and durable structure, ideal for night use and typing comfort.",
  },
  {
    id: 1716109200030,

    title: "Fantech K614L Fighter III Keyboard",
    slug: "fantech-k614l-fighter-iii-keyboard",
    brand: "Fantech",
    model: "K614L Fighter III",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40433",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/k614l-fighter-iii/k614l-fighter-iii-228x228.webp",
    price: 1350,
    regular_price: 1500,
    key_features: [
      "Model: K614L Fighter III",
      "RGB lighting",
      "Connection Type: Wired",
      "Mechanical feel switches",
      "Compact layout",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "87",
        "Cable Length": "1.8 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "Fantech K614L Fighter III is a compact RGB keyboard built for gamers who need high performance in tight setups.",
  },
  {
    id: 1716109200031,
    title: "PC Power PCGKY601 RGB Keyboard",
    slug: "pc-power-pcgky601-rgb-keyboard",
    brand: "PC Power",
    model: "PCGKY601",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40434",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/pc-power/pcgky601/pcgky601-228x228.webp",
    price: 990,
    regular_price: 1050,
    key_features: [
      "Model: PCGKY601",
      "Colorful lighting",
      "Connection Type: Wired",
      "Ergonomic shape",
      "Full layout",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.5 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black with RGB",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "The PC Power PCGKY601 is a stylish RGB keyboard offering comfort, durability, and aesthetics at a budget-friendly price.",
  },
  {
    id: 1716109200032,
    title: "Fantech Atom63 MK874 V2 Keyboard",
    slug: "fantech-atom63-mk874-v2-keyboard",
    brand: "Fantech",
    model: "Atom63 MK874 V2",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40435",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/atom63-mk874-v2/atom63-mk874-v2-01-228x228.webp",
    price: 2850,
    regular_price: 3100,
    key_features: [
      "Model: Atom63 MK874 V2",
      "60% layout",
      "Hot-swappable keys",
      "RGB lighting",
      "Dual connectivity",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "63",
        "Cable Length": "1.8 meter",
        Interface: "USB Type-C",
      },
      physical_attribute: {
        Color: "White/Black",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "Fantech Atom63 MK874 V2 is a 60% mechanical keyboard with RGB and hot-swappable keys for ultimate customization.",
  },
  {
    id: 1716109200033,
    title: "Redragon K705 WG R-Pro Wireless Keyboard",
    slug: "redragon-k705-wg-r-pro-wireless-keyboard",
    brand: "Redragon",
    model: "K705 WG R-Pro",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40436",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/redragon/k705-wg-r-pro/k705-wg-r-pro-01-228x228.webp",
    price: 3450,
    regular_price: 3750,
    key_features: [
      "Model: K705 WG R-Pro",
      "Wireless + Wired Dual Mode",
      "RGB backlighting",
      "Long battery life",
      "Ergonomic keycaps",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Dual Mode",
        Keys: "104",
        "Cable Length": "1.8 meter",
        Interface: "USB / Wireless 2.4GHz",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "Redragon K705 WG R-Pro is a dual-mode gaming keyboard with RGB lighting and wireless functionality for freedom and style.",
  },
  {
    id: 1716109200034,
    title: "Gamdias Hermes M5A Mechanical Keyboard",
    slug: "gamdias-hermes-m5a-mechanical-keyboard",
    brand: "Gamdias",
    model: "Hermes M5A",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40437",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/gamdias/hermes-m5a/hermes-m5a-228x228.jpg",
    price: 4200,
    regular_price: 4500,
    key_features: [
      "Model: Hermes M5A",
      "Mechanical Blue Switches",
      "RGB lighting",
      "Aluminum top cover",
      "Gaming optimized",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "104",
        "Cable Length": "1.8 meter",
        Interface: "USB",
      },
      physical_attribute: {
        Color: "Black",
      },
      warranty_information: {
        Warranty: "2 years",
      },
    },
    description:
      "Gamdias Hermes M5A is a premium mechanical keyboard with robust construction and professional-grade typing feedback.",
  },
  {
    id: 1716109200035,
    title: "Redragon K644 SE Caraxes Mechanical Keyboard",
    slug: "redragon-k644-se-caraxes-mechanical-keyboard",
    brand: "Redragon",
    model: "K644 SE Caraxes",
    category: "Keyboard",
    status: "In Stock",
    product_code: "40438",
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/redragon/k644-se-caraxes/k644-se-caraxes-228x228.png",
    price: 4950,
    regular_price: 5200,
    key_features: [
      "Model: K644 SE Caraxes",
      "60% layout",
      "Hot-swappable red switches",
      "Detachable USB-C cable",
      "RGB backlit keys",
    ],
    specification: {
      main_features: {
        "Wired/Wireless": "Wired",
        Keys: "61",
        "Cable Length": "1.8 meter",
        Interface: "USB Type-C",
      },
      physical_attribute: {
        Color: "Black/Red",
      },
      warranty_information: {
        Warranty: "1 year",
      },
    },
    description:
      "Redragon K644 SE Caraxes is a compact mechanical keyboard with premium switches and gamer-focused features.",
  },
  {
    id: 1716109200036,
    title: "HP 15s-eq1578AU Laptop",
    slug: "hp-15s-eq1578au-laptop",
    brand: "HP",
    model: "15s-eq1578AU",
    category: "Laptop",
    status: "In Stock",
    product_code: "40439",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15s-eq1578au/15s-eq1578au-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 5 5500U",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "Reliable everyday laptop with AMD Ryzen 5 processor, 8GB RAM, and Full HD display.",
  },
  {
    id: 1716109200037,
    title: "HP 15s-eq1578AU Laptop (Duplicate Image)",
    slug: "hp-15s-eq1578au-laptop-2",
    brand: "HP",
    model: "15s-eq1578AU",
    category: "Laptop",
    status: "In Stock",
    product_code: "40440",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15s-eq1578au/15s-eq1578au-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 5 5500U",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "Reliable everyday laptop with AMD Ryzen 5 processor, 8GB RAM, and Full HD display.",
  },
  {
    id: 1716109200038,
    title: "HP FC0296AU Laptop",
    slug: "hp-fc0296au-laptop",
    brand: "HP",
    model: "FC0296AU",
    category: "Laptop",
    status: "In Stock",
    product_code: "40441",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/fc0296au/fc0296au-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 3 5300U",
      RAM: "4GB DDR4",
      storage: "256GB SSD",
      display: '15.6" HD (1366x768)',
      os: "Windows 11 Home",
    },
    description:
      "Affordable laptop for basic tasks, featuring AMD Ryzen 3 and a 15.6 inch HD display.",
  },
  {
    id: 1716109200039,
    title: "HP 250 G9 Asteroid Silver Laptop",
    slug: "hp-250-g9-asteroid-silver-laptop",
    brand: "HP",
    model: "250 G9",
    category: "Laptop",
    status: "In Stock",
    product_code: "40442",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/250-g9/250-g9-asteroid-silver-01-228x228.webp",
    key_features: {
      processor: "Intel Core i5 12th Gen",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Pro",
    },
    description:
      "HP 250 G9 with Intel 12th Gen i5, 8GB RAM and a crisp Full HD display.",
  },
  {
    id: 1716109200040,
    title: "HP 15s-fq2644tu Laptop",
    slug: "hp-15s-fq2644tu-laptop",
    brand: "HP",
    model: "15s-fq2644tu",
    category: "Laptop",
    status: "In Stock",
    product_code: "40443",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15s-fq2644tu/15s-fq2644tu-01-228x228.jpg",
    key_features: {
      processor: "Intel Core i3 12th Gen",
      RAM: "8GB DDR4",
      storage: "256GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "Budget-friendly laptop with Intel Core i3 12th Gen and Full HD display.",
  },
  {
    id: 1716109200041,
    title: "HP 250 G9 Asteroid Silver Laptop (Duplicate Image)",
    slug: "hp-250-g9-asteroid-silver-laptop-2",
    brand: "HP",
    model: "250 G9",
    category: "Laptop",
    status: "In Stock",
    product_code: "40444",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/250-g9/250-g9-asteroid-silver-01-228x228.webp",
    key_features: {
      processor: "Intel Core i5 12th Gen",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Pro",
    },
    description:
      "HP 250 G9 with Intel 12th Gen i5, 8GB RAM and a crisp Full HD display.",
  },
  {
    id: 1716109200042,
    title: "HP 15-fd0209tu Laptop",
    slug: "hp-15-fd0209tu-laptop",
    brand: "HP",
    model: "15-fd0209tu",
    category: "Laptop",
    status: "In Stock",
    product_code: "40445",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15-fd0209tu/15-fd0208tu-01-228x228.webp",
    key_features: {
      processor: "Intel Core i5 11th Gen",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 10 Home",
    },
    description:
      "HP 15-fd0209tu with Intel Core i5 11th Gen, perfect for mid-range tasks.",
  },
  {
    id: 1716109200043,
    title: "HP 250 G8 Ash Black Laptop",
    slug: "hp-250-g8-ash-black-laptop",
    brand: "HP",
    model: "250 G8",
    category: "Laptop",
    status: "In Stock",
    product_code: "40446",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/250-g8-black/250-g8-ash-black-01-228x228.webp",
    key_features: {
      processor: "Intel Core i3 10th Gen",
      RAM: "4GB DDR4",
      storage: "256GB SSD",
      display: '15.6" HD (1366x768)',
      os: "Windows 10 Home",
    },
    description:
      "Entry-level HP 250 G8 with Intel Core i3 10th Gen and basic HD display.",
  },
  {
    id: 1716109200044,
    title: "HP 255 G9 Laptop",
    slug: "hp-255-g9-laptop",
    brand: "HP",
    model: "255 G9",
    category: "Laptop",
    status: "In Stock",
    product_code: "40447",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/255-g9/255-g9-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 5 5500U",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "Powerful AMD Ryzen 5 laptop for multitasking and productivity.",
  },
  {
    id: 1716109200045,
    title: "HP 255 G9 Laptop (Duplicate Image)",
    slug: "hp-255-g9-laptop-2",
    brand: "HP",
    model: "255 G9",
    category: "Laptop",
    status: "In Stock",
    product_code: "40448",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/255-g9/255-g9-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 5 5500U",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "Powerful AMD Ryzen 5 laptop for multitasking and productivity.",
  },
  {
    id: 1716109200046,
    title: "HP 15s-eq2326AU Laptop",
    slug: "hp-15s-eq2326au-laptop",
    brand: "HP",
    model: "15s-eq2326AU",
    category: "Laptop",
    status: "In Stock",
    product_code: "40449",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15s-eq2326au/15s-eq2326au-01-228x228.webp",
    key_features: {
      processor: "AMD Ryzen 7 5825U",
      RAM: "16GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 11 Home",
    },
    description:
      "High-performance HP laptop with Ryzen 7 processor and 16GB RAM for power users.",
  },
  {
    id: 1716109200047,
    title: "HP 15-fd0203tu Laptop",
    slug: "hp-15-fd0203tu-laptop",
    brand: "HP",
    model: "15-fd0203tu",
    category: "Laptop",
    status: "In Stock",
    product_code: "40450",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "1 year",
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15-fd0203tu/15-fd0203tu-01-228x228.webp",
    key_features: {
      processor: "Intel Core i5 11th Gen",
      RAM: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" Full HD (1920x1080)',
      os: "Windows 10 Home",
    },
    description:
      "Reliable HP laptop with Intel i5 11th Gen processor and Full HD display.",
  },
  {
    id: 1716109200048,
    title: 'AOC 22B20JH2 22" 100Hz 1ms IPS FHD Monitor',
    slug: "aoc-22b20jh2-22-inch-100hz-1ms-ips-fhd-monitor",
    brand: "AOC",
    model: "22B20JH2",
    category: "Monitor",
    status: "In Stock",
    product_code: "40561",
    price: 10500,
    regular_price: 11550,
    discount_percent: 8.6,
    warranty: "3 years",
    product_url: "https://www.startech.com.bd/aoc-22b20jh2-fhd-monitor",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/aoc/24b20jh2/24b20jh2-08-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "IPS",
      refresh_rate: "100Hz",
      response_time: "1ms (MPRT)",
      ports: ["1x VGA", "1x HDMI 1.4"],
      extras: ["AdaptiveSync", "3-sided frameless design"],
    },
    specifications: {
      display_size: '22"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "250 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "12VDC, 2.5A",
      curvature: "Flat",
    },
    description:
      "A compact and efficient IPS monitor with AdaptiveSync, ideal for work and casual gaming. Sleek frameless design and wide viewing angles.",
  },
  {
    id: 1716109200049,
    title: 'Dahua DHI-LM19-A202Y 18.5" LED Monitor',
    slug: "dahua-dhi-lm19-a202y-18-inch-led-monitor",
    brand: "Dahua",
    model: "DHI-LM19-A202Y",
    category: "Monitor",
    status: "In Stock",
    product_code: "40622",
    price: 8500,
    regular_price: 9200,
    discount_percent: 7.6,
    warranty: "3 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/dahua/dhi-lm19-a202y/dhi-lm19-a202y-01-228x228.webp",
    key_features: {
      resolution: "1366x768",
      panel_type: "TN",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["Low Blue Light"],
    },
    specifications: {
      display_size: '18.5"',
      color_support: "16.2 Million",
      contrast_ratio: "600:1",
      brightness: "200 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "12V, 1.5A",
      curvature: "Flat",
    },
    description:
      "A budget-friendly monitor suited for basic office tasks and everyday computing with solid TN panel performance.",
  },
  {
    id: 1716109200050,
    title: 'Gigasonic RB-G19S 19" LED Monitor',
    slug: "gigasonic-rb-g19s-19-inch-led-monitor",
    brand: "Gigasonic",
    model: "RB-G19S",
    category: "Monitor",
    status: "In Stock",
    product_code: "40623",
    price: 7800,
    regular_price: 8500,
    discount_percent: 8.2,
    warranty: "2 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g19s-400c/rb-g19s-400c-228x228.webp",
    key_features: {
      resolution: "1366x768",
      panel_type: "LED",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x VGA"],
      extras: [],
    },
    specifications: {
      display_size: '19"',
      color_support: "16.7 Million",
      contrast_ratio: "700:1",
      brightness: "220 cd/m²",
      vesa_mount: "100x100mm",
      tilt: "-5° to 20°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "An affordable monitor for basic office or home use, offering decent visuals in a compact design.",
  },
  {
    id: 1716109200051,
    title: 'Acer K202QBi 19.5" 60Hz LED Monitor',
    slug: "acer-k202qbi-19-inch-60hz-monitor",
    brand: "Acer",
    model: "K202QBi",
    category: "Monitor",
    status: "In Stock",
    product_code: "40624",
    price: 8900,
    regular_price: 9600,
    discount_percent: 7.3,
    warranty: "3 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/acer/k202qbi/k202qbi-01-228x228.webp",
    key_features: {
      resolution: "1600x900",
      panel_type: "VA",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["Bluelight Shield"],
    },
    specifications: {
      display_size: '19.5"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "200 cd/m²",
      vesa_mount: "100x100mm",
      tilt: "-5° to 15°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "This Acer monitor is a step up for office use, offering better contrast and sharp visuals in an efficient form factor.",
  },
  {
    id: 1716109200052,
    title: 'Trendsonic TS5322 22" LED Monitor',
    slug: "trendsonic-ts5322-22-inch-led-monitor",
    brand: "Trendsonic",
    model: "TS5322",
    category: "Monitor",
    status: "In Stock",
    product_code: "40625",
    price: 9900,
    regular_price: 10400,
    discount_percent: 4.8,
    warranty: "2 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/trendsonic/ts5322/ts5322-001-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "LED",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: [],
    },
    specifications: {
      display_size: '22"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "230 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "12V",
      curvature: "Flat",
    },
    description:
      "Simple, sleek, and reliable 1080p monitor ideal for students or secondary displays.",
  },
  {
    id: 1716109200053,
    title: 'Dahua DHI-LM22-L200V 21.5" LED Monitor',
    slug: "dahua-dhi-lm22-l200v-21-inch-led-monitor",
    brand: "Dahua",
    model: "DHI-LM22-L200V",
    category: "Monitor",
    status: "In Stock",
    product_code: "40626",
    price: 11500,
    regular_price: 12200,
    discount_percent: 5.7,
    warranty: "3 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/dahua/dhi-lm22-l200v/dhi-lm22-l200v-01-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "IPS",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["Low Blue Light", "Free Sync"],
    },
    specifications: {
      display_size: '21.5"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "250 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "12V",
      curvature: "Flat",
    },
    description:
      "A solid all-rounder monitor with IPS panel and FreeSync technology for smoother visuals.",
  },
  {
    id: 1716109200054,
    title: 'Hikvision DS-D5022F2-2P2 21.5" LED Monitor',
    slug: "hikvision-ds-d5022f2-2p2-21-inch-led-monitor",
    brand: "Hikvision",
    model: "DS-D5022F2-2P2",
    category: "Monitor",
    status: "In Stock",
    product_code: "40627",
    price: 11000,
    regular_price: 11800,
    discount_percent: 6.8,
    warranty: "2 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/hikvision/ds-d5022f2-2p2/ds-d5022f2-2p2-01-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "IPS",
      refresh_rate: "60Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["G-Sync Support"],
    },
    specifications: {
      display_size: '21.5"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "230 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "Feature-packed IPS monitor with G-Sync support, perfect for smoother gaming and multimedia.",
  },
  {
    id: 1716109200055,
    title: 'Xiaomi V22FAB-RA 21.5" FHD Monitor',
    slug: "xiaomi-v22fab-ra-21-inch-fhd-monitor",
    brand: "Xiaomi",
    model: "V22FAB-RA",
    category: "Monitor",
    status: "In Stock",
    product_code: "40628",
    price: 12500,
    regular_price: 13000,
    discount_percent: 3.8,
    warranty: "3 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/xiaomi/v22fab-ra/v22fab-ra-001-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "IPS",
      refresh_rate: "60Hz",
      response_time: "6ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["Low Blue Light"],
    },
    specifications: {
      display_size: '21.5"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "250 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "Sleek Xiaomi monitor with eye care features and vibrant IPS display for home and office use.",
  },
  {
    id: 1716109200056,
    title: 'MSI PRO MP223-E2 21.5" FHD Monitor',
    slug: "msi-pro-mp223-e2-21-inch-fhd-monitor",
    brand: "MSI",
    model: "PRO MP223-E2",
    category: "Monitor",
    status: "In Stock",
    product_code: "40629",
    price: 13000,
    regular_price: 13500,
    discount_percent: 3.7,
    warranty: "3 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/msi/pro-mp223-e2/pro-mp223-e2-01-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "IPS",
      refresh_rate: "75Hz",
      response_time: "5ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: ["Anti-Flicker", "Low Blue Light"],
    },
    specifications: {
      display_size: '21.5"',
      color_support: "16.7 Million",
      contrast_ratio: "1000:1",
      brightness: "250 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "Professional grade MSI IPS monitor with flicker-free tech and eye comfort features.",
  },
  {
    id: 1716109200057,
    title: 'Walton WD215I10 21.5" LED Monitor',
    slug: "walton-wd215i10-21-inch-led-monitor",
    brand: "Walton",
    model: "WD215I10",
    category: "Monitor",
    status: "In Stock",
    product_code: "40630",
    price: 9000,
    regular_price: 9500,
    discount_percent: 5.3,
    warranty: "2 years",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/walton/wd215i10/wd215i10-01-228x228.webp",
    key_features: {
      resolution: "1920x1080",
      panel_type: "LED",
      refresh_rate: "60Hz",
      response_time: "8ms",
      ports: ["1x HDMI", "1x VGA"],
      extras: [],
    },
    specifications: {
      display_size: '21.5"',
      color_support: "16.7 Million",
      contrast_ratio: "800:1",
      brightness: "220 cd/m²",
      vesa_mount: "75x75mm",
      tilt: "-5° to 15°",
      power: "External",
      curvature: "Flat",
    },
    description:
      "Affordable Walton monitor with solid FHD display, suitable for general use and multimedia.",
  },

  {
    id: 1716109200059,
    title: "PC Power PCGMY01 Gaming Mouse",
    slug: "pc-power-pcgmy01-gaming-mouse",
    brand: "PC Power",
    model: "PCGMY01",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1001",
    description:
      "The PC Power PCGMY01 Gaming Mouse offers precision control with an ergonomic design suitable for gamers and professionals alike. It features adjustable DPI levels for smooth tracking and LED lighting for visual appeal.",
    price: 450,
    regular_price: 490,
    payment_options: "41৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "Adjustable DPI up to 1600",
      "LED lighting",
      "Ergonomic design",
      "USB connection",
    ],
    specifications: {
      dpi: "800/1200/1600",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/pc-power/pcgmy01/pcgmy01-01-228x228.webp",
  },
  {
    id: 1716109200060,
    title: "Micropack M101 Optical Mouse",
    slug: "micropack-m101-optical-mouse",
    brand: "Micropack",
    model: "M101",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1002",
    description:
      "Micropack M101 is a simple yet effective optical mouse ideal for everyday computing. It features smooth tracking, a lightweight design, and plug-and-play USB connectivity.",
    price: 300,
    regular_price: 350,
    payment_options: "27৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "3-button design",
      "1000 DPI resolution",
      "Ergonomic shape",
      "USB interface",
    ],
    specifications: {
      dpi: "1000",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/micropack/m101/m101-1-228x228.jpg",
  },
  {
    id: 1716109200061,
    title: "Havit MS70 Wired Mouse",
    slug: "havit-ms70-wired-mouse",
    brand: "Havit",
    model: "MS70",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1003",
    description:
      "The Havit MS70 mouse is designed for reliability and comfort. It features a smooth scroll wheel, solid build, and precise optical tracking for daily use.",
    price: 320,
    regular_price: 360,
    payment_options: "29৳/month, 0% EMI for up to 12 Months",
    key_features: ["Comfortable grip", "Plug-and-play", "Precise tracking"],
    specifications: {
      dpi: "1000",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/havit/ms70/ms70-01-228x228.webp",
  },
  {
    id: 1716109200062,
    title: "PC Power PCM-315 Wired Mouse",
    slug: "pc-power-pcm-315-wired-mouse",
    brand: "PC Power",
    model: "PCM-315",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1004",
    description:
      "The PC Power PCM-315 is a reliable wired mouse featuring ergonomic design and stable performance. It supports standard DPI levels for everyday computing.",
    price: 350,
    regular_price: 400,
    payment_options: "31৳/month, 0% EMI for up to 12 Months",
    key_features: ["Ergonomic shape", "Standard DPI range", "Smooth glide"],
    specifications: {
      dpi: "1200",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/pc-power/pcm-315/pcm-315-01-228x228.webp",
  },
  {
    id: 1716109200063,
    title: "PC Power PCGMG17 Gaming Mouse",
    slug: "pc-power-pcgmg17-gaming-mouse",
    brand: "PC Power",
    model: "PCGMG17",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1005",
    description:
      "Designed for gamers, the PC Power PCGMG17 offers precision, durability, and style. Its high DPI sensor ensures accurate control during intense sessions.",
    price: 490,
    regular_price: 540,
    payment_options: "45৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "Gaming-grade sensor",
      "Durable buttons",
      "Stylish RGB lighting",
    ],
    specifications: {
      dpi: "800-1600",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/pc-power/pcgmg17/pcgmg17-01-228x228.webp",
  },
  {
    id: 1716109200064,
    title: "Havit MS951GT Wireless Mouse",
    slug: "havit-ms951gt-wireless-mouse",
    brand: "Havit",
    model: "MS951GT",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1006",
    description:
      "The Havit MS951GT is a compact wireless mouse with 2.4GHz connectivity and adjustable DPI for flexible usage. Perfect for both office and casual use.",
    price: 490,
    regular_price: 550,
    payment_options: "45৳/month, 0% EMI for up to 12 Months",
    key_features: ["Wireless 2.4GHz", "Adjustable DPI", "Ergonomic shape"],
    specifications: {
      dpi: "800/1200/1600",
      connection_type: "Wireless",
      interface: "USB Nano Receiver",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/havit/ms951gt/ms951gt-01-228x228.webp",
  },
  {
    id: 1716109200065,
    title: "Xtrike Me GM-227 Gaming Mouse",
    slug: "xtrike-me-gm-227-gaming-mouse",
    brand: "Xtrike Me",
    model: "GM-227",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1007",
    description:
      "Xtrike Me GM-227 is a stylish gaming mouse with high sensitivity and programmable buttons, ideal for performance-focused gamers.",
    price: 600,
    regular_price: 650,
    payment_options: "55৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "Adjustable DPI up to 3200",
      "RGB lighting",
      "6 programmable buttons",
    ],
    specifications: {
      dpi: "800/1600/2400/3200",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/xtrike-me/gm-227/gm-227-01-228x228.webp",
  },
  {
    id: 1716109200066,
    title: "Logitech M90 Optical Mouse",
    slug: "logitech-m90-optical-mouse",
    brand: "Logitech",
    model: "M90",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1008",
    description:
      "The Logitech M90 is a reliable USB optical mouse that delivers smooth tracking and easy plug-and-play functionality.",
    price: 500,
    regular_price: 550,
    payment_options: "45৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "1000 DPI tracking",
      "Comfortable design",
      "Plug-and-play USB",
    ],
    specifications: {
      dpi: "1000",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "3 Years Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/Accessories/Mouse/logitech/m90-228x228.png",
  },
  {
    id: 1716109200067,
    title: "A4TECH OP-720 Wired Mouse",
    slug: "a4tech-op-720-wired-mouse",
    brand: "A4TECH",
    model: "OP-720",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1009",
    description:
      "The A4TECH OP-720 is a full-size wired mouse with precise optical tracking and a comfortable ambidextrous design.",
    price: 400,
    regular_price: 450,
    payment_options: "36৳/month, 0% EMI for up to 12 Months",
    key_features: ["Optical tracking", "3 buttons", "Comfort grip"],
    specifications: {
      dpi: "1000",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/a4tech/op-720/op-720-01-228x228.jpg",
  },
  {
    id: 1716109200068,
    title: "A4TECH OP-330 USB Mouse",
    slug: "a4tech-op-330-usb-mouse",
    brand: "A4TECH",
    model: "OP-330",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1010",
    description:
      "A4TECH OP-330 delivers accurate cursor control with a high-definition optical sensor. Suitable for office and home use.",
    price: 390,
    regular_price: 430,
    payment_options: "35৳/month, 0% EMI for up to 12 Months",
    key_features: ["HD Optical sensor", "USB interface", "Smooth scroll wheel"],
    specifications: {
      dpi: "1000",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/a4tech/op-330/op-330-01-228x228.jpg",
  },
  {
    id: 1716109200069,
    title: "AULA S13 Gaming Mouse",
    slug: "aula-s13-gaming-mouse",
    brand: "AULA",
    model: "S13",
    category: "mouse",
    status: "In Stock",
    product_code: "MOU1011",
    description:
      "The AULA S13 is a high-performance gaming mouse with customizable DPI, stylish design, and durable construction for competitive play.",
    price: 680,
    regular_price: 750,
    payment_options: "62৳/month, 0% EMI for up to 12 Months",
    key_features: [
      "Customizable DPI settings",
      "Gaming-grade sensor",
      "LED lighting",
    ],
    specifications: {
      dpi: "Up to 3200",
      connection_type: "Wired",
      interface: "USB",
      color: "Black",
      warranty: "1 Year Warranty",
    },
    image:
      "https://www.startech.com.bd/image/cache/catalog/mouse/aula/s13/s13-01-228x228.webp",
  },
  {
    id: 1716109200070,
    title: "OPPO A3 4G",
    slug: "oppo-a3-4g",
    brand: "OPPO",
    model: "A3 4G",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1012",
    price: 7999,
    regular_price: 8999,
    discount: "11%",
    color: ["Starlight White"],
    display: {
      size: "6.2 inch",
      resolution: "HD+ (1520 x 720)",
      type: "IPS LCD",
      refresh_rate: "60Hz",
    },
    processor: "MediaTek MT6765 Helio P35",
    ram: ["4GB"],
    storage: ["64GB"],
    camera: {
      rear: "13 MP + 2 MP",
      front: "8 MP",
    },
    battery: "4230 mAh",
    os: "Android 9.0 (Pie)",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/oppo/a3-4g/oppo-a3-starlight-white-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "OPPO A3 4G offers reliable performance with its MediaTek Helio P35 chipset and a vibrant 6.2-inch display. Perfect for everyday tasks and casual photography.",
  },
  {
    id: 1716109200071,
    title: "Samsung Galaxy M14 4G",
    slug: "samsung-galaxy-m14-4g",
    brand: "Samsung",
    model: "Galaxy M14 4G",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1013",
    price: 14999,
    regular_price: 15999,
    discount: "6%",
    color: ["Dark Blue"],
    display: {
      size: "6.6 inch",
      resolution: "FHD+ (1080 x 2408)",
      type: "PLS LCD",
      refresh_rate: "90Hz",
    },
    processor: "Exynos 1330",
    ram: ["4GB", "6GB"],
    storage: ["64GB", "128GB"],
    camera: {
      rear: "50 MP + 2 MP",
      front: "13 MP",
    },
    battery: "6000 mAh",
    os: "Android 13",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-m14-4g/galaxy-m14-4g-darkblue-01-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy M14 4G is a powerful budget smartphone with a massive 6000mAh battery and a smooth 90Hz display for immersive media consumption.",
  },
  {
    id: 1716109200072,
    title: "Samsung Galaxy A16 5G",
    slug: "samsung-galaxy-a16-5g",
    brand: "Samsung",
    model: "Galaxy A16 5G",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1014",
    price: 13999,
    regular_price: 14999,
    discount: "7%",
    color: ["Black"],
    display: {
      size: "6.6 inch",
      resolution: "HD+ (720 x 1600)",
      type: "PLS LCD",
      refresh_rate: "90Hz",
    },
    processor: "MediaTek Dimensity 6100+",
    ram: ["4GB", "6GB"],
    storage: ["64GB", "128GB"],
    camera: {
      rear: "50 MP + 2 MP",
      front: "13 MP",
    },
    battery: "5000 mAh",
    os: "Android 12",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a16-5g/galaxy-a16-5g-0001-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy A16 5G delivers essential 5G connectivity and a large 5000mAh battery, ensuring long-lasting usage with a smooth 90Hz display.",
  },
  {
    id: 1716109200073,
    title: "Samsung Galaxy A14",
    slug: "samsung-galaxy-a14",
    brand: "Samsung",
    model: "Galaxy A14",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1015",
    price: 12999,
    regular_price: 13999,
    discount: "7%",
    color: ["Black"],
    display: {
      size: "6.6 inch",
      resolution: "FHD+ (1080 x 2408)",
      type: "PLS LCD",
      refresh_rate: "90Hz",
    },
    processor: "Exynos 850",
    ram: ["4GB", "6GB"],
    storage: ["64GB", "128GB"],
    camera: {
      rear: "50 MP + 2 MP + 2 MP",
      front: "13 MP",
    },
    battery: "5000 mAh",
    os: "Android 13",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a14/galaxy-a14-01-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy A14 offers a balanced mix of power and battery life, featuring a triple rear camera setup and a sharp FHD+ display.",
  },
  {
    id: 1716109200074,
    title: "OPPO Reno12 F",
    slug: "oppo-reno12-f",
    brand: "OPPO",
    model: "Reno12 F",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1016",
    price: 23999,
    regular_price: 24999,
    discount: "4%",
    color: ["Black"],
    display: {
      size: "6.43 inch",
      resolution: "AMOLED, FHD+ (1080 x 2400)",
      type: "AMOLED",
      refresh_rate: "90Hz",
    },
    processor: "MediaTek Helio G99",
    ram: ["8GB"],
    storage: ["128GB"],
    camera: {
      rear: "64 MP + 2 MP",
      front: "16 MP",
    },
    battery: "4500 mAh",
    os: "Android 12, ColorOS 12.1",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/oppo/reno12-f/reno12-f-01-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "OPPO Reno12 F features a stunning AMOLED display and capable Helio G99 processor for smooth daily performance and vivid visuals.",
  },
  {
    id: 1716109200075,
    title: "Samsung Galaxy A15 5G",
    slug: "samsung-galaxy-a15-5g",
    brand: "Samsung",
    model: "Galaxy A15 5G",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1017",
    price: 12499,
    regular_price: 13499,
    discount: "7%",
    color: ["Blue"],
    display: {
      size: "6.6 inch",
      resolution: "HD+ (720 x 1600)",
      type: "IPS LCD",
      refresh_rate: "90Hz",
    },
    processor: "MediaTek Helio G37",
    ram: ["4GB"],
    storage: ["64GB"],
    camera: {
      rear: "50 MP + 2 MP",
      front: "8 MP",
    },
    battery: "5000 mAh",
    os: "Android 12",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a15-5g/galaxy-a15-5g-blue-official-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy A15 5G offers affordable 5G connectivity with a big display and reliable 5000mAh battery.",
  },
  {
    id: 1716109200076,
    title: "Samsung Galaxy F13",
    slug: "samsung-galaxy-f13",
    brand: "Samsung",
    model: "Galaxy F13",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1018",
    price: 11999,
    regular_price: 12999,
    discount: "8%",
    color: ["Blue"],
    display: {
      size: "6.6 inch",
      resolution: "FHD+ (1080 x 2408)",
      type: "IPS LCD",
      refresh_rate: "60Hz",
    },
    processor: "Exynos 850",
    ram: ["4GB"],
    storage: ["64GB", "128GB"],
    camera: {
      rear: "50 MP + 5 MP + 2 MP",
      front: "8 MP",
    },
    battery: "6000 mAh",
    os: "Android 12",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-f13/galaxy-f13-001-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy F13 stands out with a huge 6000mAh battery and triple camera setup for all-day use and photography.",
  },
  {
    id: 1716109200077,
    title: "Samsung Galaxy Z Flip4",
    slug: "samsung-galaxy-z-flip4",
    brand: "Samsung",
    model: "Galaxy Z Flip4",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1019",
    price: 89999,
    regular_price: 99999,
    discount: "10%",
    color: ["Gray", "Purple", "Pink", "Blue"],
    display: {
      size: "6.7 inch",
      resolution: "FHD+ (1080 x 2640)",
      type: "Dynamic AMOLED 2X",
      refresh_rate: "120Hz",
    },
    processor: "Qualcomm Snapdragon 8+ Gen 1",
    ram: ["8GB"],
    storage: ["128GB", "256GB", "512GB"],
    camera: {
      rear: "12 MP + 12 MP",
      front: "10 MP",
    },
    battery: "3700 mAh",
    os: "Android 12",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-z-flip4/galaxy-z-flip4-001-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy Z Flip4 combines foldable innovation with powerful specs and a sleek design, perfect for tech enthusiasts.",
  },
  {
    id: 1716109200078,
    title: "Samsung Galaxy S24 FE",
    slug: "samsung-galaxy-s24-fe",
    brand: "Samsung",
    model: "Galaxy S24 FE",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1020",
    price: 64999,
    regular_price: 69999,
    discount: "7%",
    color: ["Gray", "White", "Light Blue"],
    display: {
      size: "6.4 inch",
      resolution: "FHD+ (1080 x 2340)",
      type: "Dynamic AMOLED 2X",
      refresh_rate: "120Hz",
    },
    processor: "Exynos 2400 / Snapdragon 8 Gen 2",
    ram: ["8GB", "12GB"],
    storage: ["128GB", "256GB"],
    camera: {
      rear: "50 MP + 12 MP + 8 MP",
      front: "32 MP",
    },
    battery: "4500 mAh",
    os: "Android 13",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-s24-fe/galaxy-s24-fe-01-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Samsung Galaxy S24 FE offers flagship features at a competitive price with excellent cameras and a smooth 120Hz AMOLED display.",
  },
  {
    id: 1716109200079,
    title: "Apple iPhone 16",
    slug: "apple-iphone-16",
    brand: "Apple",
    model: "iPhone 16",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1021",
    price: 119999,
    regular_price: 124999,
    discount: "4%",
    color: ["Space Black", "Silver", "Gold", "Blue"],
    display: {
      size: "6.1 inch",
      resolution: "Super Retina XDR (1170 x 2532)",
      type: "OLED",
      refresh_rate: "120Hz ProMotion",
    },
    processor: "Apple A18 Bionic",
    ram: ["6GB"],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    camera: {
      rear: "48 MP + 12 MP",
      front: "12 MP",
    },
    battery: "3200 mAh approx.",
    os: "iOS 18",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-16/iphone-16--228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Apple iPhone 16 delivers cutting-edge performance and an advanced camera system in a sleek and durable design.",
  },
  {
    id: 1716109200080,
    title: "Honor X7c",
    slug: "honor-x7c",
    brand: "Honor",
    model: "X7c",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1022",
    price: 10999,
    regular_price: 11999,
    discount: "8%",
    color: ["Forest Green"],
    display: {
      size: "6.74 inch",
      resolution: "HD+ (720 x 1652)",
      type: "IPS LCD",
      refresh_rate: "90Hz",
    },
    processor: "MediaTek Helio G88",
    ram: ["4GB"],
    storage: ["128GB"],
    camera: {
      rear: "48 MP + 2 MP",
      front: "8 MP",
    },
    battery: "5000 mAh",
    os: "Android 12, Magic UI 6",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/honor/x7c/honor-x7c-forest-green-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Honor X7c is a budget-friendly smartphone with a large display, good battery life, and decent cameras for everyday use.",
  },
  {
    id: 1716109200081,
    title: "Vivo Y04",
    slug: "vivo-y04",
    brand: "Vivo",
    model: "Y04",
    category: "smartphone",
    status: "In Stock",
    product_code: "MOU1023",
    price: 8999,
    regular_price: 9999,
    discount: "10%",
    color: ["Titanium Gold"],
    display: {
      size: "6.38 inch",
      resolution: "HD+ (720 x 1560)",
      type: "IPS LCD",
      refresh_rate: "60Hz",
    },
    processor: "MediaTek Helio P35",
    ram: ["3GB"],
    storage: ["32GB"],
    camera: {
      rear: "13 MP",
      front: "5 MP",
    },
    battery: "4030 mAh",
    os: "Android 12, Funtouch OS 12",
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/vivo/y04/vivo-y04-titanium-gold-228x228.webp",
    warranty: "1 Year Warranty",
    description:
      "Vivo Y04 is an entry-level smartphone designed for basic usage with decent cameras and battery life.",
  },
  {
    id: 1716109200082,
    title: "Oraimo Watch 5 Lite",
    slug: "oraimo-watch-5-lite",
    brand: "Oraimo",
    model: "Watch 5 Lite",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1024",
    price: 1900,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/oraimo/watch-5-lite/watch-5-lite-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200083,
    title: "QCY Watch GS",
    slug: "qcy-watch-gs",
    brand: "QCY",
    model: "Watch GS",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1025",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/qcy/watch-gs/watch-gs-grey-01-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200084,
    title: "QCY Watch GT",
    slug: "qcy-watch-gt",
    brand: "QCY",
    model: "Watch GT",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1026",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/qcy/watch-gt/watch-gt-01-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200085,
    title: "Oraimo Watch 5 Berry Grey",
    slug: "oraimo-watch-5-berry-grey",
    brand: "Oraimo",
    model: "Watch 5",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1027",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/oraimo/watch-5/watch-5-berry-grey-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200086,
    title: "Xiaomi Haylou Watch 2 Pro",
    slug: "xiaomi-haylou-watch-2-pro",
    brand: "Xiaomi",
    model: "Haylou Watch 2 Pro",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1028",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/xiaomi/haylou-watch-2-pro/watch-2-pro-blue-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200087,
    title: "Oraimo Watch 2R Black",
    slug: "oraimo-watch-2r-black",
    brand: "Oraimo",
    model: "Watch 2R",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU1029",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/oraimo/watch-2r/watch-2r-black-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200088,
    title: "QCY Watch Active GX",
    slug: "qcy-watch-active-gx",
    brand: "QCY",
    model: "Watch Active GX",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "40749",
    price: 3150,
    regular_price: 3465,
    discount_percent: 9.1,
    warranty: "6 Months (Please preserve box to claim warranty)",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/qcy/watch-active-gx/watch-active-gx-01-228x228.webp",
    key_features: {
      display: '1.43" AMOLED HD Display',
      resolution: "466×466 pixels",
      ppi: 326,
      battery_life: "Up to 7 days",
      water_resistance: "IP68",
      sports_modes: "127+ Sports Mode",
      bluetooth_call: true,
      strap_material: "Silicone",
      strap_width: "22mm",
      material: "Zinc alloy",
    },
    specifications: {
      connectivity: "Bluetooth",
      special_features: [
        "Bluetooth call",
        "Dazzling Watch Face",
        "Proactive Health Monitoring",
        "Comprehensive Fitness Tracking",
        "Magnetic Wireless Charging",
        "Supports over 100 sports modes",
        "Mobile OS: Android 6.1+ and iOS 12.0+",
        "Bangla language support",
      ],
      dimension: "46.5 × 46.5 × 13.5 mm",
      weight: "27.5g",
      color: ["Black", "Grey"],
    },
    description: `The QCY Watch Active GX Smart Watch combines a sleek, modern design with advanced functionality, offering a seamless wearable experience. Equipped with a stunning 1.43-inch AMOLED display and a resolution of 466 × 466 pixels, this QCY Active GX Smart Watch delivers crisp, vibrant visuals for easy readability. The watch supports Bluetooth calling and notifications, keeping you connected on the go with the QCY Watch Active GX Bluetooth Smart Watch. With 24/7 health tracking, it continuously monitors vital metrics such as heart rate, SpO2, and sleep quality, empowering you to stay on top of your fitness journey. Featuring 120 sports modes and various fitness tracking capabilities, the QCY Watch Active GX is perfect for athletes and fitness enthusiasts alike. The watch's sensors, including a heart-rate sensor, SpO2 sensor, and gravity sensor, offer accurate and reliable data. It also boasts an IP68 waterproof rating, making it suitable for use in a variety of environments, including swimming and outdoor workouts. The QCY Watch Active GX Smartwatch is compatible with both Android (version 8.0 or above) and iOS (version 13.0 or above), and supports Bangla language for a more personalized user experience. The 300mAh battery provides up to 7 days of usage under normal conditions, and up to 4 days with heavy use, ensuring long-lasting performance. Charging is made easy with a magnetic charger, and the 22mm strap allows for a comfortable, adjustable fit. With its stylish 46.5 × 46.5 × 13.5 mm bezel size, the QCY Watch Active GX Smart Watch is both functional and fashionable, making it a great companion for everyday wear and fitness tracking.`,
  },
  {
    id: 1716109200089,
    title: "Oraimo Watch 5R Black",
    slug: "oraimo-watch-5r-black",
    brand: "Oraimo",
    model: "Watch 5R",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU10U0",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/oraimo/watch-5r/watch-5r-black-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200090,
    title: "Haylou Watch S8 Black",
    slug: "haylou-watch-s8-black",
    brand: "Haylou",
    model: "Watch S8",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU10U1",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/haylou/watch-s8/watch-s8-black-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
  {
    id: 1716109200091,
    title: "Haylou Watch R8 Black",
    slug: "haylou-watch-r8-black",
    brand: "Haylou",
    model: "Watch R8",
    category: "Smart Watch",
    status: "In Stock",
    product_code: "MOU10U1",
    price: 0,
    regular_price: 0,
    discount_percent: 0,
    warranty: "N/A",
    product_url: "#",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/haylou/watch-r8/watch-r8-black-official-228x228.webp",
    key_features: {},
    specifications: {},
    description: "",
  },
];
