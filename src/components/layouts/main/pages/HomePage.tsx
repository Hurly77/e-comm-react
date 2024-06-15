import Link from "next/link";
import CategoriesList from "@/layouts/main/components/Categories/CategoriesList";
import ProductList from "@/layouts/main/components/Product/ProductList";
import useCategories from "@/layouts/main/hooks/useCategories";
import useProducts from "@/layouts/main/hooks/useProducts";

import ProductSkeletonList from "@/layouts/main/components/Product/ProductSkeletonList";
import ProductSkeletonBubbles from "@/layouts/main/components/Product/ProductSkeletonBubbles";

export default function HomePage() {
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { products, isLoading } = useProducts();

  return (
    <div className="page items-center flex-col">
      <Link href="/categories/all">All Categories</Link>
      {!isLoadingCategories ? <CategoriesList categories={categories ?? []} /> : <ProductSkeletonBubbles size={12} />}
      {!isLoading ? <ProductList products={products ?? []} style="scroll-list" /> : <ProductSkeletonList size={5} />}
    </div>
  );
}
