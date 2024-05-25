import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { CategoriesAllList } from "../components/Categories/CategoriesAllList";

export default function AllCategories() {
  return (
    <div>
      <div className="w-full flex flex-col items-center py-6">
        <h1 className="text-3xl font-medium">Shop All Categories</h1>
        <Breadcrumbs size="lg">
          <BreadcrumbItem href="/">E-Shop</BreadcrumbItem>
          <BreadcrumbItem href="/categories/all">All Categories</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <CategoriesAllList />
    </div>
  );
}
