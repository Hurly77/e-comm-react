import { Skeleton } from "@nextui-org/react";

export default function SkeletonBubbles({ size }: { size: number }) {
  const items = Array.from({ length: size }, (_, i) => i);

  return (
    <div className="grid grid-cols-6 gap-2 py-6">
      {items.map((item) => (
        <Skeleton className="w-44 h-44 rounded-full" key={item} />
      ))}
    </div>
  );
}
