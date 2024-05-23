import { getProductsByCategory as method } from "@/lib/sdk/methods";
import useSWR from "swr";

export function useProductByCategory(categoryId: string | undefined) {
  const fetcher = async (categoryId: string | undefined) => (categoryId ? method(categoryId) : null);
  const { data, error, isLoading } = useSWR(`products-by-category-${categoryId}`, () => fetcher(categoryId));

  console.log("data", data);

  return {
    products: data,
    isLoading,
    error,
  };
}
