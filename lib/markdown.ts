/**
 * A simple but effective Markdown → HTML parser.
 * Supports: headings, bold, italic, lists, blockquotes, inline code, links, line breaks.
 * Rendered inside a `.prose` container styled in globals.css.
 */

function processInline(text: string): string {
  return (
    text
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`(.+?)`/g, "<code>$1</code>")
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  )
}

export function parseMarkdown(markdown: string): string {
  const lines = markdown.split("\n")
  const result: string[] = []
  let inList = false
  let inParagraph = false

  const closeParagraph = () => {
    if (inParagraph) {
      result.push("</p>")
      inParagraph = false
    }
  }

  const closeList = () => {
    if (inList) {
      result.push("</ul>")
      inList = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = raw.trim()

    // Empty line → close open blocks
    if (line === "") {
      closeParagraph()
      closeList()
      continue
    }

    // H1
    if (line.startsWith("# ")) {
      closeParagraph()
      closeList()
      result.push(`<h1>${processInline(line.slice(2))}</h1>`)
      continue
    }

    // H2
    if (line.startsWith("## ")) {
      closeParagraph()
      closeList()
      result.push(`<h2>${processInline(line.slice(3))}</h2>`)
      continue
    }

    // H3
    if (line.startsWith("### ")) {
      closeParagraph()
      closeList()
      result.push(`<h3>${processInline(line.slice(4))}</h3>`)
      continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      closeParagraph()
      closeList()
      result.push(`<blockquote>${processInline(line.slice(2))}</blockquote>`)
      continue
    }

    // Unordered list item
    if (line.startsWith("- ")) {
      closeParagraph()
      if (!inList) {
        result.push("<ul>")
        inList = true
      }
      result.push(`<li>${processInline(line.slice(2))}</li>`)
      continue
    }

    // Ordered list item
    if (/^\d+\. /.test(line)) {
      closeParagraph()
      if (!inList) {
        result.push('<ol>')
        inList = true
      }
      result.push(`<li>${processInline(line.replace(/^\d+\. /, ""))}</li>`)
      continue
    }

    // Regular paragraph line
    if (!inParagraph) {
      closeList()
      result.push("<p>")
      inParagraph = true
    } else {
      result.push("<br />")
    }
    result.push(processInline(line))
  }

  closeParagraph()
  closeList()

  return result.join("")
}
