"use client";

import QuantityBox from "@/components/QuantiityBox";
import { useGetProductQuery } from "@/redux/api/productApi";
import { use } from "react";
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
  const { id } = use(params);
  const productId = parseInt(id, 10);
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (!product) return <div>Product not found</div>;

  const monthlyInstallment = Math.ceil(product.price / 12);

  return (
    <Box>
      <Box
        m={8}
        display="flex"
        justifyContent="space-around"
        p={2}
        bgcolor="grey.100"
      >
        <Stack mt={8}>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </Stack>

        <Stack mt={6} maxWidth="700px">
          <Typography variant="h5" sx={{ color: "blue" }}>
            {product.title}
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ rowGap: 1 }}>
            <Typography sx={badgeStyle}>Price: {product.price}</Typography>
            {product.regular_price !== 0 && (
              <Typography sx={badgeStyle}>
                Regular Price: {product.regular_price}
              </Typography>
            )}

            <Typography sx={badgeStyle}>Stock: {product.status}</Typography>
            <Typography sx={badgeStyle}>
              Product Code: {product.product_code}
            </Typography>
            <Typography sx={badgeStyle}>Brand: {product.brand}</Typography>
          </Stack>

          <Stack m={1}>
            <Typography variant="h6" fontWeight={400} mt={1}>
              Key Features:
            </Typography>
            <ul style={{ marginTop: 0, paddingLeft: 20 }}>
              {product?.key_features?.map((f, i) => (
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
                    {product.price}
                    <span style={{ color: "red", fontWeight: 600 }}>৳</span>
                    <del style={{ marginLeft: 8 }}>
                      {product.regular_price}
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

          <QuantityBox
            product={product}
            selectedOption={selectedOption}
            selectedPrice={
              selectedOption === "cash" ? product.price : monthlyInstallment
            }
          />
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
            { label: "Question", count: product.question?.length || 0 },
            { label: "Reviews", count: product.reviews?.length || 0 },
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
            {renderSpecs(product?.specification)}
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
            <Typography variant="body1">{product.description}</Typography>
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
                Questions ({product.question?.length || 0})
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#FF7F50", p: 1, borderRadius: 10 }}
              >
                Ask Question
              </Button>
            </Box>

            {product.question && product.question.length > 0 ? (
              product.question.map((q, idx) => (
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
                Reviews ({product.reviews?.length || 0})
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#FF7F50", p: 1, borderRadius: 10 }}
              >
                Write Review
              </Button>
            </Box>

            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((r, idx) => (
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
