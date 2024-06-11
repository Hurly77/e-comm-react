import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import CategoryPage from "@/components/layouts/main/pages/CategoryPage";

export const CategoryDeal: NextPageWithLayout = () => {
  const router = useRouter();

  const categoryId = router.query.id;
  return <CategoryPage id={categoryId?.toString() ?? ""} />;
};

CategoryDeal.title = "Category Deal: ";
CategoryDeal.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CategoryDeal;
