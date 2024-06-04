import useSWR from "swr";
import { getProducts as method, GET_PRODUCTS } from "@/lib/sdk/methods";
import React from "react";

interface ProductFilters {
  search: string;
  take: number;
  skip: number;
  deals: boolean;
}

export default function useProducts(defaults?: Partial<ProductFilters>) {
  const [filters, setFilters] = React.useState<Partial<ProductFilters>>(
    defaults ?? {
      take: 10,
      skip: 0,
    }
  );
  const CacheKey = `${GET_PRODUCTS} ${JSON.stringify(filters)}`;

  const { data, error, isLoading } = useSWR(CacheKey, () => method(filters));

  return {
    products: data?.result,
    productCount: data?.count,
    isLoading,
    isError: error,
    filterStates: [filters, setFilters] as UseStateProps<Partial<ProductFilters>>,
  };
}
