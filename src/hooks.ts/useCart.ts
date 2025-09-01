// hooks/useCart.ts
import { useCreateCartMutation, useGetAllCartQuery } from "@/redux/api/cartApi";
import { useAppSelector } from "@/redux/hook";
import { CartProduct, Product } from "@/types";
import { useMemo } from "react";
type CartItem = {
  price: number;
  productId: string;
  productName: string;
  quantity: number;
};

export const useCart = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async (
    product: Product,
    selectedPrice?: number,
    quantity: number = 1
  ) => {
    if (!accessToken) return;

    const cartItem = {
      productId: product.id,
      productName: product.title,
      price: selectedPrice ?? product.price, // ✅ use selectedPrice if provided
      quantity, // ✅ use provided quantity or default 1
    };

    await createCart({ cartData: cartItem, accessToken });
  };

  const {
    data: cartsData,
    isLoading,
    error,
  } = useGetAllCartQuery(accessToken, {
    skip: !accessToken || typeof accessToken !== "string",
  });

  const cartItems = useMemo(() => {
    if (!Array.isArray(cartsData)) return [];

    return cartsData.flatMap((cart) =>
      cart.items.map((item: CartItem) => ({
        ...item,
        selected: true,
        userId: cart.userId,
      }))
    );
  }, [cartsData]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalItems = cartItems.length;

  return {
    handleAddToCart,
    cartItems,
    totalCount, // total quantity
    totalItems, // total unique items
    isLoading,
    error,
    rawData: cartsData,
  };
};
