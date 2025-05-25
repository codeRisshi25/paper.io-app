"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import BlogDeleteModal from "@/components/BlogDeleteModal";
import { useRouter } from "next/navigation";
import { publishBlog } from "@/actions/blog.actions";

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

interface BlogCardItemProps {
  blog: Blog;
}

export default function BlogCardItem({ blog }: BlogCardItemProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    router.refresh();
  };

  const blogId = blog._id || blog.id;
  if (!blogId) {
    return null; // or handle the case where blogId is not available
  }

  return (
    <>
      <Card className="dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col justify-between">
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
        <CardContent className="text-sm text-gray-600 dark:text-gray-400 pt-2 flex-grow">
          <div className="flex flex-wrap gap-1.5 py-5">
            {blog.tags && blog.tags.length > 0 ? (
              blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded"
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
            {blog.updatedAt
              ? new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </p>
        </CardContent>
        <CardFooter className="pt-3 border-t dark:border-slate-700 flex justify-between items-center gap-2">
          <div className="flex-grow">
            {blog.status === "published" ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full dark:text-white dark:border-slate-600 hover:dark:bg-slate-800"
              >
                <Link href={`/blogs/${blogId}`}>
                  <EyeIcon className="mr-2 h-4 w-4" /> View Blog
                </Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="default" size="sm" asChild className="w-full">
                  <Link href={`/dashboard/edit/${blogId}`}>
                    <PencilIcon className="mr-1 h-4 w-4" />
                    Edit Draft
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => publishBlog(blogId)}
                >
                  <ArrowUpFromLine className="mr-1 h-4 w-4" /> Publish
                </Button>
              </div>
            )}
          </div>
          {blogId && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-shrink-0"
              aria-label="Delete blog post"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {blogId && (
        <BlogDeleteModal
          blogId={isDeleteModalOpen ? blogId : null}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}
