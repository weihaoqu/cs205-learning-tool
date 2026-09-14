/**
 * Lets plain `node --experimental-strip-types` load this project's TypeScript
 * sources, so maintenance scripts can import the REAL quiz definitions and
 * score with the SAME code the app uses, instead of a reimplementation that
 * could drift from it.
 *
 * Handles the two things Node's ESM resolver won't do for a Next.js codebase:
 *   - the "@/..." path alias from tsconfig
 *   - extensionless relative imports ("./sorting-quiz")
 */
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const EXTS = ['.ts', '.tsx', '.mjs', '.js', '/index.ts', '/index.tsx', '/index.js'];

function firstExisting(base) {
  if (existsSync(base) && path.extname(base)) return base;
  for (const ext of EXTS) {
    const file = base + ext;
    if (existsSync(file)) return file;
  }
  return null;
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    const hit = firstExisting(path.resolve(ROOT, 'src', specifier.slice(2)));
    if (hit) return next(pathToFileURL(hit).href, context);
  }
  if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL));
    const hit = firstExisting(path.resolve(parentDir, specifier));
    if (hit) return next(pathToFileURL(hit).href, context);
  }
  return next(specifier, context);
}
