import { Card, Skeleton } from "@nextui-org/react";

export function CheckoutSkeleton() {
  return (
    <div className="flex grow gap-4 max-w-4xl py-8">
      <div className="gap-y-4 w-4/6 flex flex-col grow">
        <Card className="grow h-2/4">
          <Skeleton className="h-full" />
        </Card>
        <Card className="grow h-1/4">
          <Skeleton className="h-full" />
        </Card>
        <Card className="grow h-1/4">
          <Skeleton className="h-full" />
        </Card>
      </div>
      <div className="min-w-96 flex grow">
        <Card className="grow h-96">
          <Skeleton className="h-full" />
        </Card>
      </div>
    </div>
  );
}
