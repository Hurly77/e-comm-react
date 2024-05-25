import useSWR from "swr";
import { getProducts as method, GET_PRODUCTS, createProduct, deleteProduct } from "@/lib/sdk/methods";

import React from "react";
import { ProductModel } from "@/lib/sdk/models/ProductModel";

type InventoryContextT = {
  delete(product: ProductModel): Promise<{
    data: unknown;
    error: unknown;
  }>;
  edit(): void;
  add(formData: FormData): Promise<ReturnType<typeof createProduct>>;

  inventory: ProductModel[] | undefined;
  isLoading: boolean;
  error: unknown;
};

export const InventoryContext = React.createContext<InventoryContextT>({} as InventoryContextT);

export function InventoryContentProvider({ children }: { children: React.ReactNode }) {
  const { data: inventoryData, error, isLoading: isLoadingInventory, mutate } = useSWR(GET_PRODUCTS, () => method());

  async function removeInventoryItem(product: ProductModel) {
    let response: Awaited<ReturnType<typeof deleteProduct>>;
    try {
      response = await deleteProduct(product.id);
      const updatedInventory = inventoryData?.filter((item) => item.id !== product.id);
      await mutate(updatedInventory, false);
      return response;
    } catch (error) {
      return { error, data: undefined };
    }
  }
  async function editInventoryItem() {}
  async function createInventoryItem(formData: FormData): Promise<ReturnType<typeof createProduct>> {
    let response: Awaited<ReturnType<typeof createProduct>>;
    try {
      response = await createProduct(formData);
      if (response.data) await mutate([...(inventoryData ?? []), response.data]);
      return response;
    } catch (error) {
      return { error, data: undefined };
    }
  }

  const value: InventoryContextT = {
    add: createInventoryItem,
    delete: removeInventoryItem,
    edit: editInventoryItem,
    inventory: inventoryData,
    isLoading: isLoadingInventory,
    error,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
