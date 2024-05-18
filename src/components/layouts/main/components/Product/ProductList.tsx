import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, isLoading, isError } = useProducts();
  return (
    <div className="grid grid-cols-4 gap-4 px-4 max-w-screen-2xl">
      {products && products.slice(0, 20).map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
