import fetch from 'node-fetch';

async function getInput(day: number) {
  const session = process.env.SESSION;
  const url = `https://adventofcode.com/2024/day/${day}/input`;
  const res = await fetch(url, {
    headers: {
      cookie: `session=${session}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch input');
  }
  const text = await res.text();
  const re = /\n$/;
  return text.replace(re, '');
}

export { getInput };
