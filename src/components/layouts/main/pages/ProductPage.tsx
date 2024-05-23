import { Accordion, AccordionItem, Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ProductImageCollage } from "../components/Product/ProductImageCollage";
import useProduct from "../hooks/useProduct";
import CategoriesBreadCrumb from "../components/Categories/CategoriesBreadCrumb";
import { toUSD } from "../helpers/number";
import React from "react";
import ProductList from "../components/Product/ProductList";

export default function ProductPage({ id }: { id: string | undefined }) {
  const { product, isLoading, error } = useProduct(id);
  const { title, price, regularPrice, category, purchaseLimit } = product || {};

  const selectOptions = React.useMemo(
    () => Array.from(Array(purchaseLimit || 5), (_, i) => ({ key: `item-${i}`, value: (i + 1).toString() })),
    [purchaseLimit]
  );

  if (!product) return <Spinner />;

  return (
    <div className="w-full p-2flex items-center gap-y-4 flex-col max-w-screen-xl relative pb-10">
      <div className="w-full py-4">
        <CategoriesBreadCrumb size="md" category={category} />
      </div>
      <div className="flex w-full gap-x-2">
        <div className="w-1/2">
          <ProductImageCollage product={product} />
        </div>
        <div className="w-1/2 p-4 sticky top-24 h-fit">
          <div>
            <h1 className="text-2xl font-medium">{title}</h1>
            {regularPrice ? <div>{toUSD(regularPrice ?? 0)}</div> : null}
            <div className="font-medium text-lg">{toUSD(price ?? 0)}</div>
          </div>
          <div className="flex gap-x-2 max-w-sm sticky top-0">
            <Select
              className="w-24"
              variant="bordered"
              size="lg"
              radius="sm"
              defaultSelectedKeys={["item-0"]}
              items={selectOptions}
            >
              {(item) => (
                <SelectItem key={item.key} value={item.value}>
                  {item.value}
                </SelectItem>
              )}
            </Select>
            <Button color="primary" radius="sm" size="lg" className="grow">
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
