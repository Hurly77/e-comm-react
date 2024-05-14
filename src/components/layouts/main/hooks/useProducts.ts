import useSWR from "swr";
import { getProducts as method, GET_PRODUCTS } from "@/lib/sdk/methods";

export default function useProducts() {
  const { data, error, isLoading } = useSWR(GET_PRODUCTS, method);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}
