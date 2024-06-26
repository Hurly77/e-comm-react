import useSWR from "swr";
import { getCategories } from "@/sdk/methods";

export default function useCategories() {
  const { data, error } = useSWR("categories", getCategories);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}
