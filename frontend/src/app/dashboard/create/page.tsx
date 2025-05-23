'use client'

import { Suspense } from 'react';
import { EditorSkeleton } from '@/components/ui/editorSkeleton';
import Tiptap from '@/components/Tiptap'; // Corrected import name

export default function CreateBlogPage() {
  const initialBlogData = {
    title: '',
    content: '', 
    tags: [],
    status: 'draft'
  };

  const handleSaveBlog = async (content: string, title: string, tags: string[], status: 'draft' | 'published') => {
    const blogData = {
      title: title,
      content: content,
      tags: tags, 
      status: status,
    };
    console.log("Blog data to save:", blogData);
  };
  
  return (
    <div className="flex flex-col min-h-[80vh] dark:bg-slate-100 rounded-t-xl">
        <Suspense fallback={<EditorSkeleton />}>
          <Tiptap initialContent={initialBlogData.content} onSave={handleSaveBlog} />
        </Suspense>
    </div>
  );
}


