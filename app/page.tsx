import Link from "next/link";
import { getAllPosts } from "../lib/markdown";
import { formatDate } from "@/lib/utils";
import { DateText } from "@/components/date-text";
import { RssIcon } from "@/components/rss-icon";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main className="prose-ul:pl-0 prose-li:pl-0">
      <div className="not-prose flex items-center">
        <h1 className="text-xl font-bold">{process.env.SITE_TITLE}</h1>
        <Link href="/rss.xml" aria-label="RSS feed">
          <RssIcon className="size-5 ml-2.5" />
        </Link>
      </div>

      <p className="mt-7">
        Hello there. Think of this space as a carefully curated archive of
        thoughts no one asked for, arranged with just enough enthusiasm to
        suggest purpose without actually providing any. If you’re looking for
        practical advice, profound wisdom, or even a mildly useful tip, you may
        be disappointed.
      </p>

      <hr />

      <ul>
        {allPosts.map((post) => (
          <li
            key={post.slug}
            className="flex items-center justify-between w-full"
          >
            <Link href={`/${post.slug}`} className="truncate">
              {post.title}
            </Link>
            <DateText className="shrink-0 ml-8">
              {formatDate(post.date)}
            </DateText>
          </li>
        ))}
      </ul>
    </main>
  );
}
