# AGENTS.md

## Cursor Cloud specific instructions

This is a personal blog built with Next.js 16 (App Router, Turbopack) + React 19, written in
TypeScript and styled with Tailwind v4. Content is plain Markdown in `content/` (`YYYY-MM-DD.slug.md`,
or `DRAFT.slug.md` for drafts). There is no database or backend service — it is effectively a
static site. Package manager is `pnpm` (see `packageManager` in `package.json`). Standard
commands live in `package.json` scripts (`dev`, `dev:watch`, `build`, `start`, `lint`, `typecheck`,
`format`).

Non-obvious caveats:

- **Required env vars (the app 500s without them).** `app/layout.tsx` calls
  `new URL(process.env.SITE_URL!)` at module load, so the site throws `ERR_INVALID_URL` on every
  page if `SITE_URL` is unset. The vars are `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`,
  `SITE_AUTHOR`, `SITE_AUTHOR_TWITTER_ID`. In Cursor Cloud these are provided as injected secrets,
  so no setup is needed — just confirm they're present (`echo $SITE_URL`). If they are ever missing
  (e.g. running outside Cloud), create a local `.env.local` at the repo root instead (`.env*` is
  gitignored and not committed; real production values live in Vercel):

  ```
  SITE_URL=http://localhost:3000
  SITE_TITLE=John Munson's Blog
  SITE_DESCRIPTION=A technical blog about software engineering, AI, and developer tooling.
  SITE_AUTHOR=John Munson
  SITE_AUTHOR_TWITTER_ID=curtismunson
  ```

- **tmux + injected secrets gotcha.** The `tmux` server captures its environment when it first
  starts. If you add/change secrets after a tmux server is already running, new sessions will NOT
  see them and the dev server will 500 on `SITE_URL`. Run `tmux -f /exec-daemon/tmux.portal.conf
  kill-server` and start a fresh session so it inherits the current environment.

- **Use `pnpm dev:watch`, not `pnpm dev`, when adding/renaming Markdown.** `lib/markdown.tsx`
  caches the `content/` directory listing in module memory and only busts it when `tmp/reload-trigger.ts`
  changes. Plain `pnpm dev` will return a 500 (`Post not found for slug: ...`) for newly added posts
  until the server restarts. `pnpm dev:watch` runs `scripts/watch-content.ts` alongside the dev
  server, which rewrites the trigger file on `.md` changes so new/edited posts hot-reload. Editing an
  existing post's body hot-reloads under plain `pnpm dev` too; it's specifically the file list (new
  files / renames) that needs the watcher.

- **Node version.** `package.json` `engines` requests Node `^24`. The default cloud Node is v22, which
  satisfies Next.js 16 and runs install/lint/typecheck/build/dev cleanly — pnpm only prints a
  non-blocking "Unsupported engine" warning. No action needed unless you specifically want to silence it.

- The dev server binds `http://localhost:3000`.
