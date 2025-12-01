import Link from "next/link";
import { getAllPosts } from "../lib/markdown";
import { formatDate } from "@/lib/utils";
import { DateText } from "@/components/date-text";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main className="prose-h1:text-xl prose-h1:font-bold prose-ul:pl-0 prose-li:pl-0">
      <h1>John Munson’s Blog</h1>
      <p>
        Hello there. Welcome to my website. This is where I post very important
        things on extremely serious topics--none of which are likely to improve
        your life in any measurable way.
      </p>
      <p>
        Think of this space as a carefully curated archive of thoughts no one
        asked for, arranged with just enough enthusiasm to suggest purpose
        without actually providing any. If you’re looking for practical advice,
        profound wisdom, or even a mildly useful tip, you may be disappointed.
      </p>

      <hr className="border-gray-500" />

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
