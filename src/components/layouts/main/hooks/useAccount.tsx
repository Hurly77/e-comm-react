import { getAccountInfo } from "@/lib/sdk/fetchers/account-info-fetcher";
import useSWR from "swr";
import useSession from "../../app/hooks/useSession";

export function useAccount() {
  const { session } = useSession();
  const user = session?.user;
  const CACHE_KEY = `ACCOUNT_INFO_${user?.id}`;
  const { data, isLoading, error, mutate } = useSWR(CACHE_KEY, () => getAccountInfo(user?.id));

  return { data, isLoading, error, mutate };
}
