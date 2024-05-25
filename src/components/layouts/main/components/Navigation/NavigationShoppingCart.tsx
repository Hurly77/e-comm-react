import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function NavigationShoppingCart() {
  const router = useRouter();
  return (
    <Button isIconOnly radius="sm" className="text-md hover:text-medium" variant="light">
      <ShoppingCartIcon
        onClick={() => {
          router.push("/cart");
        }}
        className="h-6 w-6"
      />
    </Button>
  );
}
