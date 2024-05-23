import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { Image } from "@nextui-org/react";
import React from "react";

export function ProductImageCollage({ product }: { product: ProductModel }) {
  return (
    <div className="grid grid-cols-2">
      {product.images.map((image, idx) => (
        <div key={image.s3_key} className={cls("border", idx == 0 ? "col-span-2" : "")}>
          <Image src={image.url} key={image.s3_key} height={500} width={500} alt="" />
        </div>
      ))}
    </div>
  );
}
