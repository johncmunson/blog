import Link from "next/link";
import { getPostData, getAllPosts } from "../../lib/markdown";
import { formatDate } from "@/lib/utils";
import { DateText } from "@/components/date-text";

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
    <main className="prose-h2:text-base prose-h2:font-bold prose-h2:mt-0">
      <Link href="/" className="text-sm">
        {"<<"} back
      </Link>
      <article className="mt-6">
        <h1 className="font-bold text-xl mt-9 mb-0">{postData.title}</h1>
        <DateText>{formatDate(postData.date)}</DateText>
        <div className="mt-8">{postData.content}</div>
      </article>
    </main>
  );
}
