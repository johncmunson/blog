import Link from "next/link";
import { getPostData, getAllPosts } from "../../lib/markdown";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main>
      <Link href="/">&lt;- back</Link>

      <h1>{postData.title}</h1>
      <p>{postData.date}</p>

      <article>{postData.content}</article>
    </main>
  );
}
