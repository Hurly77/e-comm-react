import ErrorBoundary from "@/app/components/ErrorBoundary";
import useSession from "@/app/hooks/useSession";

import Navigation from "./components/Navigation/Navigation";
import MainContextProvider from "./context/MainContext";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { session } = useSession();
  return (
    <MainContextProvider>
      <div className="layout flex-col">
        <Navigation />
        <ErrorBoundary
          fallback={
            <div className="error-boundary">
              <h1>Something went wrong.</h1>
            </div>
          }
        >
          <div className="flex grow justify-center w-full">{children}</div>
        </ErrorBoundary>
      </div>
    </MainContextProvider>
  );
}
