
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const HorseCardSkeleton = () => {
  return (
    <Card className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-video">
        <Skeleton className="w-full h-full bg-white/10" />
      </div>

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div>
          <Skeleton className="h-6 w-3/4 mb-2 bg-white/10" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16 bg-white/10" />
            <Skeleton className="h-4 w-12 bg-white/10" />
            <Skeleton className="h-4 w-20 bg-white/10" />
          </div>
        </div>

        {/* Location skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 bg-white/10" />
          <Skeleton className="h-4 w-32 bg-white/10" />
        </div>

        {/* Disciplines skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 bg-white/10 rounded-full" />
          <Skeleton className="h-6 w-20 bg-white/10 rounded-full" />
          <Skeleton className="h-6 w-14 bg-white/10 rounded-full" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-32 bg-white/10" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-12 w-full bg-white/10 rounded-xl" />
      </div>
    </Card>
  );
};

export default HorseCardSkeleton;
