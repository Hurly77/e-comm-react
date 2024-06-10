import ErrorBoundary from "@/app/components/ErrorBoundary";

import Navigation from "./components/Navigation/Navigation";
import MainContextProvider from "./context/MainContext";
import { CartContextProvider } from "./context/CartContext";
import CartDrawer from "./components/Cart/CartDrawer";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <MainContextProvider>
      <CartContextProvider>
        <div id="main-layout" className="layout flex-col">
          <Navigation />
          <ErrorBoundary
            fallback={
              <div className="error-boundary">
                <h1>Something went wrong.</h1>
              </div>
            }
          >
            <div className="flex grow justify-center w-full">{children}</div>
            <CartDrawer />
          </ErrorBoundary>
        </div>
      </CartContextProvider>
    </MainContextProvider>
  );
}
