'use client';

import { 
    Bold, Italic, Link, List, ListOrdered, Code, Heading1, Heading2, 
    Heading3, Quote, Undo, Redo, Strikethrough, Pilcrow, Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { Editor } from '@tiptap/react'; // Import Editor type for better type safety

// Loading fallback component
function ToolbarSkeleton() {
    return (
        <div className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-2">
            <div className="animate-pulse flex flex-wrap gap-1 items-center">
                {/* Adjust count based on the number of buttons */}
                {Array(15).fill(0).map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-gray-300 dark:bg-slate-700 rounded-md"></div>
                ))}
            </div>
        </div>
    );
}

interface EditorToolbarContentProps {
    editor: Editor | null; // Use the Editor type from Tiptap
}

// Main editor toolbar component
function EditorToolbarContent({ editor }: EditorToolbarContentProps) {
    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        isActive,
        disabled,
        children,
        title
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
        title?: string;
    }) => (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={isActive ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-50' : 'text-slate-600 dark:text-slate-300'}
            title={title}
            aria-label={title}
        >
            {children}
        </Button>
    );
    
    const Separator = () => <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1.5" />;

    return (
        <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 flex flex-wrap gap-0.5 items-center">
            {/* History Group */}
            <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <Redo className="h-4 w-4" />
            </ToolbarButton>

            <Separator />

            {/* Text Formatting Group */}
            <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
                <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                title="Link"
                onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl);
                    if (url === null) return; // User cancelled
                    if (url === '') { // User wants to remove link
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                isActive={editor.isActive('link')}
            >
                <Link className="h-4 w-4" />
            </ToolbarButton>

            <Separator />

            {/* Heading Group */}
            <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
                <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
                <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
                <Heading3 className="h-4 w-4" />
            </ToolbarButton>
             <ToolbarButton title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')}>
                <Pilcrow className="h-4 w-4" />
            </ToolbarButton>

            <Separator />

            {/* Block Types Group */}
            <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
                <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
                <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
                <Code className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Minus className="h-4 w-4" />
            </ToolbarButton>
        </div>
    );
}

// Export a wrapped version with Suspense
export function EditorToolbar({ editor }: { editor: Editor | null }) { // Use Editor type
    return (
        <Suspense fallback={<ToolbarSkeleton />}>
            <EditorToolbarContent editor={editor} />
        </Suspense>
    );
}