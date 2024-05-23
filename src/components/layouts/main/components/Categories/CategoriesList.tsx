import { Button, Image, Link } from "@nextui-org/react";
import useCategories from "../../hooks/useCategories";
import CategoryBubble from "./CategoryBubble";
import { CategoryModel } from "@/lib/sdk/models/CategoryModel";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import React from "react";

interface CategoriesListT {
  categories: CategoryModel[];
  display?: "grid" | "list";
  showMore?: boolean;
  limit?: number;
}

export default function CategoriesList({ categories, display, showMore, limit }: CategoriesListT) {
  const [showingAll, setShowingAll] = React.useState(false);

  const gridStyle = "grid lg:grid-cols-6 grid-cols-3";
  const listStyle = "flex flex-wrap max-w-screen-xl justify-center gap-4";

  const variants = {
    grid: gridStyle,
    list: listStyle,
  };

  const categoriesList = showMore && !showingAll ? categories.slice(0, limit ?? 6) : categories;

  return (
    <div className="flex flex-col items-center pb-6">
      <div className={cls(variants[display ?? "grid"], "w-fit gap-2 gap-y-4 py-4")}>
        {categoriesList?.map((category) => {
          return <CategoryBubble key={category.id} category={category} />;
        })}
      </div>

      {showMore && categories.length > (limit ?? 6) && (
        <Button onClick={() => setShowingAll(!showingAll)} radius="sm" variant="bordered">
          {!showingAll ? `Show ${categories.length - (limit ?? 6)} More` : "Show Less"}
        </Button>
      )}
    </div>
  );
}
