import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/markdown"

const SITE_URL = process.env.SITE_URL

if (!SITE_URL) {
  throw new Error("[sitemap] Missing SITE_URL environment variable.")
}

const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date()

  return [
    {
      url: baseUrl,
      lastModified: latestPostDate,
      // Optional sitemap hint telling crawlers how often the referenced URL is likely to change
      changeFrequency: "weekly" as const,
      // Optional sitemap value between 0.0 and 1.0 that hints to search engines how important a
      // URL is relative to other pages on your site, helping them decide crawl order
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
