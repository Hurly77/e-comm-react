import { getCategoryById } from "@/lib/sdk/methods";
import useSWR from "swr";

export function useCategory(id: string | number) {
  const fetcher = (id: string | number) => (id ? getCategoryById(id) : undefined);
  const { data, error, isLoading } = useSWR(`category-${id}`, () => fetcher(id));

  return {
    category: data,
    isLoading,
    error,
  };
}
