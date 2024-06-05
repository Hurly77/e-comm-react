import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from "@nextui-org/react";
import React from "react";
import { useCart } from "../../hooks/useCart";
import ProductPrice from "./ProductPrice";

interface ProductCardT {
  size?: "sm" | "md" | "lg";
  product: ProductModel;
}

export default function ProductCard({ product, size }: ProductCardT) {
  const [favorite, setFavorite] = React.useState<boolean>(false);
  const { preProcessCartItem } = useCart();
  const { title, thumbnailUrl, price, regularPrice } = product;

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
        <ProductPrice price={price} regularPrice={regularPrice} />
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
          onPress={() => preProcessCartItem(product)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
