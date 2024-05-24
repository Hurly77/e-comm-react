import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function CartItemList() {
  const { cart } = useCart();
  return (
    <div>
      <Card className="grow">
        <CardHeader>
          <h2 className="text-xl font-medium inline-flex gap-x-2">
            <ShoppingBagIcon className="h-6 w-6 stroke-primary" />
            Shopping Cart
          </h2>
        </CardHeader>
        <CardBody>
          {cart?.items.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
