import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import ProductPage from "@/layouts/main/pages/ProductPage";

export const Product: NextPageWithLayout = () => {
  const router = useRouter();

  const productId = router.query.id;
  return <ProductPage id={productId?.toString()} />;
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
