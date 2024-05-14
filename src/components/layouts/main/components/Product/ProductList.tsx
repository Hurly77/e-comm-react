import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, isLoading, isError } = useProducts();
  return (
    <div className="grid grid-cols-2 gap-1">
      {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
