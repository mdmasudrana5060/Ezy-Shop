"use client";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useGetAllProductsQuery({
    page,
    limit,
  });
  console.log(data);
  const products = data?.response;
  const meta = data?.meta;

  const totalPages = meta?.totalPage || 1;
  console.log(totalPages);

  const handlePageChange = (e, value) => {
    console.log(value);
    setPage(value);
  };
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        justifyContent="center"
        justifyItems="center"
        mx={2}
        my={8}
        gap={6}
      >
        {products?.map((product) => (
          <Box key={product.id} width="100%" height="100%">
            <ProductCard product={product} key={product.id} />
          </Box>
        ))}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center" my={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />

        <Select value={limit} onChange={handleLimitChange} size="small">
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
      </Stack>
    </Box>
  );
};
export default Products;
