import Link from 'next/link'

type PostPreviewProps = {
  date: string
  title: string
  previewText: string
  postSlug: string
}

export const PostPreview = ({
  date,
  title,
  previewText,
  postSlug,
}: PostPreviewProps) => (
  <>
    <div className="font-mono text-sm">{date.replace(/-/g, '.')}</div>
    <div>
      <Link href={`/posts/${postSlug}`}>
        <a className="font-medium">{title}</a>
      </Link>
    </div>
    <div>
      <Link href={`/posts/${postSlug}`}>
        <a>
          {previewText} <span className="text-sky-400">&#8594;</span>
        </a>
      </Link>
    </div>
  </>
)
