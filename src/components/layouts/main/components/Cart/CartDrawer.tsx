import { Modal, ModalContent, Image, Link, ModalHeader, ModalBody, Button, Spinner } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import React from "react";
import { CART_MOTION_PROPS } from "../../constants/cart";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductPrice from "../Product/ProductPrice";
import { QuantitySelect } from "@/components/common/Select/QuantitySelect";

export default function CartDrawer() {
  const { cart, addItem, updateItem, preProcessingItem, drawerOpenStates, isUpdating } = useCart();
  const [isOpen, setIsOpen] = drawerOpenStates;

  const NoItemContent = () => <div>Oops Looks like an issue occurred.</div>;
  const cartItem = cart?.items?.find((item) => item.product.id === preProcessingItem?.id);
  const includesItem = cartItem !== undefined;

  return (
    <Modal
      radius="none"
      classNames={{
        base: "sm:m-0",
        closeButton:
          "scale-75 top-6 right-4 h-10 w-10 bg-default-100 hover:bg-default-200 hover:scale-100 transition-all",
      }}
      closeButton={<XMarkIcon className="bg-default-400 rounded-full" />}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="h-full p-4 m-0 absolute right-0"
      motionProps={CART_MOTION_PROPS}
    >
      <ModalContent>
        <ModalHeader className="border-b">
          <h1 className="text-xl font-medium">Choose Options</h1>
        </ModalHeader>
        <ModalBody>
          {preProcessingItem ? (
            <div className="space-y-8">
              <div className="flex gap-x-4">
                <Image
                  width={250}
                  height={250}
                  src={preProcessingItem?.thumbnailUrl}
                  alt="NextUI Image with fallback"
                />
                <div>
                  <section>
                    <Link underline="hover" className="text-foreground" href={`/products/${preProcessingItem.id}`}>
                      <h2>{preProcessingItem.title}</h2>
                    </Link>
                    <p className="text-xs text-foreground-400">{preProcessingItem.category.name}</p>
                  </section>
                  <ProductPrice price={preProcessingItem.price} regularPrice={preProcessingItem.regularPrice} />
                </div>
              </div>
              {!includesItem ? (
                <Button
                  onPress={() => {
                    addItem(preProcessingItem.id, 1);
                  }}
                  color="primary"
                  radius="sm"
                  className="w-full font-medium text-md"
                  endContent={isUpdating && <Spinner color="white" size="sm" />}
                  isDisabled={isUpdating}
                >
                  Add to Cart
                </Button>
              ) : (
                // eslint-disable-next-line react/jsx-no-undef
                <QuantitySelect
                  className="w-96"
                  color="primary"
                  defaultValue={cartItem.quantity}
                  onChange={(quantity) => {
                    updateItem(cartItem.id, quantity);
                  }}
                  purchaseLimit={preProcessingItem.purchaseLimit || 6}
                  isLoading={isUpdating}
                />
              )}
            </div>
          ) : (
            <NoItemContent />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
