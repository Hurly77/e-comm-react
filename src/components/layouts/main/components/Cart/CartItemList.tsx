import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function CartItemList() {
  const { cart, isEmpty } = useCart();

  return (
    <Card className="grow">
      <CardHeader>
        {!isEmpty && (
          <h2 className="text-xl font-medium inline-flex gap-x-2">
            <ShoppingBagIcon className="h-6 w-6 stroke-primary" />
            Shopping Cart
          </h2>
        )}
      </CardHeader>
      <CardBody>
        {!isEmpty ? (
          cart?.items.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl font-medium">Your Cart is Empty</h1>
            <p className="text-lg text-center">Check out categories and featured items!</p>
            <Button color="primary" radius="sm" className="my-4">
              Go to homepage
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
