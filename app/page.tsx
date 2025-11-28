import Link from "next/link";
import { getAllPosts } from "../lib/markdown";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main>
      <h1 className="font-bold text-xl">John Munson’s Blog</h1>
      <p className="mt-6">
        Hello there. Welcome to my website. This is where I post very important
        things on extremely serious topics--none of which are likely to improve
        your life in any measurable way.
      </p>
      <p className="mt-3">
        Think of this space as a carefully curated archive of thoughts no one
        asked for, arranged with just enough enthusiasm to suggest purpose
        without actually providing any. If you’re looking for practical advice,
        profound wisdom, or even a mildly useful tip, you may be disappointed.
      </p>

      <hr className="mt-8" />

      <ul className="mt-6">
        {allPosts.map((post) => (
          <li
            key={post.slug}
            className="flex items-center justify-between w-full"
          >
            <Link href={`/${post.slug}`} className="truncate max-w-full">
              {post.title}
            </Link>
            <span className="shrink-0 ml-8 font-mono text-sm text-gray-600">
              {formatDate(post.date)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
