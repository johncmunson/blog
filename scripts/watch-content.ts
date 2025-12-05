import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const TRIGGER_FILE = path.join(process.cwd(), "tmp", "reload-trigger.ts");

function triggerReload() {
  const stamp = `// reload: ${Date.now()}`;
  fs.writeFileSync(TRIGGER_FILE, `${stamp}\nexport {};\n`);
  console.log("[HMR] Triggered reload:", stamp);
}

function watchMarkdownFiles() {
  console.log(`Watching markdown files in: ${CONTENT_DIR}`);

  fs.watch(CONTENT_DIR, { recursive: true }, (_eventType, filename) => {
    if (!filename) return;

    if (filename.endsWith(".md")) {
      console.log(`[watcher] Change detected in: ${filename}`);
      triggerReload();
    }
  });
}

watchMarkdownFiles();
