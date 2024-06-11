import {
  getPaymentMethods,
  getUserShippingAddress,
  createUserShippingAddress,
  CreateUserShippingAddr,
} from "@/lib/sdk/methods";
import { getSetupIntent } from "@/lib/sdk/methods/get-setup-intent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import React from "react";
import useSWR, { KeyedMutator } from "swr";
import { CheckoutSkeleton } from "../components/Checkout/CheckoutSkeleton";
import { UserShippingAddress } from "@/lib/sdk/models/UserShippingAddress";
import { default as StripeAPI } from "stripe";

export interface CheckoutProviderT {
  children: React.ReactNode;
  session: AuthSession;
}

export interface CheckoutContextT {
  isLoading: boolean;
  client_secret?: string | null;
  stripePromise: Promise<Stripe | null>;
  selectedPm: StripeAPI.PaymentMethod | null;
  selectedAddress: UserShippingAddress | null;
  paymentMethods: StripeAPI.PaymentMethod[];
  shippingAddresses: UserShippingAddress[];
  checkoutDrawerStates: UseStateProps<boolean>;
  formToggles: {
    card_list: boolean;
    card_form: boolean;
    address_form: boolean;
    address_list: boolean;
  };
  setSelectedPm: React.Dispatch<React.SetStateAction<StripeAPI.PaymentMethod | null>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<UserShippingAddress | null>>;
  updateToggles(toggle: "card_list" | "card_form" | "address_form" | "address_list", value: boolean): Promise<void>;
  addNewAddress: (address: CreateUserShippingAddr) => Promise<void>;
  mutate: KeyedMutator<
    | {
        paymentMethods: StripeAPI.ApiList<StripeAPI.PaymentMethod> | undefined;
        userShippingAddresses: UserShippingAddress[] | undefined;
        setupIntent: StripeAPI.SetupIntent | undefined;
      }
    | undefined
  >;
  error: unknown;
}

export const CheckoutContext = React.createContext({} as CheckoutContextT);

export default function CheckoutContextProvider({ children, session }: CheckoutProviderT) {
  const userId = session?.user?.id;
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "");
  const [selectedPm, setSelectedPm] = React.useState<StripeAPI.PaymentMethod | null>(null);
  const [selectedAddress, setSelectedAddress] = React.useState<UserShippingAddress | null>(null);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = React.useState(false);
  const [formToggles, setFormToggles] = React.useState({
    card_list: false,
    card_form: false,
    address_form: false,
    address_list: false,
  });

  const fetcher = async () => {
    if (!userId) return;
    // eslint-disable-next-line no-console
    console.log("Refetching Checkout Data");
    const [paymentMethods, userShippingAddresses, setupIntent] = await Promise.all([
      getPaymentMethods(userId),
      getUserShippingAddress(userId),
      getSetupIntent(userId),
    ]);

    return { paymentMethods, userShippingAddresses, setupIntent };
  };

  const CACHE_KEY = `CHECKOUT_${userId}`;
  const { data, isLoading, error, mutate } = useSWR(CACHE_KEY, fetcher);

  const { userShippingAddresses, setupIntent } = data ?? {};

  React.useEffect(() => {
    if (!formToggles.address_form && userShippingAddresses?.length === 0) {
      setFormToggles({ ...formToggles, address_form: true });
    }
  }, [formToggles, userShippingAddresses?.length]);

  React.useEffect(() => {
    if (!selectedAddress && userShippingAddresses?.length) {
      // eslint-disable-next-line no-console
      console.log("Setting Selected Address");
      setSelectedAddress(userShippingAddresses[0]);
    }

    if (!selectedPm && data?.paymentMethods?.data.length) {
      // eslint-disable-next-line no-console
      console.log("Setting Selected Payment Method");
      setSelectedPm(data.paymentMethods.data?.[0]);
    }
  }, [data, selectedAddress, selectedPm, userShippingAddresses]);

  async function addNewAddress(address: CreateUserShippingAddr) {
    try {
      const response = await createUserShippingAddress(userId, address);
      if (response && data && userShippingAddresses) {
        updateToggles("address_form", false);
        await mutate({ ...data, userShippingAddresses: [...userShippingAddresses, response] });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function updateToggles(toggle: keyof typeof formToggles, value: boolean) {
    const toggleKeys = Object.keys(formToggles) as (keyof typeof formToggles)[];
    const updates = {} as typeof formToggles;
    toggleKeys.forEach((key) => (updates[key] = false));

    setFormToggles({ ...updates, [toggle]: value });
    setTimeout(() => scrollToActiveStep(toggle), 100);
  }

  async function scrollToActiveStep(key: string) {
    const elementId = key?.includes("card") ? "payment_method" : "shipping_address";

    if (typeof document === "undefined" || typeof window === "undefined") return;

    const element = document.getElementById(elementId);
    const mainLayout = document.getElementById("main-layout");

    if (!element || !mainLayout) return;
    const scrollPosition = element.getBoundingClientRect().y - 68 + mainLayout.scrollTop;

    mainLayout.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }

  const value: CheckoutContextT = {
    isLoading: false,
    stripePromise,
    paymentMethods: data?.paymentMethods?.data ?? [],
    shippingAddresses: userShippingAddresses ?? [],
    checkoutDrawerStates: [checkoutDrawerOpen, setCheckoutDrawerOpen],
    selectedPm,
    selectedAddress,
    formToggles,
    updateToggles,
    addNewAddress,
    setSelectedPm,
    setSelectedAddress,
    mutate,
    error,
  };

  // const clientSecret = data?.client_secret;

  const elementOptions: StripeElementsOptions = {
    clientSecret: setupIntent?.client_secret ?? "",
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <CheckoutContext.Provider value={value}>
      {setupIntent && !isLoading ? (
        <Elements stripe={stripePromise} options={elementOptions}>
          {children}
        </Elements>
      ) : (
        <CheckoutSkeleton />
      )}
    </CheckoutContext.Provider>
  );
}