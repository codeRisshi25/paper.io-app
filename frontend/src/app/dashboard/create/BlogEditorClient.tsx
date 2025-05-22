"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorToolbar } from "./EditorToolbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { debounce } from "@/lib/utils";

// This is a Client Component where all the interactivity happens
interface BlogEditorProps {
  initialData: {
    title: string;
    content: string;
  };
}

export function BlogEditorClient({ initialData }: BlogEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData.title);
  const [saving, setSaving] = useState(false);
  const [blogContent, setBlogContent] = useState(initialData.content);

  // Configure the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialData.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setBlogContent(html);
      debouncedAutoSave(title, html);
    },
  });

  // Autosave functionality
  const debouncedAutoSave = useCallback(
    debounce((title, content) => {
      // Save to localStorage for now
      localStorage.setItem(
        "blog-draft",
        JSON.stringify({
          title,
          content,
          lastSaved: new Date().toISOString(),
        })
      );

      console.log("Auto-saved draft");
    }, 2000),
    []
  );

  // Handle save
  const handleSave = async () => {
    if (!title) {
      toast("Title required", {
        description: "Please add a title to your blog post.",
      });
      return;
    }

    setSaving(true);
    try {
      // TODO: Implement actual save to API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call

      toast("Draft saved", {
        description: "Your blog post has been saved as a draft.",
      });

      // Clear localStorage draft after successful save
      localStorage.removeItem("blog-draft");
    } catch (error) {
      toast("Save failed", {
        description: "There was an error saving your draft. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title input */}
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          debouncedAutoSave(e.target.value, blogContent);
        }}
        className="w-full text-3xl font-bold bg-transparent border-none py-4 mb-6 focus:outline-none focus:ring-0 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />

      {/* Editor toolbar and content */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <EditorToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert max-w-none p-4 min-h-[60vh] focus:outline-none"
        />
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 p-4 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="mr-2"
            >
              Cancel
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" disabled={saving}>
              Preview
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              disabled={saving || !title}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              variant="default"
              disabled={saving || !title}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
