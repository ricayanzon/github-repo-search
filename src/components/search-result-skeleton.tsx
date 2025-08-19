import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchResultSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </CardTitle>
        <CardDescription>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-4 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
