import Stripe from "stripe";
import { Image } from "@nextui-org/react";
import { getCardBrandImage } from "../../../app/helpers/card-brands";

export default function CheckoutCardItem({
  size,
  card,
}: {
  size?: "sm" | "md" | "lg";
  card: NonNullable<Stripe.PaymentMethod["card"]>;
}) {
  const cardDate = new Date(card?.exp_year ?? 0, card?.exp_month ?? 0);

  const expireDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
  }).format(cardDate);

  const sizes = {
    sm: { height: 50, width: 80 },
    md: { height: 75, width: 120 },
    lg: { height: 120, width: 192 },
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        radius="sm"
        className="border"
        {...sizes[size ?? "sm"]}
        src={getCardBrandImage(card?.display_brand) ?? ""}
        alt="card-brand"
      />
      <div className="">
        <div className="flex text-lg leading-5">
          <h4 className="capitalize">{card?.display_brand?.split("_").join(" ")}</h4>
          <span>&nbsp;••••&nbsp;{card?.last4}</span>
        </div>
        <span className="text-foreground-500">Expires {expireDate}</span>
      </div>
    </div>
  );
}
