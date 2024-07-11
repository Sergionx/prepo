import { Card, CardFooter } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="w-[100px] h-[20px] rounded-lg bg-default-300"></div>
      </Skeleton>

      <div className="h-[100px] w-[100px] rounded-full bg-default-200 self-center"></div>

      <CardFooter className="flex flex-wrap justify-center gap-2">
        <Skeleton className="w-[65px] h-[20px] rounded-full bg-default-300"></Skeleton>
        <Skeleton className="w-[65px] h-[20px] rounded-full bg-default-300"></Skeleton>
      </CardFooter>
    </Card>
  );
}
