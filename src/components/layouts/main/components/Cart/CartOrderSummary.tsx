import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { toUSD } from "../../helpers/number";

export default function CartOrderSummary() {
  const { cart } = useCart();

  if (!cart) return null;

  const numOfItems = cart.items?.map((item) => item.quantity).reduce((a, b) => a + b);
  const subTotal = cart.items?.reduce((acc, { product, quantity }) => acc + quantity * product.price ?? 0, 0);
  const salesTax = subTotal * 0.0725;
  const totalPrice = subTotal + salesTax;

  function SummaryItem({ title, subtitle, value }: { title: string; subtitle?: string; value: string | number }) {
    return (
      <div>
        <div className="flex justify-between">
          <span>
            {title}
            {subtitle && (
              <>
                <br />
                <span className="text-sm text-foreground-400 pl-4">{subtitle}</span>
              </>
            )}
          </span>
          <span>{value}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-medium">Order Summary</h1>
      <div className="grow border-t pb-2">
        <Accordion variant="light">
          <AccordionItem
            subtitle={`${numOfItems} items`}
            title={`${toUSD(totalPrice)} total`}
            startContent={<ListBulletIcon className="h-6 w-6" />}
          >
            <div className="pl-8 space-y-4">
              <SummaryItem title="Subtotal" value={toUSD(subTotal)} />
              <SummaryItem title="Shipping" value={"Free"} />
              <SummaryItem title="Sales Tax" subtitle="7.25%" value={toUSD(salesTax)} />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <Button color="primary" radius="sm" className="w-full font-medium text-md">
        Continue to Checkout
      </Button>
    </div>
  );
}
