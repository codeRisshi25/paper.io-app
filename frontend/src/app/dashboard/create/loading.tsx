import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-14 w-3/4 mb-6 bg-slate-200 dark:bg-slate-700" />
      
      <div className="border border-gray-200 dark:border-slate-700 rounded-md overflow-hidden">
      <Skeleton className="h-[60vh] w-full bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  )
}