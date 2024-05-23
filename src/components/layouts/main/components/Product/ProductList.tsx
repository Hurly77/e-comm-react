import { ProductModel } from "@/lib/sdk/models/ProductModel";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ProductListT {
  style?: "grid" | "scroll-list";
  products: ProductModel[];
}

export default function ProductList(props: ProductListT) {
  const { style, products } = props;
  const listRef = React.useRef<HTMLDivElement>(null);

  const [scrollIndex, setScrollIndex] = React.useState(0);

  const scrollItem = React.useCallback((xAmount: number) => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: xAmount, behavior: "smooth" });
    }
  }, []);

  const variants = {
    grid: "grid grid-cols-4 gap-4 px-4 xl:max-w-screen-2xl max-w-screen",
    "scroll-list": "flex gap-4 px-4 xl:max-w-screen-xl max-w-[95vw] h-fit overflow-x-auto",
  };

  return (
    <div className="relative">
      <div ref={listRef} className={cls("py-2 relative hide-scrollbar", variants[style ?? "grid"])}>
        {products &&
          products.slice(0, 20).map((product) => <ProductCard size="sm" key={product.id} product={product} />)}
      </div>
      {products?.length >= 7 && (
        <>
          <ChevronLeftIcon
            onClick={() => scrollItem(-1150)}
            className="absolute z-10 top-1/2 -left-2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md p-1 cursor-pointer"
          />
          <ChevronRightIcon
            onClick={() => scrollItem(1150)}
            className="absolute z-10 top-1/2 -right-2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md p-1 cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
