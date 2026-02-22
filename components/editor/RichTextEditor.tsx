"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import { useRef, useCallback } from "react"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  ImagePlus,
  Upload,
  Undo,
  Redo,
  Minus,
  Type,
  Unlink,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
        active
          ? "bg-primary text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-primary"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-6 bg-slate-200 mx-1 flex-shrink-0" />
}

export default function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = [false, () => {}]

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-secondary underline cursor-pointer" },
      }),
      Image.configure({
        HTMLAttributes: { class: "max-w-full rounded-xl my-4 shadow-md" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass: "tiptap-placeholder",
      }),
    ],
    content,
    editorProps: {
      attributes: { class: "tiptap-editor focus:outline-none" },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href || ""
    const url = window.prompt("Enter URL:", prev)
    if (url === null) return // cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    const href = url.startsWith("http") ? url : `https://${url}`
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run()
  }, [editor])

  const insertImageFromUrl = useCallback(() => {
    if (!editor) return
    const url = window.prompt("Enter image URL:")
    if (!url) return
    editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !editor) return

      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        if (!res.ok) {
          const err = await res.json()
          alert(`Upload failed: ${err.error}`)
          return
        }
        const { src } = await res.json()
        editor.chain().focus().setImage({ src }).run()
      } catch {
        alert("Upload failed. Please try again.")
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    },
    [editor]
  )

  const currentHeadingLevel = editor?.isActive("heading", { level: 1 })
    ? "h1"
    : editor?.isActive("heading", { level: 2 })
    ? "h2"
    : editor?.isActive("heading", { level: 3 })
    ? "h3"
    : "p"

  function setHeading(value: string) {
    if (!editor) return
    if (value === "p") editor.chain().focus().setParagraph().run()
    else editor.chain().focus().toggleHeading({ level: parseInt(value[1]) as 1 | 2 | 3 }).run()
  }

  if (!editor) return null

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* ── Toolbar ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-3 py-2 flex items-center gap-0.5 flex-wrap overflow-x-auto sticky top-0 z-10">

        {/* Heading selector */}
        <select
          value={currentHeadingLevel}
          onChange={(e) => setHeading(e.target.value)}
          className="text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer hover:border-slate-300 transition-colors mr-1"
          title="Text style"
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <Divider />

        {/* Inline formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Block elements */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block">
          <Code2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Text alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert / edit link">
          <Link2 className="w-4 h-4" />
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link">
            <Unlink className="w-4 h-4" />
          </ToolbarButton>
        )}

        {/* Image from URL */}
        <ToolbarButton onClick={insertImageFromUrl} title="Insert image from URL">
          <ImagePlus className="w-4 h-4" />
        </ToolbarButton>

        {/* Image upload */}
        <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Upload image">
          <Upload className="w-4 h-4" />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <Divider />

        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Shift+Z)">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* ── Editor Canvas ── */}
      <EditorContent editor={editor} className="min-h-[480px]" />

      {/* ── Footer: word count ── */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Tip: Select text before clicking Bold/Italic/Link to apply formatting to selected text.
        </p>
        <p className="text-xs text-slate-400 font-bold">
          {editor.storage.characterCount?.words?.() ?? editor.getText().split(/\s+/).filter(Boolean).length} words
        </p>
      </div>
    </div>
  )
}
