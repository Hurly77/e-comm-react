import { InventoryContext } from "../context/InventoryContext";
import React from "react";

export default function useInventory() {
  const ctx = React.useContext(InventoryContext);

  return ctx;
}
