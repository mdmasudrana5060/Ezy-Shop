import { alpha, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useAppDispatch } from "@/redux/hook";
import { setProducts } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query: Record<string, any> = {};
  query["searchTerm"] = searchQuery;
  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const { data, isLoading, error } = useGetAllProductsQuery(
    {
      ...query,
    },
    { skip: !searchQuery }
  );
  useEffect(() => {
    if (data?.response) {
      dispatch(setProducts(data.response));
      router.push("/products");
    }
  }, [data, dispatch]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

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
          value={searchQuery}
          onChange={handleChange}
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
