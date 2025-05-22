import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-14 w-3/4 mb-6 bg-slate-200 dark:bg-slate-700" />
      
      <div className="border border-gray-200 dark:border-slate-700 rounded-md overflow-hidden">
        <div className="h-12 bg-slate-100 dark:bg-slate-800 p-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-8 w-8 rounded bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        </div>
        
        <div className="p-4 space-y-4 min-h-[60vh]">
          <Skeleton className="h-6 w-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-11/12 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-24 w-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-5/6 bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-full bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 p-4 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-700" />
          
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-10 w-28 bg-blue-200 dark:bg-slate-700" />
            <Skeleton className="h-10 w-24 bg-green-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  )
}