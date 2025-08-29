import { useGetAllCartQuery } from "@/redux/api/cartApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export const CartButton = () => {
  const { data, isLoading } = useGetAllCartQuery({});
  const cartCount = data?.[0]?.items?.length || 0;
  return (
    <Badge badgeContent={cartCount} color="primary">
      <ShoppingCartIcon />
    </Badge>
  );
};
