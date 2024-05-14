import { ProductModel } from "@/lib/sdk/models/ProductModel";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default function ProductCard({ product }: { product: ProductModel }) {
  return (
    <Card className="border h-fit">
      <CardHeader>{product.title}</CardHeader>
      <CardBody>
        <Image height={300} width={300} src={product.thumbnailUrl} alt={product.title} />
      </CardBody>
    </Card>
  );
}
