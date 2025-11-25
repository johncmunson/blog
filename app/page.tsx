import Link from "next/link";
import { getAllPosts } from "../lib/markdown";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main>
      <h1>John Munson</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <hr />

      <ul>
        {allPosts.map((post) => (
          <li
            key={post.slug}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link href={`/${post.slug}`} style={{ textAlign: "left" }}>
              {post.title}
            </Link>
            <span style={{ textAlign: "right" }}>{post.date}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
