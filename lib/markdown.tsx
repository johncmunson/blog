import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { jsx, jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { type VFile } from "vfile";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import { remarkImageSize } from "./remark-image-size";

const contentDirectory = path.join(process.cwd(), "content");
const filenames = fs.readdirSync(contentDirectory);

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children, ...rest } = props;

  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

const MarkdownImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { src, alt = "", width, height, ...rest } = props;

  if (typeof src !== "string" || src.length === 0) {
    throw new Error("[markdown] Missing image src while rendering markdown.");
  }

  const parsedWidth =
    typeof width === "number"
      ? width
      : Number.parseInt(String(width ?? ""), 10);
  const parsedHeight =
    typeof height === "number"
      ? height
      : Number.parseInt(String(height ?? ""), 10);

  if (!Number.isFinite(parsedWidth) || !Number.isFinite(parsedHeight)) {
    throw new Error(
      `[markdown] Missing image dimensions for "${src}". Did remark-image-size run?`
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={parsedWidth}
      height={parsedHeight}
      {...rest}
    />
  );
};

const production = { Fragment, jsx, jsxs };

interface PostData {
  slug: string;
  date: string;
  title: string;
  content: React.ReactNode;
}

export async function getPostData(slug: string): Promise<PostData> {
  const filename = filenames.find((fn) => fn.endsWith(`.${slug}.md`));

  if (!filename) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const date = filename.split(".")[0];

  const fullPath = path.join(contentDirectory, filename);

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (_: unknown, file: VFile) => {
      matter(file);
    })
    .use(remarkImageSize)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        // light: "one-light",
        // dark: "one-dark-pro",
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeReact, {
      ...production,
      components: {
        a: CustomLink,
        img: MarkdownImage,
      },
    })
    .process(await read(fullPath));

  const title = file.data.matter.title;

  return {
    slug,
    date,
    title,
    content: file.result as React.ReactNode,
  };
}

export async function getAllPosts() {
  const allPostsData = await Promise.all(
    filenames.map(async (filename) => {
      const date = filename.split(".")[0];
      const slug = filename.split(".")[1];

      const fullPath = path.join(contentDirectory, filename);

      const file = await read(fullPath);
      matter(file);
      // @ts-expect-error - not a good way to type matter
      const title = file.data.matter.title;

      return {
        slug,
        title,
        date,
      };
    })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
