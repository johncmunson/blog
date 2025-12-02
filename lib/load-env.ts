// Useful for loading environment variables the same way Next.js does
// when using scripts outside of the Next.js runtime.
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
