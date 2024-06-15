import { getProductsByCategory as method } from "@/sdk/methods";
import useSWR from "swr";

export function useProductByCategory(categoryId: string | undefined) {
  const fetcher = async (categoryId: string | undefined) => (categoryId ? method(categoryId) : null);
  const { data, error, isLoading } = useSWR(`products-by-category-${categoryId}`, () => fetcher(categoryId));

  return {
    products: data,
    isLoading,
    error,
  };
}
