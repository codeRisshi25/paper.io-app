export function EditorSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-12 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-8"></div>
      
      <div className="h-8 w-full bg-gray-200 dark:bg-slate-700 rounded-t"></div>
      <div className="space-y-4 mt-1 border border-gray-200 dark:border-gray-700 rounded-b p-4">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-full bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-24 w-full bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  );
}