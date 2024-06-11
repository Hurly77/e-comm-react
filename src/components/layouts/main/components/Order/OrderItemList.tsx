import { OrderItemModel } from "@/lib/sdk/models/OrderItemModel";
import { Link, Image, Divider } from "@nextui-org/react";
import { toUSD } from "../../helpers/number";
import { ArrowPathIcon, EyeIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../helpers/date";
import { useCart } from "../../hooks/useCart";

export default function OrderItemList({ items }: { items: OrderItemModel[] }) {
  const returnDate = new Date(new Date().setDate(new Date().getDate() + 7));
  const { preProcessCartItem } = useCart();

  function onBuyAgain(item: OrderItemModel) {
    preProcessCartItem(item.product);
  }

  return (
    <div className="space-y-6 w-full">
      {items.map((item, idx) => (
        <>
          <div key={item.id} className="flex gap-6 items-start">
            <Image
              radius="sm"
              className="min-w-[110px]"
              src={item.product.thumbnailUrl}
              alt={item.product.title}
              width={110}
              height={110}
            />

            <div className="w-full grow space-y-2 justify-between flex flex-col py-2">
              <div className="flex justify-between items-start w-full text-lg">
                <p className="font-medium">{item.product.title}</p>
                <span className="font-medium">{toUSD(item?.price)}</span>
              </div>

              <p className="text-foreground-400 text max-w-4xl text-ellipsis line-clamp-2">
                Return or Replace Items: Eligible through {formatDate(returnDate?.toISOString())}
              </p>

              <div className="flex justify-between">
                <div className="">
                  <span className="text-foreground-400">Quantity:&nbsp;</span>
                  {item.quantity}
                </div>
                <div className="flex gap-x-2 font-medium">
                  <Link underline="hover" href={`/products/${item.product.id}`}>
                    <EyeIcon className="h-6 w-6" />
                    &nbsp; View product
                  </Link>
                  <span className="text-primary">|</span>
                  <Link underline="hover" className="cursor-pointer" onClick={() => onBuyAgain(item)}>
                    <ArrowPathIcon className="h-5 w-5" />
                    &nbsp; Buy it again
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {idx + 1 < items.length && <Divider />}
        </>
      ))}
    </div>
  );
}
