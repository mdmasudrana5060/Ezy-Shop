import { alpha, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
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
