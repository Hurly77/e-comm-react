import useCategories from "../../hooks/useCategories";
import CategoryBubble from "./CategoryBubble";

export function CategoriesAllList() {
  const { categories } = useCategories();

  return (
    <div>
      <h1>All Categories</h1>
      <div className="space-y-4">
        {categories
          ?.sort((a, b) => b.children.length - a.children.length)
          ?.map((category) => {
            return (
              <div key={category.id} className="max-w-screen-2xl flex flex-col items-center">
                <h2 className="text- text-xl">{category.name}</h2>
                <div className="relative w-fit flex gap-x-4 snap-x snap-mandatory px-2 py-4 overflow-x-auto  max-w-xs xl:max-w-screen-2xl">
                  {category.children.map((child) => (
                    <CategoryBubble key={child.id} category={child} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
