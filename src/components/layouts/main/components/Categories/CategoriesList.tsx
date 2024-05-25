import { Button } from "@nextui-org/react";
import CategoryBubble from "./CategoryBubble";
import { CategoryModel } from "@/lib/sdk/models/CategoryModel";
import React from "react";
import { Slingshot } from "@/components/common/Slingshot/Slingshot";

interface CategoriesListT {
  categories: CategoryModel[];
  display?: "grid" | "list" | "slingShot";
  showMore?: boolean;
  limit?: number;
  isDeal?: boolean;
}

export default function CategoriesList({ categories, display, showMore, limit, isDeal }: CategoriesListT) {
  const [showingAll, setShowingAll] = React.useState(false);
  const [isSlingShot, setIsSlingShot] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  const gridStyle = "grid lg:grid-cols-6 grid-cols-3";
  const listStyle = "flex flex-wrap max-w-screen-xl justify-center gap-4";
  const slingShot = "flex gap-4 px-4 xl:max-w-screen-xl max-w-[95vw] h-fit overflow-x-auto hide-scrollbar";

  const variants = {
    grid: gridStyle,
    list: listStyle,
    slingShot: slingShot,
  };

  const categoriesList = showMore && !showingAll ? categories.slice(0, limit ?? 6) : categories;

  React.useEffect(() => {
    const scrollWidth = listRef.current?.scrollWidth;
    const clientWidth = listRef.current?.clientWidth;
    // if scrollWidth isn't equal to clientWidth, then it's scrollable
    const isScrollable = !(scrollWidth === clientWidth);
    const isSlingShotDisplay = display === "slingShot" && isScrollable;

    if (isSlingShot !== isSlingShotDisplay) setIsSlingShot(isSlingShotDisplay);
  }, [display, isSlingShot]);

  return (
    <Slingshot
      className={variants[display ?? "grid"]}
      isSlingshot={display === "slingShot"}
      items={categoriesList}
      renderItem={(category) => <CategoryBubble key={category.id} isDeal={isDeal} category={category} />}
    >
      {showMore && categories.length > (limit ?? 6) && (
        <Button onClick={() => setShowingAll(!showingAll)} radius="sm" variant="bordered">
          {!showingAll ? `Show ${categories.length - (limit ?? 6)} More` : "Show Less"}
        </Button>
      )}
    </Slingshot>
  );
}
