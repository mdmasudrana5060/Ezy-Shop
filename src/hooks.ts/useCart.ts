// hooks/useCart.ts
import { useCreateCartMutation } from "@/redux/api/cartApi";

export const useCart = () => {
  const [createCart] = useCreateCartMutation();

  const addToCart = async (
    product: any,
    selectedPrice?: number,
    quantity: number = 1
  ) => {
    const cartData = {
      id: product.id,
      name: product.title,
      price: selectedPrice ?? product.price,
      quantity,
    };

    try {
      const res = await createCart(cartData).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return { addToCart };
};
