import Stripe from "stripe";
import { getCardBrandImage } from "../../helpers/card-brands";
import { Image } from "@nextui-org/react";
import { formatDate } from "../../helpers/date";
import { cls } from "@/components/layouts/app/helpers/twind-helpers";

interface PaymentMethodCardProps {
  card: Stripe.PaymentMethod.Card;
  size?: "sm" | "md" | "lg";
  showExpiration?: boolean;
  align?: "start" | "end";
  className?: string;
}

const sizes = {
  sm: { height: 20, width: 50 },
  md: { height: 75, width: 120 },
  lg: { height: 80, width: 128 },
  xl: { height: 120, width: 200 },
};

export default function PaymentMethodCard({ card, size, align, className, showExpiration }: PaymentMethodCardProps) {
  const { height, width } = sizes[size ?? "md"];

  const expirationDate = new Date(card?.exp_year ?? 0, card?.exp_month ?? 0);

  return (
    <div className={cls("flex gap-2 w-fit", align === "start" ? "items-start" : "items-center", className ?? "")}>
      <Image
        radius="sm"
        src={getCardBrandImage(card?.display_brand) ?? ""}
        height={height}
        width={width}
        alt="card-brand"
      />
      <div className="p-2">
        <div className={cls("flex flex-col text-lg leading-5")}>
          <h4 className="capitalize">
            {card?.display_brand?.split("_").join(" ")}
            <span>&nbsp;••••&nbsp;{card?.last4}</span>
          </h4>

          {showExpiration && (
            <div className="flex flex-col text-foreground-400 py-1">
              <span>Expires {formatDate(expirationDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
