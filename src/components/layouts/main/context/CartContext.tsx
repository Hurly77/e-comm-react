import React from "react";
import useSWR from "swr";
import useSession from "../../app/hooks/useSession";
import { getCart, createCartItem, deleteCartItem, updateCartItem } from "@/lib/sdk/methods";
import { CartModel } from "@/lib/sdk/models/CartModel";
import { ProductModel } from "@/lib/sdk/models/ProductModel";

export interface CartContextT {
  cart: CartModel | null;
  isLoading: boolean;
  isUpdating: boolean;
  isEmpty: boolean;
  error: unknown;
  addItem: (productId: number, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  updateItem: (cartItemId: string, quantity: number) => void;
  preProcessCartItem: (product: ProductModel) => void;
  preProcessingItem: ProductModel | null;
  drawerOpenStates: UseStateProps<boolean>;
}

export const CartContext = React.createContext({} as CartContextT);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const [preProcessingItem, setPreProcessingItem] = React.useState<ProductModel | null>(null);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);

  // The Fetcher function should not be used given session?.user is not loaded.
  const fetcher = () => (session?.user ? getCart(session.user.id) : null);
  const { data, isLoading, error, mutate } = useSWR(`cart-${session?.user.id}`, fetcher);

  const isEmpty = !data?.items || data?.items.length === 0;

  async function addItem(productId: number) {
    if (!session?.user) return;
    try {
      setIsUpdating(true);
      const cart = await createCartItem({ productId, userId: session.user.id });
      mutate(cart);
      setIsUpdating(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsUpdating(false);
    }
  }

  async function removeItem(cartItemId: string) {
    if (!session?.user) return;
    try {
      setIsUpdating(true);
      const cart = await deleteCartItem({ userId: session.user.id, cartItemId });
      mutate(cart);
      setIsUpdating(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsUpdating(false);
    }
  }

  async function updateItem(cartItemId: string, quantity: number) {
    if (!session?.user) return;
    try {
      setIsUpdating(true);
      const cart = await updateCartItem({ cartItemId, quantity, userId: session.user.id });
      mutate(cart);
      setIsUpdating(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setIsUpdating(false);
    }
  }

  async function preProcessCartItem(product: ProductModel) {
    setPreProcessingItem(product);
    setIsCartDrawerOpen(true);
  }

  const value: CartContextT = {
    cart: data ?? null,
    error,
    isEmpty,
    isLoading,
    isUpdating,
    addItem,
    removeItem,
    updateItem,
    preProcessCartItem,
    preProcessingItem,
    drawerOpenStates: [isCartDrawerOpen, setIsCartDrawerOpen],
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
