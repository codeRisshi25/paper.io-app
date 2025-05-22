"use client";

import { useState, useEffect, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorToolbar } from "./EditorToolbar"; // Assuming this component adapts
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { debounce } from "@/lib/utils";
import { X, Save, Send, Eye, ArrowLeft } from "lucide-react"; // Adjusted icons

interface BlogEditorProps {
    initialData: {
        title: string;
        content: string;
        tags?: string[];
    };
}

export function BlogEditorClient({ initialData }: BlogEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData.title);
    const [saving, setSaving] = useState(false);
    const [blogContent, setBlogContent] = useState(initialData.content);
    const [tags, setTags] = useState<string[]>(initialData.tags || []);
    const [tagInput, setTagInput] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                 heading: { levels: [1, 2, 3, 4] }, // Keep H1 for title-like headings within content
                 blockquote: { HTMLAttributes: { class: 'border-l-4 border-slate-500' } },
                 codeBlock: { HTMLAttributes: { class: 'bg-slate-200 dark:bg-slate-600 rounded-md' } },
            }),
            Placeholder.configure({
                placeholder: "Write your masterpiece...",
            }),
            Image,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: { class: 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline' },
            }),
        ],
        content: initialData.content,
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert prose-sm sm:prose-base lg:prose-lg focus:outline-none max-w-full p-4',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setBlogContent(html);
            debouncedAutoSave(title, html, tags);
        },
    });

    const debouncedAutoSave = useCallback(
        debounce((currentTitle: string, currentContent: string, currentTags: string[]) => {
            localStorage.setItem(
                "blog-draft",
                JSON.stringify({
                    title: currentTitle,
                    content: currentContent,
                    tags: currentTags,
                    lastSaved: new Date().toISOString(),
                })
            );
            // Subtle autosave notification if desired, but often not needed for minimalism
            // console.log("Auto-saved draft at", new Date().toLocaleTimeString());
        }, 2000),
        []
    );
    
    useEffect(() => {
        if (editor && initialData.content !== editor.getHTML()) {
            editor.commands.setContent(initialData.content, false);
            setBlogContent(initialData.content);
        }
        if (initialData.title !== title) {
            setTitle(initialData.title);
        }
        if (JSON.stringify(initialData.tags || []) !== JSON.stringify(tags)) {
            setTags(initialData.tags || []);
        }
    }, [initialData, editor, title, tags]); // Added title and tags for completeness

    useEffect(() => {
        const savedDraft = localStorage.getItem("blog-draft");
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            const isDifferentPost = initialData.title && initialData.title !== draft.title && initialData.content !== draft.content;

            if (!isDifferentPost || (!initialData.title && !initialData.content)) { // Load if it's for a new post or same post
                toast("Local draft restored.", {
                    description: "Your previously unsaved changes have been loaded.",
                    action: {
                        label: "Clear & Use Server Data",
                        onClick: () => {
                            localStorage.removeItem("blog-draft");
                            setTitle(initialData.title);
                            editor?.commands.setContent(initialData.content, false);
                            setTags(initialData.tags || []);
                            toast.info("Local draft cleared. Showing server data.");
                        }
                    }
                });
                setTitle(draft.title || initialData.title);
                if (editor) {
                     editor.commands.setContent(draft.content || initialData.content, false);
                }
                setTags(draft.tags || initialData.tags || []);
            } else {
                // If it's clearly a draft for a *different* post, might not want to load it, or offer choice.
                // For now, we assume if initialData is present and different, it's a new context.
            }
        }
    }, [editor, initialData]);


    const handleSave = async (isPublishing = false) => {
        if (!title.trim()) {
            toast.error("Title is required", {
                description: `Please provide a title before ${isPublishing ? 'publishing' : 'saving'}.`,
            });
            return;
        }
        if (!editor || editor.isEmpty) {
            toast.error("Content cannot be empty", {
                description: `Please write some content before ${isPublishing ? 'publishing' : 'saving'}.`,
            });
            return;
        }

        setSaving(true);
        try {
            // TODO: Implement actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
            
            const action = isPublishing ? "published" : "saved as draft";
            toast.success(`Post ${action}!`, {
                description: `Your blog post has been successfully ${action}.`,
            });
            localStorage.removeItem("blog-draft");
            if (isPublishing) {
                 // router.push(`/blog/${slug}`); // Or similar
            }
        } catch (error) {
            toast.error("Operation failed", {
                description: `Could not ${isPublishing ? 'publish' : 'save'} the post. Please try again.`,
            });
        } finally {
            setSaving(false);
        }
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            if (newTag && !tags.includes(newTag) && tags.length < 7) { // Max 7 tags
                const newTags = [...tags, newTag];
                setTags(newTags);
                debouncedAutoSave(title, blogContent, newTags); // Autosave on tag change
            } else if (tags.length >= 7) {
                toast.info("Tag limit reached (max 7).");
            }
            setTagInput(""); // Clear input regardless
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        debouncedAutoSave(title, blogContent, newTags); // Autosave on tag change
    };
    
    if (!editor) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Initializing Editor...
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200">
            {/* Main scrolling content area */}
            <div className="flex-grow overflow-y-auto">
                <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-6 md:space-y-8">
                    {/* Title input */}
                    <input
                        type="text"
                        placeholder="Blog Title..."
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            debouncedAutoSave(e.target.value, blogContent, tags);
                        }}
                        className="w-full text-3xl md:text-4xl font-semibold bg-transparent focus:outline-none placeholder-slate-400 dark:placeholder-slate-500"
                        aria-label="Blog Title"
                    />

                    {/* Tags input section */}
                    <div className="space-y-2">
                        <label htmlFor="tags-input" className="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            Tags
                        </label>
                        <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="bg-slate-500 text-slate-50 px-2.5 py-1 rounded-sm flex items-center text-sm group"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity text-slate-200 hover:text-white"
                                        aria-label={`Remove tag ${tag}`}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <input
                                id="tags-input"
                                type="text"
                                placeholder={tags.length === 0 ? "Add tags..." : "Add..."}
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                className="flex-grow p-1 bg-transparent focus:outline-none text-sm placeholder-slate-400 dark:placeholder-slate-500"
                                disabled={tags.length >= 7}
                            />
                        </div>
                         {tags.length >= 7 && <p className="text-xs text-slate-500 dark:text-slate-400">Maximum 7 tags allowed.</p>}
                    </div>

                    {/* Editor toolbar and content */}
                    <div className="bg-white dark:bg-slate-700 rounded-md shadow-sm border border-slate-200 dark:border-slate-600/50">
                        <EditorToolbar editor={editor} /> {/* Ensure toolbar bg matches or contrasts this */}
                        <div className="min-h-[40vh] editor-content-area"> {/* Ensure there's enough space */}
                             <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col space-y-3">
                <Button
                    variant="outline"
                    size="sm" // Smaller buttons for FAB
                    onClick={() => router.push("/dashboard")} // Adjust route as needed
                    disabled={saving}
                    className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 shadow-md"
                    title="Back to Dashboard"
                >
                    <ArrowLeft size={16} />
                    <span className="sr-only">Cancel / Back to Dashboard</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { /* TODO: Implement Preview */ toast.info("Preview functionality not yet implemented.")}}
                    disabled={saving}
                    className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 shadow-md"
                    title="Preview Post"
                >
                    <Eye size={16} />
                     <span className="sr-only">Preview</span>
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSave(false)}
                    disabled={saving || !title.trim()}
                    className="bg-slate-600 hover:bg-slate-500 text-slate-50 dark:bg-slate-400 dark:hover:bg-slate-300 dark:text-slate-800 shadow-md"
                    title="Save Draft"
                >
                    <Save size={16} />
                     <span className="sr-only">Save Draft</span>
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSave(true)} // True for publishing
                    disabled={saving || !title.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md" // Retained blue for primary "publish" action
                    title="Publish Post"
                >
                    <Send size={16} />
                     <span className="sr-only">Publish</span>
                </Button>
            </div>
        </div>
    );
}