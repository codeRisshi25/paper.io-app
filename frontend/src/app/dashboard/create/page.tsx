import { Suspense } from 'react';
import { EditorSkeleton } from '@/components/ui/editorSkeleton';
import { BlogEditorClient } from './BlogEditorClient';

export default function CreateBlogPage() {
  // Generate any server-side data here (empty template, user info, etc.)
  const initialBlogData = {
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  };
  
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900 md:p-0 rounded-t-xl">
      <main className="flex-1 px-4 sm:px-6 md:px-8 pt-6 pb-24">
        <Suspense fallback={<EditorSkeleton />}>
          <BlogEditorClient initialData={initialBlogData} />
        </Suspense>
      </main>
    </div>
  );
}