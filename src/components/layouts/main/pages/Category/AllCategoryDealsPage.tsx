import CategoriesList from "@/layouts/main/components/Categories/CategoriesList";
import ProductList from "@/layouts/main/components/Product/ProductList";
import { useCategoryDeals } from "@/layouts/main/hooks/useCategoryDeals";

export default function AllCategoryDealsPage() {
  const { categories } = useCategoryDeals();

  return (
    <div>
      <h1 className="text-3xl font-medium text-center py-2">Category Deal Page</h1>
      <CategoriesList isDeal showMore categories={categories ?? []} />

      <div className="flex flex-col gap-y-4">
        {categories &&
          categories
            ?.filter((c) => c.products?.length > 4)
            .map((category) => {
              return (
                <div key={category.id} className="py-6">
                  <h1 className="text-2xl font-medium text-center">{category.name}</h1>
                  <ProductList style="scroll-list" key={category.id} products={category.products ?? []} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
