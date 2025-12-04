/**
 * vfile-augment.d.ts
 *
 * Why does this file exist?
 * -------------------------
 *
 * We use the unified/remark/rehype toolchain. In that ecosystem, transformers
 * receive a `VFile` instance (from the `vfile` package) as the second argument:
 *
 *   (tree: Root, file: VFile) => { ... }
 *
 * At runtime, `VFile` has several path-related properties that are *not*
 * declared in its TypeScript type definitions, including:
 *
 *   - `path`
 *   - `dirname`
 *   - `basename`
 *   - `extname`
 *   - `stem`
 *
 * You can see this in the VFile implementation:
 * - `dirname` is defined as a getter that derives from `this.path`.
 * - When `this.path` is a string, `dirname` returns the parent directory.
 * - When `this.path` is not set, `dirname` returns `undefined`.
 *
 * Our code (for example, `remark-image-size`) legitimately uses `file.dirname`
 * to resolve relative image paths and checks for missing `dirname`:
 *
 *   return async (tree: Root, file: VFile) => {
 *     if (!file.dirname) {
 *       throw new Error("... 'file.dirname' is not set ...")
 *     }
 *     const filePath = path.join(file.dirname, url)
 *     ...
 *   }
 *
 * This is correct at runtime, but without any augmentation TypeScript sees the
 * official `VFile` type, which does *not* declare `dirname`, and will (correctly)
 * report:
 *
 *   Property 'dirname' does not exist on type 'VFile'.
 *
 * There are a few ways to silence that error:
 *
 *   - Cast `file` to `any` or to a custom interface like `VFileWithDirname`.
 *   - Add `// @ts-ignore` or `// @ts-expect-error` above the offending lines.
 *   - Loosen the transformer signature to `(tree: any, file: any) => { ... }`.
 *
 * All of those approaches throw away useful type information or introduce
 * "fake" types that do not accurately describe the actual `VFile` objects used
 * throughout the codebase.
 *
 * Instead, this file uses **module augmentation** to tell TypeScript the truth
 * about `VFile`:
 *
 *   - At runtime, `VFile` does have a `dirname` accessor.
 *   - That accessor may return `undefined` when `path` is not set.
 *
 * By augmenting the `vfile` module, we:
 *
 *   - Keep plugin signatures accurate: `(tree: Root, file: VFile)` remains the
 *     correct type for unified transformers.
 *   - Avoid local wrapper types like `VFileWithDirname` that diverge from the
 *     real `VFile`.
 *   - Avoid `@ts-ignore` / `@ts-expect-error` for every use of `file.dirname`.
 *   - Centralize the "runtime vs. type" reconciliation in a single, well-documented place.
 *
 * In short:
 *
 *   - vfile's JavaScript implementation has more properties than its published
 *     TypeScript type definitions.
 *   - Our code legitimately relies on `file.dirname`.
 *   - This file is the one place where we extend the `VFile` type so that it
 *     matches the behavior of the actual `VFile` instances we receive at runtime.
 *
 * If you remove this file, you will most likely start seeing:
 *
 *   "Property 'dirname' does not exist on type 'VFile'"
 *
 * in any plugin or utility that touches `file.dirname`.
 */

import "vfile";

declare module "vfile" {
  interface VFile {
    /**
     * Directory part of this file's path.
     *
     * This is derived from `file.path` (see the VFile JS implementation):
     *
     *   - If `file.path` is a string, `dirname` is the parent directory.
     *   - If `file.path` is not set, `dirname` is `undefined`.
     *
     * Our remark/rehype plugins use this to resolve image paths and other
     * file-relative resources.
     */
    dirname?: string;
  }
}
