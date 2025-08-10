// PaginationWrapper.tsx
import { Box, MenuItem, Select, Pagination } from "@mui/material";

const PaginationCard = ({ meta, setPage, setLimit, limit }) => {
  const { page, totalPage } = meta;
  const totalPages = totalPage || 1;

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
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
    </Box>
  );
};

export default PaginationCard;
