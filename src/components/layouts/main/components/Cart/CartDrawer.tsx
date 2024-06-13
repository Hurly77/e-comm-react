import { Image, Link, Button, Spinner } from "@nextui-org/react";
import { useCart } from "../../hooks/useCart";
import React from "react";
import ProductPrice from "../Product/ProductPrice";
import { QuantitySelect } from "@/components/common/Select/QuantitySelect";
import Drawer from "../Drawer/Drawer";
import useSession from "@/components/layouts/app/hooks/useSession";
import { useRouter } from "next/router";

export default function CartDrawer() {
  const router = useRouter();
  const { session } = useSession();
  const { cart, addItem, updateItem, preProcessingItem, drawerOpenStates, isUpdating } = useCart();
  const [isOpen, setIsOpen] = drawerOpenStates;

  const NoItemContent = () => <div>Oops Looks like an issue occurred.</div>;
  const cartItem = cart?.items?.find((item) => item.product.id === preProcessingItem?.id);
  const includesItem = cartItem !== undefined;

  return (
    <Drawer title="Choose Options" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      {preProcessingItem ? (
        <div className="space-y-8">
          <div className="flex gap-x-4">
            <Image width={250} height={250} src={preProcessingItem?.thumbnailUrl} alt="NextUI Image with fallback" />
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
          {!session?.user ? (
            <div>
              <p className="text-foreground-400 text-center py-2">Have an Account Login to add to Cart</p>
              <Button
                radius="sm"
                color="primary"
                className="w-full font-medium text-md"
                onPress={() => router.push(`/auth/login?cart_item=${preProcessingItem.id}`)}
                endContent={isUpdating && <Spinner color="white" size="sm" />}
                isDisabled={isUpdating}
              >
                Login
              </Button>
            </div>
          ) : !includesItem ? (
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
    </Drawer>
  );
}
