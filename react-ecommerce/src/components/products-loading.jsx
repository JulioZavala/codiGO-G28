import { Skeleton } from "./ui/skeleton";

function ProductsLoading() {
  return (
    <div className="flex justify-between w-full">
      <div>
        <Skeleton className="h-75 w-75 rounded-lg" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
      </div>
      <div>
        <Skeleton className="h-75 w-75 rounded-lg" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
      </div>
      <div>
        <Skeleton className="h-75 w-75 rounded-lg" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
      </div>
      <div>
        <Skeleton className="h-75 w-75 rounded-lg" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
      </div>
      <div>
        <Skeleton className="h-75 w-75 rounded-lg" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
        <Skeleton className="w-75 h-5 rounded-lg mt-5" />
      </div>
    </div>
  );
}

export default ProductsLoading;