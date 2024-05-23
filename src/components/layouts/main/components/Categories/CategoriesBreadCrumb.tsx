import { CategoryModel } from "@/lib/sdk/models/CategoryModel";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function CategoriesBreadCrumb({ category }: { category?: CategoryModel }) {
  const getCrumbs = (category: CategoryModel) => {
    const crumbs = [];
    let current: CategoryModel | null = category;
    while (current) {
      crumbs.push(current);
      current = current.parent;
    }
    return crumbs.reverse();
  };

  if (!category) return null;

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Main</BreadcrumbItem>
      {getCrumbs(category).map((category) => (
        <BreadcrumbItem key={category.id} href={`/categories/${category.id}`}>
          {category.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
