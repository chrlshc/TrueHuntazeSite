import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

function parseArgs(argv) {
  return Object.fromEntries(
    argv.slice(2).map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    }),
  );
}

const args = parseArgs(process.argv);
const url = args.url || 'http://localhost:3000/dashboard';
const out = args.out || 'artifacts/dashboard-preview.png';
const dark = args.dark === 'true' || args.dark === true;
const device = args.device || 'desktop';

const width = parseInt(args.width || (device === 'mobile' ? 390 : 1440), 10);
const height = parseInt(args.height || (device === 'mobile' ? 844 : 900), 10);

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: { width, height, deviceScaleFactor: 2 },
});
try {
  const page = await browser.newPage();

  if (dark) {
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  }

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });

  // Attendre le shell / charts pour un rendu stable
  await page.waitForSelector('main', { timeout: 20_000 }).catch(() => {});
  await page.waitForSelector('.recharts-wrapper, .recharts-surface', { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(800);

  await fs.mkdir(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, fullPage: false });
  console.log(`✅ Saved ${out}`);
} finally {
  await browser.close();
}

