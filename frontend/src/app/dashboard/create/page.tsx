'use client'

import { Suspense } from 'react';
import { EditorSkeleton } from '@/components/ui/editorSkeleton';
import Tiptap from '@/components/Tiptap'; // Corrected import name
import { onSaveBlog } from '@/actions/blog.actions';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();
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
    const res  = await onSaveBlog({ blogData });
    if (res) {
      console.log('Blog saved successfully:', res);
      router.push('/dashboard/blogs'); 
    }
    else {
      console.error('Failed to save blog');
    }
  };
  
  return (
    <div className="flex flex-col min-h-[80vh] dark:bg-slate-100 rounded-t-xl">
        <Suspense fallback={<EditorSkeleton />}>
          <Tiptap initialContent={initialBlogData.content} onSave={handleSaveBlog} />
        </Suspense>
    </div>
  );
}


