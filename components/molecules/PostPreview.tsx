import Link from 'next/link'

type PostPreviewProps = {
  date: string
  title: string
  previewText: string
  postSlug: string
  isFirst?: boolean
}

export const PostPreview = ({
  date,
  title,
  previewText,
  postSlug,
  isFirst,
}: PostPreviewProps) => (
  <>
    <div
      className={`flex flex-col sm:flex-col-reverse ${
        isFirst ? '' : '-sm:mt-9'
      }`}
    >
      <div className="font-mono text-sm md:text-base lg:text-lg">
        {date.replace(/-/g, '.')}
      </div>
      <Link href={`/posts/${postSlug}`}>
        <a className="font-medium md:text-lg lg:text-xl hover:text-sky-400">
          {title}
        </a>
      </Link>
    </div>

    <div className="col-span-2 md:text-lg lg:text-xl">
      <Link href={`/posts/${postSlug}`}>
        <a>
          <span className="hover:text-sky-400">{previewText}</span>{' '}
          <span className="text-sky-400">&#8594;</span>
        </a>
      </Link>
    </div>
  </>
)
