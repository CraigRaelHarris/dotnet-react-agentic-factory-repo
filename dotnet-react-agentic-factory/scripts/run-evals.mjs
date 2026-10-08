import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function validateCases(directory) {
  const paths = readdirSync(directory).filter((name) => name.endsWith('.json')).sort();
  if (!paths.length) throw new Error('No eval cases found');
  const ids = new Set();
  for (const path of paths) {
    const data = JSON.parse(readFileSync(resolve(directory, path), 'utf8'));
    if (!data || typeof data.id !== 'string' || !data.id.trim()) throw new Error(`${path}: missing id`);
    if (ids.has(data.id)) throw new Error(`${path}: duplicate id`);
    ids.add(data.id);
    if (typeof data.description !== 'string' || !data.description.trim()) throw new Error(`${path}: missing description`);
    for (const key of ['input', 'expected']) {
      if (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key])) {
        throw new Error(`${path}: ${key} must be an object`);
      }
    }
  }
  return paths.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(`${validateCases(process.argv[2] ?? 'evals/cases')} eval case file(s) valid.`);
    console.log('Scaffolding only: no model calls or outcome scoring. Implement feature-specific scorers before relying on this gate.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
