import { fetchUserBlogs } from "@/actions/blog.actions";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import BlogCardItem from "@/components/BlogCardItem";

interface Blog {
  _id?: string;
  title: string;
  content: string | null;
  status: "draft" | "published";
  updatedAt?: string | null;
  tags: string[];
  author?: { name: string; email: string };
  createdAt?: string;
  id?: string;
}

export default async function MyBlogsPage() {
  let blogs: Blog[] = [];
  try {
    blogs = await fetchUserBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Failed to load your blogs.</p>
        <p className="mt-2">
          You might need to{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            log in
          </a>{" "}
          again.
        </p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-black mb-4">
          My Blogs
        </h1>
        <p className="font-mono text-zinc-800 text-sm mb-4">
          You haven't created any blogs yet.
        </p>
        <Button
          variant="default"
          className="py-3 px-6 text-base font-medium flex items-center justify-center gap-2"
          asChild
        >
          <Link href="/dashboard/create">
            <PlusIcon className="h-5 w-5" />
            Create Your First Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-black">
            My Blogs
          </h1>
          <p className="font-mono text-zinc-800 text-sm">
            Your published and draft blogs in one place
          </p>
        </div>
        <Button
          variant="default"
          className="py-2 px-4 text-sm font-medium flex items-center justify-center gap-2"
          asChild
        >
          <Link href="/dashboard/create">
            <PlusIcon className="h-5 w-5" />
            Create New Blog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {blogs.map((blog) => (
          <BlogCardItem key={blog._id || blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
