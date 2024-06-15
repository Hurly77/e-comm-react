import { Skeleton } from "@nextui-org/react";
import AccountCard from "./AccountCard";
export default function AccountSkeleton() {
  const SkeletonSubCard = () => (
    <AccountCard title={<Skeleton className="h-9 w-60 rounded" />}>
      <div className="flex gap-4">
        <Skeleton className="min-h-16 min-w-16 rounded-full" />
        <div className="space-y-2 grow">
          <Skeleton className="grow h-8 w-full border" />
          <Skeleton className="grow h-6 w-full border" />
        </div>
      </div>
    </AccountCard>
  );

  return (
    <div className="w-full max-w-screen-xl space-y-4 bg-default-100">
      <div className="flex items-center h-40 flex-col justify-center">
        <Skeleton className="h-9 w-60 rounded mb-1" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>
      <AccountCard title={<Skeleton className="h-9 w-60 rounded" />}>
        <div className="space-y-2">
          <Skeleton className="h-9 grow" />
          <Skeleton className="h-9 grow" />
          <Skeleton className="h-9 grow" />
        </div>
      </AccountCard>

      <div className="grid grid-cols-2 gap-4">
        <SkeletonSubCard />
        <SkeletonSubCard />
        <SkeletonSubCard />
        <SkeletonSubCard />
      </div>
    </div>
  );
}
