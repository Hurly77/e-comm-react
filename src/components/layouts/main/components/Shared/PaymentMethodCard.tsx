import Stripe from "stripe";
import { getCardBrandImage } from "../../helpers/card-brands";
import { Image } from "@nextui-org/react";

export default function PaymentMethodCard({ card }: { card: Stripe.PaymentMethod.Card }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        radius="sm"
        className="border"
        src={getCardBrandImage(card?.display_brand) ?? ""}
        height={20}
        width={50}
        alt="card-brand"
      />
      <div className="">
        <div className="flex text-lg leading-5">
          <h4 className="capitalize">{card?.display_brand?.split("_").join(" ")}</h4>
          <span>&nbsp;••••&nbsp;{card?.last4}</span>
        </div>
      </div>
    </div>
  );
}
