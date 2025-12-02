import "@/lib/load-env";
import path from "node:path";
import { promises as fs } from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

const SITE_TITLE = process.env.SITE_TITLE!;
const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION!;
const SITE_URL = process.env.SITE_URL!;

interface PostMeta {
  title: string;
  slug: string;
  date: string;
}

const frontmatterPlugin = () => (_: unknown, file: VFile) => {
  matter(file);
};

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(frontmatterPlugin);

async function readPosts(contentDir: string): Promise<PostMeta[]> {
  const entries = await fs.readdir(contentDir);

  const markdownFiles = entries.filter((name) => name.endsWith(".md"));

  const summaries = await Promise.all(
    markdownFiles.map(async (filename) => {
      const firstDotIndex = filename.indexOf(".");
      if (firstDotIndex === -1) {
        throw new Error(`Invalid filename: ${filename}`);
      }

      const datePart = filename.slice(0, firstDotIndex);
      const slugWithExt = filename.slice(firstDotIndex + 1);
      const slug = slugWithExt.replace(/\.md$/, "");

      const filePath = path.join(contentDir, filename);
      const markdown = await fs.readFile(filePath, "utf8");
      const file = new VFile({ path: filePath, value: markdown });
      const tree = processor.parse(file);
      await processor.run(tree, file);

      const title = (file.data as { matter?: { title?: string } }).matter
        ?.title;
      if (!title) {
        throw new Error(`Missing frontmatter title in ${filename}`);
      }

      return {
        title,
        slug,
        date: datePart,
      };
    })
  );

  return summaries.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
}

function buildRssFeed(posts: PostMeta[]): string {
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;
  const feedUrl = new URL("rss.xml", baseUrl).toString();
  const items = posts
    .map((post) => {
      const postUrl = new URL(post.slug, baseUrl).toString();
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${postUrl}</link>`,
        `      <guid>${postUrl}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    `    <description><![CDATA[${SITE_DESCRIPTION}]]></description>`,
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function writeFeedFile(feed: string, outputPath: string) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, feed, "utf8");
}

async function main() {
  const contentDir = path.join(process.cwd(), "content");
  const posts = await readPosts(contentDir);
  const feed = buildRssFeed(posts);
  const outputPath = path.join(process.cwd(), "public", "rss.xml");
  await writeFeedFile(feed, outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
