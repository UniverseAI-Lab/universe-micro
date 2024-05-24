import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WebResultCardSkeleton () {
  return (
    <SkeletonTheme baseColor="#d4d4d8" highlightColor="#f4f4f5">
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-full flex-col gap-2">
          <Skeleton count={1} height={28} width={160} />
          <div className="flex w-full flex-row gap-2">
            <Skeleton count={1} width={96} height={16} />
            <Skeleton count={1} width={64} height={16} />
          </div>
          <Skeleton count={2} height={20} />
          <Skeleton count={1} width={120} />
        </div>
      </div>
    </SkeletonTheme>
  );
};