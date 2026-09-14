"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { ContentImageField } from "@/components/admin/content-image-field"
import type { BlockDef, FieldDef, ListFieldDef } from "@/lib/content"

function TextField({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: string
  onChange: (v: string) => void
}) {
  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-[13px] font-medium text-ink-soft">{field.label}</label>
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
        />
      </div>
    )
  }
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink-soft">{field.label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
      />
    </div>
  )
}

function ListField({
  field,
  items,
  pathPrefix,
  onChange,
}: {
  field: ListFieldDef
  items: Record<string, any>[]
  pathPrefix: string
  onChange: (items: Record<string, any>[]) => void
}) {
  function updateItem(index: number, key: string, value: string) {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    onChange(next)
  }

  function addItem() {
    const blank = Object.fromEntries(field.itemFields.map((f) => [f.key, ""]))
    onChange([...items, blank])
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-ink-soft">{field.label}</label>
      <div className="mt-2 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-line bg-mist p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-ink-faint">
                {field.itemLabel} {index + 1}
              </p>
              <div className="flex items-center gap-3 text-[12px]">
                <button type="button" onClick={() => moveItem(index, -1)} className="text-ink-soft hover:text-ink">
                  Up
                </button>
                <button type="button" onClick={() => moveItem(index, 1)} className="text-ink-soft hover:text-ink">
                  Down
                </button>
                <button type="button" onClick={() => removeItem(index)} className="font-medium text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              {field.itemFields.map((itemField) =>
                itemField.type === "image" ? (
                  <ContentImageField
                    key={itemField.key}
                    label={itemField.label}
                    value={item[itemField.key] ?? ""}
                    pathPrefix={pathPrefix}
                    onChange={(url) => updateItem(index, itemField.key, url)}
                  />
                ) : (
                  <TextField
                    key={itemField.key}
                    field={itemField}
                    value={item[itemField.key] ?? ""}
                    onChange={(v) => updateItem(index, itemField.key, v)}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-3 text-[13px] font-medium text-ink hover:underline"
      >
        + Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  )
}

export function ContentEditor({ def, initialData }: { def: BlockDef; initialData: Record<string, any> }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const pathPrefix = `${def.page}/${def.blockKey}`

  function setField(key: string, value: any) {
    setSaved(false)
    setData((current) => ({ ...current, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    const supabase = createClient()
    const { error: saveError } = await supabase
      .from("site_content")
      .upsert({ page: def.page, block_key: def.blockKey, data }, { onConflict: "page,block_key" })
    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    setSaved(true)
    router.refresh()
  }

  return (
    <div>
      <Link href="/admin/content" className="text-[13px] text-ink-faint hover:text-ink">
        ← All content
      </Link>
      <h1 className="display-md mt-2 text-ink">{def.label}</h1>

      <div className="mt-6 max-w-[640px] space-y-5">
        {def.fields.map((field) =>
          field.type === "list" ? (
            <ListField
              key={field.key}
              field={field}
              items={data[field.key] ?? []}
              pathPrefix={pathPrefix}
              onChange={(items) => setField(field.key, items)}
            />
          ) : field.type === "image" ? (
            <ContentImageField
              key={field.key}
              label={field.label}
              value={data[field.key] ?? ""}
              pathPrefix={pathPrefix}
              onChange={(url) => setField(field.key, url)}
            />
          ) : (
            <TextField
              key={field.key}
              field={field}
              value={data[field.key] ?? ""}
              onChange={(v) => setField(field.key, v)}
            />
          ),
        )}

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <button type="button" onClick={handleSave} disabled={saving} className="btn btn-dark">
            {saving ? "Saving…" : "Save"}
          </button>
          {saved && <span className="text-[13px] text-emerald-600">Saved</span>}
        </div>
      </div>
    </div>
  )
}
