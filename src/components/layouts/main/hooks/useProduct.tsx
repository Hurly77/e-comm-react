import useSWR from "swr";
import { getProductById as method } from "@/lib/sdk/methods";
import React from "react";

export default function useProducts(id: string | undefined) {
  const fetcher = () => (id ? method(id) : null);
  const { data, error, isLoading } = useSWR(`product_${id}`, () => fetcher());

  return {
    product: data,
    isLoading,
    error,
  };
}
