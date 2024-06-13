import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { toUSD } from "../../helpers/number";
import { getNumOfItems, getSubtotal } from "../../helpers/cart-helpers";
import { useRouter } from "next/router";

export default function CartOrderSummary() {
  const { cart } = useCart();
  const router = useRouter();

  if (!cart) return null;

  const numOfItems = getNumOfItems(cart);
  const subTotal = getSubtotal(cart);
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
      <Button
        onClick={() => router.push("/checkout")}
        color="primary"
        radius="sm"
        className="w-full font-medium text-md"
      >
        Continue to Checkout
      </Button>
    </div>
  );
}
