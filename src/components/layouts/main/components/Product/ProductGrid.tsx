import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { useProductByCategory } from "../../hooks/useProductsByCategory";
import ProductCard from "./ProductCard";

export default function CategoryGrid({ products }: { products: ProductModel[] }) {
  // const { products } = useProductByCategory(categoryId);
  return (
    <div className="grid grid-cols-4 gap-4 max-w-screen-2xl">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
