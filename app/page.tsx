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
        I write code, play soccer, drink more coffee than recommended, and
        generally follow my ADHD-powered curiosity into far too many side
        quests. Always learning, always tinkering. My blog collects the things
        I’ve built, explored, or gotten distracted by. Dive in, but don’t expect
        much of a straight line or common thread.
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
