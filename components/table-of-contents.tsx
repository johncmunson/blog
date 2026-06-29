import Link from "next/link"
import type { TableOfContentsItem } from "@/lib/markdown"

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <aside
      className="not-prose absolute inset-y-0 left-[calc(100%+2rem)] hidden w-56 lg:block"
      aria-label="Table of contents"
    >
      <nav className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto text-sm leading-6 text-neutral-600 dark:text-neutral-400">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
          Contents
        </h2>
        <ol className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                paddingLeft: `${Math.max(item.depth - 2, 0) * 0.75}rem`,
              }}
            >
              <Link
                href={`#${item.id}`}
                className="block [overflow-wrap:anywhere] hover:text-neutral-950 dark:hover:text-neutral-50"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
