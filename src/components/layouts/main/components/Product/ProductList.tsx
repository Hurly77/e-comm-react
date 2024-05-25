import { ProductModel } from "@/lib/sdk/models/ProductModel";
import ProductCard from "./ProductCard";

import React from "react";
import { Slingshot } from "@/components/common/Slingshot/Slingshot";

interface ProductListT {
  style?: "grid" | "scroll-list";
  products: ProductModel[];
}

export default function ProductList(props: ProductListT) {
  const { style, products } = props;

  const variants = {
    grid: "grid grid-cols-4 gap-4 px-4 xl:max-w-screen-2xl max-w-screen",
    "scroll-list": "flex gap-4 px-4 xl:max-w-screen-xl max-w-[95vw] h-fit overflow-x-auto hide-scrollbar",
  };

  return (
    <Slingshot
      isSlingshot
      className={variants[style ?? "grid"]}
      items={products}
      renderItem={(product) => <ProductCard key={product.id} size="sm" product={product} />}
    />
  );
}
