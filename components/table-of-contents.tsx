import type { TableOfContentsItem } from "@/lib/markdown"
import { cn } from "@/lib/utils"

type TableOfContentsProps = {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <aside className="not-prose hidden border-l border-gray-200 pl-4 text-sm dark:border-gray-800 lg:sticky lg:top-4 lg:mt-16 lg:block lg:max-h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
      <nav aria-label="Table of contents">
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          On this page
        </h2>
        <ol className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-gray-600 no-underline transition-colors hover:text-foreground dark:text-gray-400 dark:hover:text-foreground",
                  item.depth > 2 && "pl-3",
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
