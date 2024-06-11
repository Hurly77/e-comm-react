import { useRouter } from "next/router";
import useProducts from "../hooks/useProducts";
import React from "react";
import { Pagination, Spinner } from "@nextui-org/react";
import ProductGrid from "../components/Product/ProductGrid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

export default function ProductSearchPage() {
  const router = useRouter();
  const query = router.query.q;

  const { products, productCount, isLoading, filterStates } = useProducts({
    search: query?.toString(),
    take: 25,
    skip: 0,
    deals: false,
  });
  const [filters, setFilters] = filterStates;
  const totalPages = Math.ceil((productCount ?? 1) / 25);

  React.useEffect(() => {
    if (query?.toString() !== filters?.search) {
      setFilters({ ...filters, search: query?.toString() });
    }
  }, [filters, query, setFilters]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Head>
        <title>Search: {query}</title>
      </Head>
      <div className="pb-24">
        <div className="py-10 max-w-screen-xl">
          {(products?.length ?? 0) > 0 ? (
            <ProductGrid products={products ?? []} />
          ) : products?.length === 0 && !isLoading ? (
            <div className="text-center space-y-10">
              <ExclamationTriangleIcon className="h-14 w-14 mx-auto border rounded-full bg-default p-1" />
              <div>
                <p className="text-2xl">&quot;{query}&quot;</p>
                <h1 className="text-2xl font-bold text-center">Could not find a match for your search</h1>
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-full flex justify-center">
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              page={1}
              onChange={(page) => {
                const newSkip = 25 * (page - 1);

                setFilters({ ...filters, skip: newSkip });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
