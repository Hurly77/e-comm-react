import { getCategoryDeals } from "@/lib/sdk/methods";
import useSWR from "swr";

export function useCategoryDeals() {
  const { data, isLoading, error } = useSWR("category_deals", getCategoryDeals);

  return {
    categories: data ?? [],
    isLoading,
    error,
  };
}
