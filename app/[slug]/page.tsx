import Link from "next/link";
import { getPostData, getAllPosts } from "../../lib/markdown";
import { formatDate } from "@/lib/utils";

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
    <main className="font-sans prose prose-h2:text-base prose-h2:font-bold prose-h2:mt-0">
      <Link href="/">{"<<"} back</Link>

      <article className="mt-6">
        <h1 className="font-bold text-xl mb-0">{postData.title}</h1>
        <p className="font-mono text-sm text-gray-600 mt-0">
          {formatDate(postData.date)}
        </p>

        <div className="mt-8">{postData.content}</div>
      </article>
    </main>
  );
}
