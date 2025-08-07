"use client";

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
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CategoryPage = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("name") ?? "Unknown";
  console.log(categoryName);

  const { data, isLoading, error } = useGetAllProductsQuery({
    searchTerm: categoryName,
  });
  const products = data?.response;
  console.log(data?.meta);
  console.log(products, "products from featured catergory page");

  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) =>
        product.category?.toLowerCase().includes(categoryName.toLowerCase())
      ) || []
    );
  }, [products, categoryName]);

  const prices = useMemo(
    () => filteredProducts.map((p) => p.price),
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

    setFilters({
      inStock: name === "inStock" ? checked : filters.inStock,
      outOfStock: name === "outOfStock" ? checked : filters.outOfStock,
    });
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
      const status = normalizeStatus(product.status || "");
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
        : selectedBrands.includes(product.brand)
    );
  }, [filteredByStock, selectedBrands]);

  const finalFilteredProducts = useMemo(() => {
    return filteredByBrand.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }, [filteredByBrand, priceRange]);

  const uniqueBrands = useMemo(
    () => [...new Set(filteredProducts.map((p) => p.brand))],
    [filteredProducts]
  );

  const inStockCount = filteredProducts.filter(
    (p) => normalizeStatus(p.status || "") === "in stock"
  ).length;

  const outOfStockCount = filteredProducts.filter(
    (p) => normalizeStatus(p.status || "") === "out of stock"
  ).length;

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f0f2f5" }}>
      <Grid container spacing={3}>
        {/* LEFT SIDE — Filter Panel */}
        <Grid item xs={12} md={4}>
          {/* Price Filter */}
          <Paper
            elevation={6}
            sx={{ p: 2, bgcolor: "white", borderRadius: "10px", m: 1 }}
          >
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
          <Paper
            elevation={6}
            sx={{ p: 2, bgcolor: "white", borderRadius: "10px", m: 1 }}
          >
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
                    sx={{
                      color: "#FF7F50",
                      "&.Mui-checked": { color: "#FF7F50" },
                    }}
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
                    sx={{
                      color: "#FF7F50",
                      "&.Mui-checked": { color: "#FF7F50" },
                    }}
                  />
                }
                label={`Out of Stock (${outOfStockCount})`}
              />
            </FormGroup>
          </Paper>

          {/* Brands */}
          <Paper
            elevation={6}
            sx={{ p: 2, bgcolor: "white", borderRadius: "10px", m: 1 }}
          >
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
                      sx={{
                        color: "#FF7F50",
                        "&.Mui-checked": { color: "#FF7F50" },
                      }}
                    />
                  }
                  label={brand}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>

        {/* RIGHT SIDE — Product Grid */}
        <Grid item xs={12} md={8} my={1}>
          <Grid container spacing={3}>
            {finalFilteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
