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
          <div key={item.id} className="flex flex-col gap-2 sm:gap-6 items-start">
            <Image
              radius="sm"
              className="self-center"
              src={item.product.thumbnailUrl}
              alt={item.product.title}
              width={125}
              height={125}
            />

            <div className="w-full grow space-y-2 justify-between flex flex-col py-2">
              <div className="flex flex-col sm:flex-row-reverse justify-between items-start w-full text-lg">
                <span className="font-medium">{toUSD(item?.price)}</span>
                <p className="font-medium line-clamp-2 sm:line-clamp-none">{item.product.title}</p>
              </div>

              <p className="text-foreground-400 text max-w-4xl text-ellipsis line-clamp-2 hidden sm:block">
                Return or Replace Items: Eligible through {formatDate(returnDate?.toISOString())}
              </p>

              <div className="flex justify-between flex-col sm:flex-row">
                <div className="">
                  <span className="text-foreground-400">Quantity:&nbsp;</span>
                  {item.quantity}
                </div>
                <div className="flex gap-x-2 sm:text-medium text-small font-medium whitespace-nowrap">
                  <Link
                    underline="hover"
                    className="cursor-pointer text-sm sm:text-medium"
                    href={`/products/${item.product.id}`}
                  >
                    <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 " />
                    &nbsp; View product
                  </Link>
                  <span className="text-primary">|</span>
                  <Link
                    underline="hover"
                    className="cursor-pointer text-sm sm:text-medium"
                    onClick={() => onBuyAgain(item)}
                  >
                    <ArrowPathIcon className="h-5 w-5 sm:h-6 sm:w-6 " />
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
