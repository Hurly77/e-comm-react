import ErrorBoundary from "@/app/components/ErrorBoundary";

import Navigation from "./components/Navigation/Navigation";
import MainContextProvider from "./context/MainContext";
import { CartContextProvider } from "./context/CartContext";
import CartDrawer from "./components/Cart/CartDrawer";
import { SWRConfig } from "swr";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <MainContextProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          keepPreviousData: true,
        }}
      >
        <CartContextProvider>
          <div className="layout flex-col">
            <Navigation />
            <ErrorBoundary
              fallback={
                <div className="error-boundary">
                  <h1>Something went wrong.</h1>
                </div>
              }
            >
              <div id="main-layout" className="flex grow w-full overflow-y-auto">
                <div className="flex grow min-h-full h-fit justify-center w-full">{children}</div>
              </div>
              <CartDrawer />
            </ErrorBoundary>
          </div>
        </CartContextProvider>
      </SWRConfig>
    </MainContextProvider>
  );
}
