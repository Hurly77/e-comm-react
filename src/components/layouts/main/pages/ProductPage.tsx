import { Accordion, AccordionItem, Button, Spinner } from "@nextui-org/react";
import { ProductImageCollage } from "../components/Product/ProductImageCollage";
import useProduct from "../hooks/useProduct";
import CategoriesBreadCrumb from "../components/Categories/CategoriesBreadCrumb";
import React from "react";
import ProductList from "../components/Product/ProductList";
import { QuantitySelect } from "@/components/common/Select/QuantitySelect";
import ProductPrice from "../components/Product/ProductPrice";
import { useCart } from "../hooks/useCart";

export default function ProductPage({ id }: { id: string | undefined }) {
  const { product } = useProduct(id);
  const { preProcessCartItem } = useCart();
  const { title, price, regularPrice, category, purchaseLimit } = product || {};

  if (!product || !category) return <Spinner />;

  return (
    <div className="w-full p-2flex items-center gap-y-4 flex-col max-w-screen-xl relative pb-10">
      <div className="w-full py-4">
        <CategoriesBreadCrumb size="md" category={category} />
      </div>
      <div className="flex w-full gap-x-2">
        <div className="w-1/2">
          <ProductImageCollage product={product} />
        </div>
        <div className="w-1/2 p-4 sticky top-24 h-fit space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">{title}</h1>
            <ProductPrice price={price ?? 0} regularPrice={regularPrice ?? 0} />
          </div>
          <div className="flex gap-x-2 max-w-sm sticky top-0">
            <QuantitySelect purchaseLimit={purchaseLimit ?? 6} />
            <Button onPress={() => preProcessCartItem(product)} color="primary" radius="sm" size="lg" className="grow">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="border w-full p-4 flex justify-center">
        <Accordion>
          <AccordionItem aria-label="Details" subtitle="Highlights & Details" title="Details">
            <div className="grid grid-cols-2 gap-x-10">
              <div>
                <h3 className="text-lg font-medium pb-4">Highlights</h3>
                <ul className="list-disc pl-6">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium pb-4">Description</h3>
                {product.description}
              </div>
            </div>
          </AccordionItem>
          <AccordionItem aria-label="Specs" subtitle="Specifications" title="Specs">
            <ul className="block list-disc">
              <li className="block py-4 space-x-4">
                <span className="font-medium text-foreground-500 capitalize">SKU:</span>
                <span>{product.SKU}</span>
              </li>
              {Object.entries(product.specs).map(([k, v]) => {
                return (
                  <li key={k} className="block border-t py-4 space-x-4">
                    <span className="font-medium text-foreground-500 capitalize">
                      {k?.split("_").join(" ")?.trim() || "Other"}:{" "}
                    </span>
                    <span>{v.trim()}</span>
                  </li>
                );
              })}
            </ul>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="py-6">
        <h3 className="pl-4 text-xl py-2">Similar Products</h3>
        <ProductList style="scroll-list" products={product.category.products} />
      </div>
    </div>
  );
}
