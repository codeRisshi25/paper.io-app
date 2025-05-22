import BlogHeader from "@/components/BlogHeader";
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-100 text-black">
      <BlogHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-4 max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Blog Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The blog you're looking for doesn't exist or hasn't been published
            yet.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors"
          >
            Back to Base
          </Link>
        </div>
      </div>
    </div>
  );
}
