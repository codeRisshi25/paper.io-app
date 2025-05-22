export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-800 dark:border-white"></div>
      <p className="text-neutral-600 dark:text-neutral-300 font-medium">Loading your profile...</p>
    </div>
  );
}