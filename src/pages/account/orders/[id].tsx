import type { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import SingleOrderPage from "@/layouts/main/pages/SingleOrderPage";
import MainLayout from "@/components/layouts/main";

export const OrderItem: NextPageWithLayout = () => {
  const router = useRouter();

  const OrderItemId = router.query.id ? Number(router.query.id) : undefined;
  return <SingleOrderPage id={OrderItemId} />;
};

OrderItem.title = "Account: Order Details";
OrderItem.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default OrderItem;
