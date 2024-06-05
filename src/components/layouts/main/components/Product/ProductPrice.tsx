import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { toUSD } from "../../helpers/number";

interface ProductPriceT {
  price: number;
  regularPrice: number;
}

export default function ProductPrice(props: ProductPriceT) {
  const { price, regularPrice } = props;
  const isDeal = regularPrice > 0;

  return (
    <div className="flex flex-col items-start w-full pt-2">
      {<span className={cls("font-bold", isDeal ? "text-danger" : "")}>{toUSD(price)}</span>}
      {isDeal && (
        <div className="text-sm">
          <span className="text-sm">reg</span>
          <span className={cls("w-full font-medium pt-1 pl-1", isDeal ? "pl-2 line-through text-foreground-400" : "")}>
            {toUSD(regularPrice)} {}
          </span>
          <span className="text-sm text-danger font-medium">Sale</span>
        </div>
      )}
    </div>
  );
}
