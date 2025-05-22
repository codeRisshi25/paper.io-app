"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./menu-bar";
import Placeholder from "@tiptap/extension-placeholder";

export default function Tiptap() {
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
        placeholder: "Whats the next big idea?",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
        `,
    editorProps: {
      attributes: {
        class:
          "border border-slate-800 rounded-md dark:bg-slate-300 min-h-[40vh] md:min-h-[80vh] w-full p-4 focus:outline-none text-slate-700 text-lg font-mono font-normal prose prose-sm sm:prose lg:prose-lg lg:px-50 overflow-auto max-h-[80vh]",
      },
    },
  });
  if (!editor) {
    return null;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

// You need to import the cn utility at the top of your file
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
