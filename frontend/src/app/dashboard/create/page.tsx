"use client";

import { Suspense, useEffect, useState } from "react";
import { EditorSkeleton } from "@/components/ui/editorSkeleton";
import Tiptap from "@/components/Tiptap"; // Corrected import name
import { getUserBlog, onSaveBlog } from "@/actions/blog.actions";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryBlogId = searchParams.get("blogId");

  const [blogId, setBlogId] = useState<string | null>(queryBlogId);

  const [initialBlogData, setInitialBlogData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    status: "draft" as "draft" | "published",
  });
  const [isLoading, setIsLoading] = useState(!!queryBlogId);

  useEffect(() => {
    async function fetchBlog() {
      if (queryBlogId) {
        try {
          setIsLoading(true);
          const blog = await getUserBlog(queryBlogId);
          setInitialBlogData({
            title: blog.title || "",
            content: blog.content || "",
            tags: blog.tags || [],
            status: blog.status || "draft",
          });
        } catch (err) {
          console.error("Failed to fetch blog data:", err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchBlog();
  }, [queryBlogId]);

  const handleSaveBlog = async (
    content: string,
    title: string,
    tags: string[],
    status: "draft" | "published"
  ) => {
    const blogData = {
      ...(blogId ? { _id: blogId } : {}),
      title: title,
      content: content,
      tags: tags,
      status: status,
    };
    try {
      const result = await onSaveBlog({ blogData });
      if (result) {
        console.log("Blog saved successfully:", result.message);

        // Store the blog ID from the response for future saves
        if (!blogId && result.blogId) {
          setBlogId(result.blogId);
          window.history.replaceState(
            {},
            "",
            `/dashboard/create?blogId=${result.blogId}`
          );
        }

        if (status === "published") {
          router.push("/dashboard/blogs");
        }
      } else {
        console.error("Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  if (isLoading) {
    return <EditorSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-[80vh] dark:bg-slate-100 rounded-t-xl">
      <Suspense fallback={<EditorSkeleton />}>
        <Tiptap
          initialContent={initialBlogData.content}
          onSave={handleSaveBlog}
        />
      </Suspense>
    </div>
  );
}
