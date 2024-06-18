import useSession from "@/components/layouts/app/hooks/useSession";
import { deleteUserShippingAddress, updateDefaultShippingAddress } from "@/sdk/methods";
import AddressDisplay from "../../components/Shared/AddressDisplay";
import { Button, Card, CardFooter, CardHeader, Switch } from "@nextui-org/react";
import EShopBreadcrumbs from "../../components/Shared/EShopBreadcrumbs";
import { ACCOUNT_BREAD_CRUMBS } from "../../constants/nav";
import Link from "next/link";
import { useAccount } from "../../hooks/useAccount";
import AccountAddNewModal from "../../components/Account/AccountAddNewModal";
import AccountAddNewAddressForm from "../../components/Account/AccountAddNewAddressForm";
import ConfirmModal from "../../components/Shared/ConfirmModal";
import React from "react";

export default function AccountAddressesPage() {
  const { session } = useSession();

  const { data, mutate } = useAccount();
  const { addresses, default_id } = data?.shipping ?? {};

  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteAddressId, setDeleteAddressId] = React.useState<number | null>(null);

  function onOpen(id: number) {
    setIsOpen(true);
    setDeleteAddressId(id);
  }

  function onCancel() {
    setIsOpen(false);
    setDeleteAddressId(null);
  }

  async function handleOnDelete() {
    if (!deleteAddressId) return;

    try {
      setIsDeleting(true);
      await deleteUserShippingAddress(deleteAddressId);
      if (data) {
        await mutate({
          ...data,
          shipping: {
            ...data?.shipping,
            default_id: default_id === deleteAddressId ? 0 : default_id,
            addresses: data?.shipping?.addresses?.filter((address) => address.id !== deleteAddressId),
          },
        });
      }

      onCancel();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleOnSwitchChange(prev: boolean, current: boolean, id: number) {
    if (!data) return;
    if (prev === true && session?.user?.id) {
      await updateDefaultShippingAddress(session?.user?.id, 0);
      await mutate({ ...data, shipping: { ...data?.shipping, default_id: 0 } });
    } else if (current === true && session?.user?.id) {
      await updateDefaultShippingAddress(session?.user?.id, id);
      await mutate({ ...data, shipping: { ...data.shipping, default_id: id } });
    }
  }

  return (
    <div className="w-full max-w-screen-xl space-y-4 p-8">
      <EShopBreadcrumbs breadcrumbs={ACCOUNT_BREAD_CRUMBS["addresses"]} />
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-medium">Addresses</h1>
        <AccountAddNewModal Component={AccountAddNewAddressForm} componentProps={{}} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {addresses
          ? addresses.map((address) => (
              <Card radius="sm" key={address.id} className="p-4">
                <CardHeader>
                  <div className="w-full flex justify-between items-start">
                    <AddressDisplay boldedName address={address} />
                    <Switch
                      onValueChange={(current) => handleOnSwitchChange(address.id === default_id, current, address.id)}
                      isSelected={address.id === default_id}
                      classNames={{
                        base: "flex-row-reverse gap-4",
                      }}
                    >
                      Default
                    </Switch>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end gap-4">
                  <Button onClick={() => onOpen(address.id)} radius="sm" color="danger" variant="ghost">
                    Remove
                  </Button>
                  <Button as={Link} href={`/account/shipping/${address.id}`} radius="sm" color="primary">
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))
          : "No addresses"}
      </div>
      <ConfirmModal
        cancelText="Cancel"
        confirmText="Delete"
        title="Delete Address"
        message="Are you certain you want to delete this address? Once deleted, it cannot be recovered."
        isOpen={isOpen}
        isLoading={isDeleting}
        onClose={onCancel}
        onConfirm={handleOnDelete}
      />
    </div>
  );
}
