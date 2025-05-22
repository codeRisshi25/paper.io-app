import { fetchUserBlogs } from "@/actions/blog.actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string | null;
  status: "draft" | "published";
  updatedAt: string;
  tags: string[];
  author: {name : string , email : string};
  createdAt: string;
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
        <h1 className="text-2</Button>xl font-semibold mb-4 text-black dark:text-white">
          My Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You haven't created any blogs yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/create">Create Your First Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
        className="py-6 mt-4 text-lg font-medium flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 transition duration-200"
      >
        <PlusIcon className="h-5 w-5" />
        Create New Blog
      </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {blogs.map((blog) => (
        <Card
        key={blog._id || blog.id}
        className="dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
        >
        <CardHeader className="pb-0">
          <CardTitle
          className="text-lg md:text-xl text-black dark:text-white truncate"
          title={blog.title}
          >
          {blog.title}
          </CardTitle>
          <div className="flex items-center mt-1">
          <span
            className={`w-2.5 h-2.5 rounded-full inline-block mr-1.5 ${
            blog.status === "published"
              ? "bg-green-500 dark:bg-green-400"
              : "bg-yellow-500 dark:bg-yellow-400"
            }`}
          ></span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
          </span>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 pt-2">
          <div className="flex flex-wrap gap-1.5 py-5">
          {blog.tags && blog.tags.length > 0 ? (
            blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">
            No tags
            </span>
          )}
          </div>
          <p>
          Last updated:{" "}
          {new Date(blog.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          </p>
        </CardContent>
        <CardFooter className="pt-3 border-t dark:border-slate-700">
          {blog.status === "published" ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full dark:text-white dark:border-slate-600 hover:dark:bg-slate-800"
          >
            <Link href={`/blogs/${blog._id || blog.id}`}>
            {" "}
            <EyeIcon className="mr-2 h-4 w-4" /> View Blog
            </Link>
          </Button>
          ) : (
          <Button variant="default" size="sm" asChild className="w-full">
            <Link href={`/dashboard/edit/${blog._id || blog.id}`}>
            {" "}
            <PencilIcon className="mr-2 h-4 w-4" /> Edit Draft
            </Link>
          </Button>
          )}
        </CardFooter>
        </Card>
      ))}
      </div>
    </div>
  );
}
