/**
 * Genera las capturas del sitio de CloverLeaf que se usan en el módulo
 * "Website" del portal. Se ejecuta a mano cuando el sitio cambia:
 *
 *   node scripts/capture-site.mjs
 *
 * Usa el Chromium que Playwright ya tiene en caché, sin descargar nada.
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const BASE = "https://cloverleafaws.com";
const PAGES = [
  { slug: "home", path: "/", title: "Home" },
  { slug: "about-us", path: "/about-us", title: "About Us" },
  { slug: "auditing-services", path: "/auditing-services", title: "Auditing Services" },
  { slug: "certified-care", path: "/certified-care", title: "Certified Care" },
  { slug: "contact-us", path: "/contact-us", title: "Contact Us" },
];

const VIEWPORT = { width: 1440, height: 900 };

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });

await mkdir("public/site", { recursive: true });
const meta = [];

for (const p of PAGES) {
  await page.goto(BASE + p.path, { waitUntil: "networkidle" });
  // Recorre la página para disparar las imágenes con carga diferida.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else { window.scrollTo(0, 0); setTimeout(resolve, 350); }
      };
      step();
    });
  });
  await page.waitForTimeout(500);

  const file = `public/site/${p.slug}.jpeg`;
  await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 78 });
  const dims = await page.evaluate(() => ({
    w: document.documentElement.clientWidth,
    h: document.body.scrollHeight,
  }));
  meta.push({ ...p, url: BASE + p.path, width: dims.w, height: dims.h });
  console.log(`✓ ${p.slug} — ${dims.w}x${dims.h}`);
}

await browser.close();
console.log(JSON.stringify(meta, null, 2));
