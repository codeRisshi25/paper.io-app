import { Suspense } from 'react';
import { EditorSkeleton } from '@/components/ui/editorSkeleton';
import  Tiptap  from '@/components/Tiptap';

export default function CreateBlogPage() {
  // Generate any server-side data here (empty template, user info, etc.)
  const initialBlogData = {
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  };
  
  return (
    <div className="flex flex-col min-h-[80vh] dark:bg-slate-100 rounded-t-xl">
        <Suspense fallback={<EditorSkeleton />}>
          <Tiptap />
        </Suspense>
    </div>
  );
}