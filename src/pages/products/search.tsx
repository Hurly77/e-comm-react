import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";

export const ProductSearch: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;

  return <></>;
};

ProductSearch.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductSearch;
