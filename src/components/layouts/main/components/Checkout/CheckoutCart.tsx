import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";

export default function CheckoutCart() {
  const { cart } = useCart();

  if (!cart) return null;
  const fakeArriveDate = Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));

  return (
    <Card className="px-4">
      <CardHeader className="flex gap-x-4 px-0">
        <ShoppingCartIcon className="h-8 w-8 mr-2 stroke-primary" />
        <span>Cart</span>
      </CardHeader>
      <Divider />
      <CardBody>
        {cart?.items.map((item) => {
          const { product } = item;
          return (
            <div key={item.id}>
              <h4 className="text-success-600">Arrives by {fakeArriveDate}</h4>
              <div className="pl-4 py-4">
                <Image radius="sm" height={50} width={50} src={product.thumbnailUrl} alt="" />
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
