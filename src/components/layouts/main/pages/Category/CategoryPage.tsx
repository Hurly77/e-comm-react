import ProductGrid from "@/layouts/main/components/Product/ProductGrid";
import { useCategory } from "@/layouts/main/hooks/useCategory";
import CategoriesList from "@/layouts/main/components/Categories/CategoriesList";
import CategoriesBreadCrumb from "@/layouts/main/components/Categories/CategoriesBreadCrumb";
import ProductList from "@/layouts/main/components/Product/ProductList";
import Head from "next/head";

export default function CategoryPage({ id }: { id: string | number }) {
  const { category } = useCategory(id);

  return (
    <>
      <Head>
        <title>Category: {category?.name ?? "Loading"}</title>
      </Head>
      <div>
        <div className="flex justify-center py-4 items-center flex-col">
          <h1 className="text-2xl my-4">{category?.name}</h1>
          {category && <CategoriesBreadCrumb category={category} />}
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
    </>
  );
}
