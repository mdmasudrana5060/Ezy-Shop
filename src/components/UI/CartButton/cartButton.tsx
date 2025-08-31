import { useCart } from "@/hooks.ts/useCart";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export const CartButton = () => {
  const { totalItems, isLoading } = useCart();
  return (
    <Badge badgeContent={totalItems} color="primary">
      <ShoppingCartIcon />
    </Badge>
  );
};
