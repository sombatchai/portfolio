// Builds the AEC VERSE browser demo into demo/aecverse.
// usage: node tools/aecverse-demo/build.mjs <Aecverse checkout> <path to the plant model .glb>
// The front end and server.js are copied unchanged; each page only has its supabase-js and socket.io
// <script> tags replaced by the demo runtime (see runtime.js).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [src, model] = process.argv.slice(2);
if (!src || !model) throw new Error('usage: node build.mjs <Aecverse checkout> <plant model .glb>');
const out = path.resolve(here, '../../demo/aecverse');

fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (f !== 'demo-assets') fs.rmSync(path.join(out, f), { recursive: true, force: true });
fs.cpSync(path.join(src, 'public'), out, { recursive: true });

const rt = path.join(out, 'demo-runtime');
fs.mkdirSync(path.join(rt, 'seed'), { recursive: true });
fs.copyFileSync(path.join(src, 'server.js'), path.join(rt, 'server.js'));
fs.copyFileSync(path.join(here, 'runtime.js'), path.join(rt, 'runtime.js'));
for (const f of fs.readdirSync(path.join(here, 'seed'))) fs.copyFileSync(path.join(here, 'seed', f), path.join(rt, 'seed', f));

// the 41 MB plant model is copied once and kept between builds
fs.mkdirSync(path.join(out, 'demo-assets'), { recursive: true });
const modelOut = path.join(out, 'demo-assets', 'model_1787933647305_biogas_v2_lit.glb');
if (!fs.existsSync(modelOut) || fs.statSync(modelOut).size !== fs.statSync(model).size) fs.copyFileSync(model, modelOut);

const SUPA_JS = /<script[^>]*src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2"[^>]*><\/script>/g;
const SOCKET_JS = /<script[^>]*src="https:\/\/cdn\.socket\.io\/[^"]+"[^>]*><\/script>/g;
const RUNTIME = '<script src="demo-runtime/runtime.js"></script>';
let pages = 0;
for (const f of fs.readdirSync(out).filter((f) => f.endsWith('.html'))) {
  const p = path.join(out, f);
  let html = fs.readFileSync(p, 'utf8');
  const uses = SUPA_JS.test(html) || SOCKET_JS.test(html);
  SUPA_JS.lastIndex = 0; SOCKET_JS.lastIndex = 0;
  if (!uses) continue;
  let placed = false;
  html = html.replace(SUPA_JS, () => (placed ? '' : ((placed = true), RUNTIME)));
  html = html.replace(SOCKET_JS, () => (placed ? '' : ((placed = true), RUNTIME)));
  fs.writeFileSync(p, html);
  pages++;
}
console.log('built', out, '·', pages, 'pages use the runtime');
