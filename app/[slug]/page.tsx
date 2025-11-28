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
    <main>
      <Link href="/">{"<<"} back</Link>

      <h1 className="mt-6 font-bold text-xl">{postData.title}</h1>
      <p className="font-mono text-sm text-gray-600">
        {formatDate(postData.date)}
      </p>

      <article className="mt-6">{postData.content}</article>
    </main>
  );
}
