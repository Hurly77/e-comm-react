import ErrorBoundary from "@/app/components/ErrorBoundary";

import Navigation from "./components/Navigation/Navigation";
import { AdminContextProvider } from "./context/AdminContext";

type AdminLayoutProps = {
  children?: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminContextProvider>
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
    </AdminContextProvider>
  );
}
