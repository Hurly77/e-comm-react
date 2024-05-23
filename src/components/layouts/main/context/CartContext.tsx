import React from "react";

interface CartContextT {}

export const CartContext = React.createContext({} as CartContextT);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const value = {};
  return <CartContext.Provider value={value}></CartContext.Provider>;
}
