import type { ReactElement } from "react";

import MainLayout from "@/components/layouts/main";

import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import CategoryPage from "@/layouts/main/pages/Category/CategoryPage";

export const Category: NextPageWithLayout = () => {
  const router = useRouter();

  const categoryId = router.query.id;
  return <CategoryPage id={categoryId?.toString() ?? ""} />;
};

Category.title = "Category: ";
Category.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Category;
