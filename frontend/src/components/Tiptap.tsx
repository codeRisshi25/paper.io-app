'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <h1>Title</h1>
      `,
    editorProps: {
      attributes: {
        class: 'min-h-[80vh] focus:outline-none text-slate-900 font-mono font-normal px-8',
      },
    }
  })
  if (!editor) {
    return null
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>   
  )
}

// You need to import the cn utility at the top of your file
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
