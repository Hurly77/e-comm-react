import React from "react";
import useSession from "@/app/hooks/useSession";
import Checkout from "@/layouts/main/components/Checkout/Checkout";
import CheckoutContextProvider from "@/layouts/main/context/CheckoutContext";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { session } = useSession();

  React.useEffect(() => {
    if (!session) router.back();
  }, [router, session]);

  if (!session) return null;

  return (
    <CheckoutContextProvider session={session}>
      <div className="justify-center w-full flex pb-[400px] ">
        <Checkout />
      </div>
    </CheckoutContextProvider>
  );
}
