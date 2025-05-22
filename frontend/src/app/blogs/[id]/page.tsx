// app/blogs/[id]/page.tsx
import { getBlogById } from "@/actions/blog.actions";
import { notFound } from "next/navigation";
import { TopNavigation } from "@/app/dashboard/create/TopNavigation";

export default async function PublicBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || blog.status !== "published") {
    return notFound();
  }
return (
    <div className="flex flex-col h-screen dark:bg-slate-100 text-black">
        <TopNavigation />
        <article className="max-w-3xl mx-auto py-4 md:py-8 px-4 md:px-0">
            <div className="flex items-center mb-3 md:mb-4">
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-2">
                        {blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 md:px-3 bg-gray-200 dark:bg-slate-300 text-xs md:text-sm dark:text-slate-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 dark:text-slate-800">
                {blog.title}
            </h1>
            {blog.author && (
                <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold mr-2 md:mr-3">
                        {(blog.author.name?.charAt(0) || "A").toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-medium dark:text-slate-800">
                            {typeof blog.author === "object"
                                ? blog.author.name || "Author"
                                : blog.author}
                        </h3>
                        {blog.createdAt && (
                            <p className="text-xs md:text-sm text-gray-600 dark:text-slate-600">
                                Published on {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            )}
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-dark" dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
        </article>
    </div>
);
}
