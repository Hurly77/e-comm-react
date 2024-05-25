import useCategories from "../../hooks/useCategories";
import CategoriesList from "./CategoriesList";

export function CategoriesAllList() {
  const { categories } = useCategories();

  return (
    <div>
      <div className="space-y-4">
        {categories
          ?.sort((a, b) => b.children.length - a.children.length)
          ?.map((category) => {
            return (
              <div key={category.id} className="max-w-screen-2xl flex flex-col items-center">
                <h2 className="text- text-xl">{category.name}</h2>
                <CategoriesList limit={category.children.length} display="slingShot" categories={category.children} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
