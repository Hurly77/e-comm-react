import Link from "next/link";
import CategoriesList from "../components/Categories/CategoriesList";
import ProductList from "../components/Product/ProductList";
import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";

import SkeletonList from "../components/Product/SkeletonList";
import SkeletonBubbles from "../components/Product/SkeletonBubbles";

export default function HomePage() {
  const { categories } = useCategories();
  const { products } = useProducts();

  return (
    <div className="page items-center flex-col">
      <Link href="/categories/all">All Categories</Link>
      {categories ? <CategoriesList categories={categories ?? []} /> : <SkeletonBubbles size={12} />}
      {categories ? <ProductList products={products ?? []} style="scroll-list" /> : <SkeletonList size={5} />}
    </div>
  );
}
