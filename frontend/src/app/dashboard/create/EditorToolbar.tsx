'use client';

import { 
    Bold, Italic, Link, List, ListOrdered, Image, Code, Heading1, Heading2, 
    Heading3, Quote, Undo, Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

// Loading fallback component
function ToolbarSkeleton() {
    return (
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 p-2 flex flex-wrap gap-1 items-center">
            <div className="animate-pulse flex flex-wrap gap-1">
                {Array(12).fill(0).map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-md"></div>
                ))}
            </div>
        </div>
    );
}

// Main editor toolbar component
function EditorToolbarContent({ editor }) {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 p-2 flex flex-wrap gap-1 items-center">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Bold className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Italic className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Heading1 className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Heading2 className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Heading3 className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <List className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Quote className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                className={editor.isActive('link') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Link className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    const url = window.prompt('Image URL');
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
            >
                <Image className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-slate-700' : ''}
            >
                <Code className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <Undo className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Export a wrapped version with Suspense
export function EditorToolbar({ editor }) {
    return (
        <Suspense fallback={<ToolbarSkeleton />}>
            <EditorToolbarContent editor={editor} />
        </Suspense>
    );
}