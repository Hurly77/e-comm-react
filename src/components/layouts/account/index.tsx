import ErrorBoundary from "@/app/components/ErrorBoundary";
import MainLayout from "../main";
import { Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function AccountLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = router.pathname;

  const routes = [
    {
      title: "Details",
      key: "/account",
    },
    {
      title: "Orders",
      key: "/account/orders",
    },
    {
      title: "Payments",
      key: "/account/payments",
    },
  ];

  const tabs = (
    <Tabs
      onSelectionChange={(path) => {
        console.log(path);
        if (path != pathname) {
          router.push({
            pathname: path?.toString(),
          });
        }
      }}
      color="primary"
      size="lg"
    >
      {routes.map((route) => (
        <Tab key={route.key} title={route.title}>
          {pathname === route.key ? children : route.title}
        </Tab>
      ))}
    </Tabs>
  );

  return (
    <MainLayout>
      <div id="main-layout" className="layout flex-col">
        <ErrorBoundary
          fallback={
            <div className="error-boundary">
              <h1>Something went wrong.</h1>
            </div>
          }
        >
          <div className="flex grow justify-center w-full">
            <div>{tabs}</div>
          </div>
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
}
