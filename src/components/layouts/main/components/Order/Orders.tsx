import { Spinner } from "@nextui-org/react";
import useSession from "@/app/hooks/useSession";
import { useUserOrders } from "../../hooks/useUserOrders";
import OrderList from "./OrderList";

export default function Orders() {
  const { session } = useSession();
  const { data, isLoading } = useUserOrders(session?.user?.id);

  return (
    <div className="py-4 w-full justify-center flex">
      {isLoading ? <Spinner /> : data ? <OrderList orders={data} /> : "No orders"}
    </div>
  );
}
