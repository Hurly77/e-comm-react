import useSWR from "swr";
import { getProducts as method, GET_PRODUCTS } from "@/lib/sdk/methods";
import React from "react";

export default function useProducts() {
  const [filters] = React.useState({
    take: 10,
    skip: 0,
  });
  const { data, error, isLoading } = useSWR(GET_PRODUCTS, () => method(filters));

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
