"use client";
import { alpha, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useAppDispatch, useDebounced } from "@/redux/hook";
import { setProducts } from "@/redux/slices/productSlice";
import { useRouter, usePathname } from "next/navigation";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const query: Record<string, any> = {};
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, error } = useGetAllProductsQuery(query, {
    skip: !debouncedTerm,
  });

  useEffect(() => {
    if (data?.response) {
      dispatch(setProducts(data.response));
    }
  }, [data, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      if (pathname !== "/products") {
        router.push("/products");
      }
      setSearchTerm("");
    }
  };

  return (
    <Box sx={{ width: "50%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "4px",
          backgroundColor: alpha("#FFFFFF", 0.15),
          "&:hover": {
            backgroundColor: alpha("#FFFFFF", 0.25),
          },
          width: "100%",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <SearchIcon sx={{ color: "#FFFFFF", mr: 1 }} />
        <InputBase
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search gadgets..."
          sx={{
            color: "#FFFFFF",
            width: "100%",
            "::placeholder": {
              color: "#FFFFFF",
              opacity: 0.7,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
