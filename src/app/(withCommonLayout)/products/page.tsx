"use client";
import PaginationCard from "@/components/PaginationCard";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProducts } from "@/redux/slices/productSlice";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const { data, isLoading, error } = useGetAllProductsQuery({
    page,
    limit,
  });

  useEffect(() => {
    if (data?.response) {
      dispatch(setProducts(data.response));
    }
  }, [data, dispatch]);

  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <Box>
      {products && products.length > 0 ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          justifyContent="center"
          justifyItems="center"
          mx={2}
          my={8}
          gap={6}
        >
          {products.map((product) => (
            <Box key={product.id} width="100%" height="100%">
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="40vh"
        >
          <Typography variant="h6">Products not found</Typography>
        </Stack>
      )}

      <Stack direction="row" spacing={2} justifyContent="center" my={4}>
        <PaginationCard
          meta={meta}
          limit={limit}
          setLimit={limit}
          setPage={setPage}
        />
      </Stack>
    </Box>
  );
};

export default Products;
