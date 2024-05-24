import React from "react";
import useSWR from "swr";
import useSession from "../../app/hooks/useSession";
import { getCart, createCartItem, deleteCartItem, updateCartItem } from "@/lib/sdk/methods";
import { CartModel } from "@/lib/sdk/models/CartModel";

export interface CartContextT {
  cart: CartModel | null;
  isLoading: boolean;
  error: unknown;
  addItem: (productId: number, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  updateItem: (cartItemId: string, quantity: number) => void;
}

export const CartContext = React.createContext({} as CartContextT);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const fetcher = () => (session?.user ? getCart(session.user.id) : null);
  const { data, isLoading, error, mutate } = useSWR(`cart-${session?.user.id}`, fetcher);

  async function addItem(productId: number) {
    if (!session?.user) return;
    const cart = await createCartItem({ productId, userId: session.user.id });
    mutate(cart);
  }

  async function removeItem(cartItemId: string) {
    if (!session?.user) return;
    const cart = await deleteCartItem({ userId: session.user.id, cartItemId });
    mutate(cart);
  }

  async function updateItem(cartItemId: string, quantity: number) {
    if (!session?.user) return;
    const cart = await updateCartItem({ cartItemId, quantity, userId: session.user.id });
    mutate(cart);
  }

  const value: CartContextT = {
    cart: data ?? null,
    isLoading,
    error,
    addItem,
    removeItem,
    updateItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
