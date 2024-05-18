import { cls } from "@/components/layouts/app/helpers/twind-helpers";
import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { default as NextImage } from "next/image";
import React from "react";

export default function ProductCard({ product }: { product: ProductModel }) {
  const [favorite, setFavorite] = React.useState<boolean>(false);

  return (
    <Card radius="sm" className="grow">
      <CardHeader className="flex justify-center">
        {" "}
        <Image
          as={NextImage}
          radius="sm"
          width={308}
          height={308}
          src={product.thumbnailUrl}
          fallbackSrc="https://via.placeholder.com/308x308"
          alt="NextUI Image with fallback"
          objectFit="contain"
          classNames={{
            wrapper: "border border-black w-full",
            img: "w-full",
          }}
          style={{
            objectFit: "cover",
          }}
        />
      </CardHeader>
      <CardBody>
        <div>
          <section className="flex justify-between">
            <h2 className="text-lg font-medium">{product.title}</h2>
            <Button
              onPress={() => setFavorite(!favorite)}
              isIconOnly
              radius="full"
              className="border border-divider"
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
        <Button color="primary">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
