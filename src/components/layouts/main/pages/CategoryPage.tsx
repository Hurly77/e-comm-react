import ProductGrid from "../components/Product/ProductGrid";
import { useCategory } from "../hooks/useCategory";
import CategoriesList from "../components/Categories/CategoriesList";
import CategoriesBreadCrumb from "../components/Categories/CategoriesBreadCrumb";
import ProductList from "../components/Product/ProductList";

export default function CategoryPage({ id }: { id: string | number }) {
  const { category, isLoading, error } = useCategory(id);

  console.log({ category, isLoading, error });

  return (
    <div>
      <div className="flex justify-center py-4 items-center flex-col">
        <h1 className="text-2xl my-4">{category?.name}</h1>
        <CategoriesBreadCrumb category={category} />
      </div>
      {category?.children?.length ? (
        <div className="w-full justify-center flex">
          <CategoriesList showMore display="list" categories={category?.children ?? []} />
        </div>
      ) : null}

      <div className="flex flex-col gap-y-4">
        {category?.children &&
          category.children.map((child) => {
            return (
              <div key={child.id} className="flex justify-center">
                <ProductList style="scroll-list" key={child.id} products={child.products ?? []} />
              </div>
            );
          })}
      </div>

      {category && <ProductGrid products={category.products ?? []} />}
    </div>
  );
}
