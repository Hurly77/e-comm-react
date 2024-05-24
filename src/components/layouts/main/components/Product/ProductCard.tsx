import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from "@nextui-org/react";
import { toUSD } from "../../helpers/number";
import useSession from "@/components/layouts/app/hooks/useSession";
import { createCartItem } from "@/lib/sdk/methods";
import React from "react";

interface ProductCardT {
  size?: "sm" | "md" | "lg";
  product: ProductModel;
}

export default function ProductCard({ product, size }: ProductCardT) {
  const [favorite, setFavorite] = React.useState<boolean>(false);
  const { session } = useSession();
  const { title, thumbnailUrl, price, regularPrice } = product;
  const isDeal = product.regularPrice > 0;

  const user = session?.user;

  return (
    <Card
      shadow="sm"
      radius="sm"
      className={cls(size == "sm" ? "w-fit min-w-32 xl:min-w-44" : "grow")}
      classNames={{
        base: "px-0",
        header: "p-2",
      }}
    >
      <CardHeader className="flex flex-col">
        <div className="flex justify-center  w-full">
          <Image
            radius="sm"
            width={size === "sm" ? 190 : 308}
            height={size === "sm" ? 180 : 308}
            src={thumbnailUrl ?? ""}
            alt="NextUI Image with fallback"
            classNames={{
              wrapper: "w-full",
              img: "w-full",
            }}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <span className={cls("w-full font-medium pt-1 pl-1", isDeal ? "pl-2 line-through text-foreground-400" : "")}>
            {toUSD(price)} {}
          </span>
          {isDeal && <span className={cls("text-danger font-bold")}>{isDeal ? toUSD(regularPrice) : ""}</span>}
        </div>
      </CardHeader>
      <CardBody className="px-3">
        <div>
          <section className="flex justify-between">
            <Link
              color="foreground"
              underline="hover"
              href={`/products/${product.id}`}
              className={cls(size === "sm" ? "overflow-hidden max-h-16 max-w-44 text-sm " : "text-lg font-medium")}
            >
              <span className="truncate-lines line-clamp-2">{title}</span>
            </Link>
            <Button
              onPress={() => setFavorite(!favorite)}
              isIconOnly
              radius="full"
              className={cls("border border-divider", size === "sm" ? "hidden" : "")}
              variant="light"
            >
              <HeartIcon
                className={cls(
                  "h-6 w-6 transition-colors",
                  favorite ? " fill-danger" : " fill-transparent stroke-foreground-400 stroke-2 "
                )}
              />
            </Button>
          </section>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          size="sm"
          radius="sm"
          color={"primary"}
          className={cls(size === "sm" ? "w-full" : "")}
          onPress={() => {
            if (user) {
              createCartItem({ productId: product.id, userId: user.id }).then(() => {
                console.log("Item added to cart");
              });
            }
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
