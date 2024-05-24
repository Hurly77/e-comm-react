import React from "react";
import { CartContext } from "../context/CartContext";

export function useCart() {
  const ctx = React.useContext(CartContext);
  return ctx;
}
