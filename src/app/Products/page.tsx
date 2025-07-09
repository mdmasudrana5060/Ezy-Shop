"use client";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductQuery } from "@/redux/api/productApi";

import { Box } from "@mui/material";

const Products = () => {
  const { data: products, isLoading, error } = useGetAllProductQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
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
  );
};
export default Products;
