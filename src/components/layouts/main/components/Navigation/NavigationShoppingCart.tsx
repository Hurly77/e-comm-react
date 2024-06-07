import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Badge, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useCart } from "../../hooks/useCart";
import { getNumOfItems } from "../../helpers/cart-helpers";

export default function NavigationShoppingCart() {
  const router = useRouter();
  const { cart } = useCart();

  const cartItemCount = getNumOfItems(cart);

  return (
    <Button
      isIconOnly
      radius="sm"
      variant="light"
      className="text-md hover:text-medium"
      onPress={() => router.push("/cart")}
    >
      <Badge content={cartItemCount || undefined} color="primary">
        <ShoppingCartIcon className="h-6 w-6" />
      </Badge>
    </Button>
  );
}
