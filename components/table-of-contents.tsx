import type { PostHeading } from "@/lib/markdown"

type TableOfContentsProps = {
  headings: PostHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) {
    return null
  }

  const minDepth = Math.min(...headings.map((heading) => heading.depth))

  return (
    <aside
      aria-label="Table of contents"
      className="not-prose absolute left-[calc(100%+6rem)] top-0 hidden h-full w-64 lg:block"
    >
      <div className="sticky top-5 max-h-[calc(100vh-3rem)] overflow-y-auto border-l border-gray-200 pl-6 text-sm dark:border-gray-800">
        <div className="mb-3 text-base font-semibold uppercase tracking-wider [font-variant-caps:all-small-caps]">
          ON THIS PAGE
        </div>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft: `${Math.max(heading.depth - minDepth, 0) * 0.75}rem`,
              }}
            >
              <a
                href={`#${heading.id}`}
                className="block leading-snug text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-50"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
