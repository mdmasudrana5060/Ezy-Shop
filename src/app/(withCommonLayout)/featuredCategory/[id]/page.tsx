"use client";

import PaginationCard from "@/components/PaginationCard";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CategoryPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name") ?? "Unknown";

  const { data, isLoading, error } = useGetAllProductsQuery({
    page,
    limit,
    searchTerm: categoryName,
  });
  console.log(data);

  const products = data?.response ?? [];
  const meta = data?.meta;
  console.log(meta);

  const filteredProducts = useMemo(() => {
    return products?.filter((product) =>
      product?.category?.toLowerCase().includes(categoryName.toLowerCase())
    );
  }, [products, categoryName]);

  const prices = useMemo(
    () =>
      filteredProducts
        .map((p) => p?.price)
        .filter((price) => typeof price === "number") as number[],
    [filteredProducts]
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange([min, max]);
    }
  }, [prices]);

  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: false,
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brand = e.target.name;
    setSelectedBrands((prev) =>
      e.target.checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const normalizeStatus = (status: string) => status.trim().toLowerCase();

  const filteredByStock = useMemo(() => {
    return filteredProducts.filter((product) => {
      const status = normalizeStatus(product?.status || "");
      if (filters.inStock && !filters.outOfStock) return status === "in stock";
      if (!filters.inStock && filters.outOfStock)
        return status === "out of stock";
      return true;
    });
  }, [filteredProducts, filters]);

  const filteredByBrand = useMemo(() => {
    return filteredByStock.filter((product) =>
      selectedBrands.length === 0
        ? true
        : selectedBrands.includes(product?.brand)
    );
  }, [filteredByStock, selectedBrands]);

  const finalFilteredProducts = useMemo(() => {
    return filteredByBrand.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }, [filteredByBrand, priceRange]);

  const uniqueBrands = useMemo(
    () => [...new Set(filteredProducts.map((p) => p?.brand).filter(Boolean))],
    [filteredProducts]
  );

  const inStockCount = filteredProducts.filter(
    (p) => normalizeStatus(p?.status || "") === "in stock"
  ).length;

  const outOfStockCount = filteredProducts.filter(
    (p) => normalizeStatus(p?.status || "") === "out of stock"
  ).length;

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <Box
      sx={{
        padding: "20px",

        backgroundColor: "#f0f2f5",
      }}
    >
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* LEFT SIDE — Filter Panel */}
        <Grid item xs={12} md={4}>
          {/* Price Filter */}
          <Paper elevation={6} sx={{ p: 2, borderRadius: "10px", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Price
            </Typography>
            <Divider />
            <Slider
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={Math.min(...prices)}
              max={Math.max(...prices)}
              sx={{ color: "#FF7F50" }}
              disabled={prices.length === 0}
            />
            <Typography gutterBottom>
              ৳{priceRange[0]} - ৳{priceRange[1]}
            </Typography>
          </Paper>

          {/* Availability */}
          <Paper elevation={6} sx={{ p: 2, borderRadius: "10px", mb: 3 }}>
            <Typography gutterBottom fontWeight={600}>
              Availability
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleCheckbox}
                    sx={{ color: "#FF7F50" }}
                  />
                }
                label={`In Stock (${inStockCount})`}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="outOfStock"
                    checked={filters.outOfStock}
                    onChange={handleCheckbox}
                    sx={{ color: "#FF7F50" }}
                  />
                }
                label={`Out of Stock (${outOfStockCount})`}
              />
            </FormGroup>
          </Paper>

          {/* Brands */}
          <Paper elevation={6} sx={{ p: 2, borderRadius: "10px" }}>
            <Typography gutterBottom fontWeight={600}>
              Brands
            </Typography>
            <FormGroup>
              {uniqueBrands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      name={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={handleBrandChange}
                      sx={{ color: "#FF7F50" }}
                    />
                  }
                  label={brand}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>

        {/* RIGHT SIDE — Product Grid */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {finalFilteredProducts.map((product, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                key={product._id || index}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="center" my={4}>
        {meta && (
          <PaginationCard
            meta={meta}
            limit={limit}
            setLimit={setLimit} // ✅ correct function
            setPage={setPage}
          />
        )}
      </Stack>
    </Box>
  );
};

export default CategoryPage;
