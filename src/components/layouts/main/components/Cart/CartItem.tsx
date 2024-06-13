import { CartItemModel } from "@/lib/sdk/models/CartItemModel";
import { Button, Image } from "@nextui-org/react";
import { toUSD } from "../../helpers/number";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { QuantitySelect } from "@/components/common/Select/QuantitySelect";
import { useCart } from "../../hooks/useCart";

export default function CartItem({ cartItem }: { cartItem: CartItemModel }) {
  const { removeItem, updateItem } = useCart();
  const { product, quantity } = cartItem;
  const { title, price, thumbnailUrl, purchaseLimit } = product;

  return (
    <div className="flex justify-between first:border-t gap-4 border-b py-4 relative">
      <Image height={80} width={80} src={thumbnailUrl} alt="" />
      <div className="grow">
        <div>
          <div>{title}</div>
          <div className="flex gap-x-2 pt-2">
            <QuantitySelect
              defaultValue={cartItem.quantity}
              onChange={(quantity) => {
                updateItem(cartItem.id, quantity);
              }}
              size="sm"
              purchaseLimit={purchaseLimit || 6}
            />
            <Button variant="bordered" radius="sm" size="sm">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
      <div className="min-w-40">
        <span className="text-lg block font-medium">{toUSD(price * quantity)}</span>
        {quantity > 1 && <span className="text-sm text-foreground-400">{toUSD(price)} each</span>}
      </div>
      <XMarkIcon
        onClick={() => removeItem(cartItem.id)}
        className="cursor-pointer h-7 w-7 absolute top-1 z-10 right-3"
      />
    </div>
  );
}
