import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link, Switch } from "@nextui-org/react";
import Stripe from "stripe";
import { getCardBrandImage } from "../../helpers/card-brands";
import { formatDate } from "../../helpers/date";

interface AccountPaymentsCardDisplayProps {
  pmId: string;
  defaultPMId: string | null;
  card: Stripe.PaymentMethod.Card;
  billingDetails: Stripe.PaymentMethod.BillingDetails;
  onChangeDefaultPM: (prev: boolean, current: boolean, id: string) => void;
  onRemove: () => void;
}

export default function AccountPaymentsCardDisplay(props: AccountPaymentsCardDisplayProps) {
  const { pmId, card, billingDetails, defaultPMId, onChangeDefaultPM, onRemove } = props;

  const { name, address } = billingDetails;
  const { city, state, line1 } = address ?? {};

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Image
            radius="sm"
            className="sm:max-w-[192px] w-auto"
            height={120}
            width={192}
            src={getCardBrandImage(card?.display_brand) ?? ""}
            alt="card-brand"
          />
          <div className="">
            <div className="flex text-lg leading-5">
              <h4 className="capitalize">{card?.display_brand?.split("_").join(" ")}</h4>
              <span>&nbsp;••••&nbsp;{card?.last4}</span>
            </div>
            <span className="text-foreground-500">
              Expires {formatDate(new Date(card?.exp_year ?? 0, card?.exp_month ?? 0))}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="">
          <h2 className="text-xl font-medium">{name ?? ""}</h2>
          <p>{line1}</p>
          <p>
            {city}, {state}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex sm:flex-row flex-col justify-between gap-4">
        <Switch
          className="self-start"
          isSelected={pmId === defaultPMId}
          onValueChange={(value) => onChangeDefaultPM(defaultPMId === pmId, value, pmId)}
        >
          Set as default
        </Switch>
        <div className="space-x-4 flex justify-between w-full sm:w-fit">
          <Button onClick={onRemove} radius="sm" color="danger" variant="ghost" className="w-1/2">
            Remove
          </Button>
          <Button as={Link} href={`/account/payments/${pmId}`} radius="sm" color="primary" className="w-1/2">
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
