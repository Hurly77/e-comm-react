import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { deletePaymentMethod, updateUserDefaultPm } from "@/sdk/methods";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";
import useSession from "@/components/layouts/app/hooks/useSession";
import React from "react";
import AccountPaymentsCardDisplay from "./AccountPaymentsCardDisplay";
import ConfirmModal from "../../components/Shared/ConfirmModal";
import { useAccount } from "../../hooks/useAccount";
import AccountAddNewModal from "../../components/Account/AccountAddNewModal";
import AccountAddNewPaymentForm from "../../components/Account/AccountAddNewPaymentForm";

export default function AccountPaymentsPage() {
  const { session } = useSession();

  const { data, mutate } = useAccount();
  const { default_id, paymentsMethods } = data?.payments ?? {};

  // console.log(`Default PM ID: ${default_id}`, `Default PM Brand: ${defaultPM?.brand}`);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  // used for updating the default pm id, before mutation request is completed

  const [defaultPMId, setDefaultPMId] = React.useState<string | null>(default_id ?? null);
  const [deletePMId, setDeletePMId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (default_id && defaultPMId === null) setDefaultPMId(default_id);
  }, [defaultPMId, default_id]);

  async function handleChangeSwitch(prev: boolean, current: boolean, id: string) {
    if (!data) return;
    if (prev === true && session?.user?.id) {
      setDefaultPMId("");
      await updateUserDefaultPm(session?.user?.id, "");
      await mutate({ ...data, payments: { ...data?.payments, default_id: "" } });
      return;
    } else if (current === true && session?.user?.id) {
      setDefaultPMId(id);
      await updateUserDefaultPm(session?.user?.id, id);
      await mutate({ ...data, payments: { ...data?.payments, default_id: id } });
      return;
    }
  }

  function onClickRemove(id: string) {
    setIsOpen(true);
    setDeletePMId(id);
  }

  async function onRemovePaymentMethod() {
    try {
      if (!data) return;
      setIsDeleting(true);
      if (!deletePMId || paymentsMethods === undefined) return;
      const pm = await deletePaymentMethod(deletePMId);
      const updatedPMs = paymentsMethods?.filter((pm) => pm.id !== deletePMId);

      if (pm && updatedPMs) {
        mutate({ ...data, payments: { ...data?.payments, paymentsMethods: updatedPMs } });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsOpen(false);
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full max-w-screen-xl space-y-4 bg-default-50 p-8">
      <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["payments"]} />
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-medium">Payments</h1>
        <AccountAddNewModal Component={AccountAddNewPaymentForm} componentProps={{ setDefaultPMId }} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {paymentsMethods
          ? paymentsMethods.map(({ card, ...pm }) => (
              <AccountPaymentsCardDisplay
                key={pm.id}
                pmId={pm.id}
                defaultPMId={defaultPMId}
                billingDetails={pm.billing_details}
                card={card as NonNullable<typeof card>}
                onChangeDefaultPM={handleChangeSwitch}
                onRemove={() => onClickRemove(pm.id)}
              />
            ))
          : "No payment methods"}
      </div>

      <ConfirmModal
        cancelText="Cancel"
        confirmText="Remove"
        title="Remove Payment Method"
        message="Are you sure you want to remove this payment method?"
        isOpen={isOpen}
        isLoading={isDeleting}
        onClose={() => setIsOpen(false)}
        onConfirm={onRemovePaymentMethod}
      />
    </div>
  );
}
