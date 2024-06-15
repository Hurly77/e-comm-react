/* eslint-disable @next/next/no-html-link-for-pages */
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { CategoriesAllList } from "@/layouts/main/components/Categories/CategoriesAllList";
import { default as NextLink } from "next/link";

export default function AllCategories() {
  return (
    <div>
      <div className="w-full flex flex-col items-center py-6">
        <h1 className="text-3xl font-medium">Shop All Categories</h1>
        <Breadcrumbs size="lg">
          <BreadcrumbItem href="/">E-Shop</BreadcrumbItem>
          <BreadcrumbItem as={NextLink} href="/categories/all">
            All Categories
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <CategoriesAllList />
    </div>
  );
}
