// Builds the StockMB browser demo into demo/stockmb from a checkout of github.com/sombatchai/StockMB.
// usage: node tools/stockmb-demo/build.mjs <path-to-StockMB-checkout> <path-to-sql.js-dist>
// The StockMB files are copied unchanged; each page only gets two <script> tags that load the demo runtime.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [src, sqljs] = process.argv.slice(2);
if (!src || !sqljs) throw new Error('usage: node build.mjs <StockMB checkout> <sql.js dist folder>');
const out = path.resolve(here, '../../demo/stockmb');

fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) fs.rmSync(path.join(out, f), { recursive: true, force: true });
for (const dir of ['src', 'style', 'js']) fs.cpSync(path.join(src, dir), path.join(out, dir), { recursive: true });

const rt = path.join(out, 'demo-runtime');
fs.mkdirSync(rt, { recursive: true });
fs.copyFileSync(path.join(src, 'main.js'), path.join(rt, 'main.js'));
fs.copyFileSync(path.join(here, 'runtime.js'), path.join(rt, 'runtime.js'));
for (const f of ['sql-wasm.js', 'sql-wasm.wasm']) fs.copyFileSync(path.join(sqljs, f), path.join(rt, f));

// the app navigates to 'login.html' / 'productsales.html' while the files are Login.html / ProductSales.html;
// Windows doesn't care but GitHub Pages is case-sensitive, so fix just those redirects
const fixCase = (s) => s.replace(/(href\s*=\s*['"])login\.html/g, '$1Login.html').replace(/(href\s*=\s*['"])productsales\.html/g, '$1ProductSales.html');
for (const f of fs.readdirSync(path.join(out, 'js')).filter((f) => f.endsWith('.js'))) {
  const p = path.join(out, 'js', f);
  fs.writeFileSync(p, fixCase(fs.readFileSync(p, 'utf8')));
}

// bug in the original: cart items carry `id`, but main.js's process-checkout reads `item.product_id`,
// so stock was never deducted and sales were saved without a product. Give cart items both keys.
const sales = path.join(out, 'js', 'productsales.js');
const salesSrc = fs.readFileSync(sales, 'utf8');
if (!/cart\.push\(\{\s*id: pId,/.test(salesSrc)) throw new Error('productsales.js changed: re-check the cart product_id patch');
fs.writeFileSync(sales, salesSrc.replace(/cart\.push\(\{\s*id: pId,/, (m) => `${m}\n            product_id: pId,`));

const inject = '<script src="../demo-runtime/sql-wasm.js"></script>\n    <script src="../demo-runtime/runtime.js"></script>';
for (const f of fs.readdirSync(path.join(out, 'src')).filter((f) => f.endsWith('.html'))) {
  const p = path.join(out, 'src', f);
  fs.writeFileSync(p, fixCase(fs.readFileSync(p, 'utf8')).replace(/<head>/i, (m) => `${m}\n    ${inject}`));
}

fs.writeFileSync(path.join(out, 'index.html'),
  '<!doctype html><meta charset="utf-8"><title>StockMB · Demo</title><meta http-equiv="refresh" content="0; url=src/Login.html"><a href="src/Login.html">Open the StockMB demo</a>\n');
console.log('built', out);
