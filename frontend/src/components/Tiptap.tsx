"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./menu-bar";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "./ui/button";
import Link from "next/link";


interface TiptapProps {
  initialContent?: string;
  onSave: (
    content: string,
    title: string,
    tags: string[],
    status: "draft" | "published"
  ) => void;
}

export default function Tiptap({ initialContent = "", onSave }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside pl-4",
          },
        },
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Whats the title?'
          }
          return 'Whats the next big idea?'
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "border border-slate-800 rounded-md dark:bg-slate-300 min-h-[40vh] md:min-h-[80vh] w-full p-4 focus:outline-none text-slate-700 text-lg font-mono font-normal prose prose-sm sm:prose lg:prose-lg lg:px-50 overflow-auto max-h-[80vh] [&_.is-editor-empty]:before:text-black [&_.is-editor-empty]:before:font-medium [&_.is-editor-empty]:before:opacity-80",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const handleSave = (status: "draft" | "published") => {
    if (editor) {
      const htmlContent = editor.getHTML();
      const doc = editor.state.doc;
      let title = "Untitled";
      const extractedTags = new Set<string>();
      let h1Found = false;

      doc.content.forEach(node => {
        if (!h1Found && node.type.name === 'heading' && node.attrs.level === 1) {
          const h1Text = node.textContent.trim();
          if (h1Text.length > 0) {
            title = h1Text;
            h1Found = true;
          }
        }

        // Tag extraction from any node's text content
        const nodeText = node.textContent;
        const tagRegex = /#(\w+)/g; // Matches # followed by word characters
        let match;
        while ((match = tagRegex.exec(nodeText)) !== null) {
          extractedTags.add(match[1]); // Add the captured group (the tag name without #)
        }
      });

      if (!h1Found && doc.content.childCount > 0) {
        const firstNodeText = doc.content.child(0).textContent.trim();
        if (firstNodeText.length > 0) {
          title = firstNodeText;
        }
      }
      
      const tagsArray = Array.from(extractedTags);
      onSave(htmlContent, title, tagsArray, status);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link href="/dashboard">
          <Button
            className="dark:bg-slate-900 hover:dark:bg-slate-800 lg:ml-10"
            variant="outline"
          >
            Back
          </Button>
        </Link>
        <MenuBar editor={editor} />
        <div className="flex gap-2 mr-2">
          <Button
            className="dark:bg-slate-900 hover:dark:bg-slate-800"
            variant="outline"
            onClick={() =>
               handleSave("draft")
              }
          >
            Save Draft
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}