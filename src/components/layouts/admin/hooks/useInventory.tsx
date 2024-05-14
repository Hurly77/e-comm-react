import useSWR from "swr";
import { getProducts as method, GET_PRODUCTS } from "@/lib/sdk/methods";

export default function useInventory() {
  const { data, error, isLoading } = useSWR(GET_PRODUCTS, method);

  return {
    inventory: data,
    isLoading: !error && !data,
    isError: error,
  };
}
