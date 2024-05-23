import { Button, Spinner } from "@nextui-org/react";
import { ProductImageCollage } from "../components/Product/ProductImageCollage";
import useProduct from "../hooks/useProduct";
import CategoriesBreadCrumb from "../components/Categories/CategoriesBreadCrumb";

export default function ProductPage({ id }: { id: string | undefined }) {
  const { product, isLoading, error } = useProduct(id);

  if (!product) return <Spinner />;

  return (
    <div className="flex flex-row-reverse max-w-screen-2xl border w-full p-2">
      <div className="w-full border">
        <h1>Product Page</h1>
        <div>{product?.title}</div>
        <div>{product.price}</div>
        <div>{product.regularPrice}</div>
        <Button color="primary" radius="sm" size="lg">
          Add to Cart
        </Button>
      </div>
      <div>
        <CategoriesBreadCrumb category={product.category} />
        <ProductImageCollage product={product} />
      </div>
    </div>
  );
}
