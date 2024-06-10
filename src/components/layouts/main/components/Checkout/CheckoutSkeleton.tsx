import { Card, Skeleton } from "@nextui-org/react";

export function CheckoutSkeleton() {
  return (
    <div className="flex gap-6 w-full max-w-4xl py-8 h-full">
      <div className="gap-y-4 flex flex-col grow">
        <Card className="grow">
          <Skeleton className="h-full" />
        </Card>
        <Card className="grow">
          <Skeleton className="h-full" />
        </Card>
        <Card className="grow">
          <Skeleton className="h-full" />
        </Card>
      </div>
      <div className="min-w-96 flex grow">
        <Card className="grow h-2/3">
          <Skeleton className="h-full" />
        </Card>
      </div>
    </div>
  );
}
