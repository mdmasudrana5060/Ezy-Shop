import {
  useCreateCartMutation,
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "@/redux/api/cartApi";
import { useAppSelector } from "@/redux/hook";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
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
  const [deleteCart] = useDeleteCartMutation();
  const router = useRouter();

  const handleAddToCart = async (
    product: Product,
    selectedPrice?: number,
    quantity: number = 1
  ) => {
    if (!accessToken) {
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    const cartItem = {
      productId: product.id,
      productName: product.title,
      price: selectedPrice ?? product.price,
      quantity,
    };

    await createCart({ cartData: cartItem, accessToken });
  };

  const {
    data: cartsData,
    isLoading,
    error,
  } = useGetAllCartQuery(accessToken as string, {
    skip: !accessToken || typeof accessToken !== "string",
  });

  const handleDeleteFromCart = async (cartId: string) => {
    if (!accessToken) return;
    const Id = cartsData?._id;
    try {
      await deleteCart({ cartId, accessToken, Id }).unwrap();
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  // ✅ FIXED — cartsData is now a SINGLE OBJECT
  const cartItems = useMemo(() => {
    if (!cartsData || !cartsData.items) return [];

    return cartsData.items.map((item: CartItem) => ({
      ...item,
      selected: true,
      userId: cartsData.userId,
    }));
  }, [cartsData]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalItems = cartItems.length;

  return {
    handleAddToCart,
    handleDeleteFromCart,
    cartItems,
    totalCount,
    totalItems,
    isLoading,
    error,
    rawData: cartsData,
  };
};
