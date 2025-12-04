import fetch from 'node-fetch';
import * as fs from 'node:fs';
import * as path from 'node:path';

async function getInput(day: number) {
  const cacheDir = path.join(process.cwd(), 'inputs');
  const cacheFile = path.join(cacheDir, `day${day}.txt`);

  // Return cached input if it exists
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf-8');
  }

  // Fetch from API
  const session = process.env.SESSION;
  const url = `https://adventofcode.com/2025/day/${day}/input`;
  console.warn('Making API request. Limit 1 request per 15min.');
  const res = await fetch(url, {
    headers: {
      cookie: `session=${session}`,
      'User-Agent': 'github.com/ben-basten',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch input');
  }
  const text = await res.text();
  const re = /\n$/;
  const input = text.replace(re, '');

  // Cache the input
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  fs.writeFileSync(cacheFile, input, 'utf-8');

  return input;
}

export { getInput };
