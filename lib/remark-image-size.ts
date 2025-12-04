import path from "node:path";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Image as MdastImage } from "mdast";
import type { VFile } from "vfile";

export interface RemarkImageSizeOptions {
  /**
   * Directory used to resolve absolute image paths (e.g. `/foo.png`).
   * Defaults to `<process.cwd()>/public`.
   */
  publicDir?: string;
}

// mdast image node plus the `data.hProperties` shape
type ImageNode = MdastImage & {
  data?: {
    hProperties?: Record<string, unknown>;
    [key: string]: unknown;
  };
};

const EXTERNAL_URL_REGEX = /^https?:\/\//i;

export const remarkImageSize: Plugin<[RemarkImageSizeOptions?], Root> = (
  options = {}
) => {
  const { publicDir = path.join(process.cwd(), "public") } = options;

  return async (tree: Root, file: VFile): Promise<void> => {
    const tasks: Promise<void>[] = [];

    visit(tree, "image", (node) => {
      const imageNode = node as ImageNode;
      const url = decodeURI(imageNode.url);

      // Skip remote / external images altogether.
      if (EXTERNAL_URL_REGEX.test(url)) {
        return;
      }

      let filePath: string;

      if (url.startsWith("/")) {
        // Absolute path, resolve from publicDir
        filePath = path.join(publicDir, url);
      } else {
        // Relative to the markdown file
        if (!file.dirname) {
          throw new Error(
            `[remark-image-size] Found relative image path "${url}" but 'file.dirname' is not set on the VFile.`
          );
        }
        filePath = path.join(file.dirname, url);
      }

      const task = (async () => {
        let width: number | undefined;
        let height: number | undefined;

        try {
          const { imageSizeFromFile } = await import("image-size/fromFile");
          const size = await imageSizeFromFile(filePath);

          width = size.width;
          height = size.height;
        } catch {
          throw new Error(
            `[remark-image-size] Failed to read image size for "${url}" (resolved to "${filePath}")`
          );
        }

        if (width == null || height == null) {
          throw new Error(
            `[remark-image-size] Could not determine width/height for "${url}" (resolved to "${filePath}")`
          );
        }

        if (!imageNode.data) imageNode.data = {};
        if (!imageNode.data.hProperties) imageNode.data.hProperties = {};

        imageNode.data.hProperties.width = String(width);
        imageNode.data.hProperties.height = String(height);
      })();

      tasks.push(task);
    });

    if (tasks.length > 0) {
      await Promise.all(tasks);
    }
  };
};
