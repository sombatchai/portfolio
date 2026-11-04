// Builds the MissionLife web demo into demo/missionlife.
// usage: node tools/missionlife-demo/build.mjs <copy of Mission-Life/user/my-app with node_modules installed>
// Run it on a COPY of the app: this script adds files to it (mocks, metro.config.js) and changes package.json/app.json.
// Needs react-dom, react-native-web and @expo/metro-runtime installed in that copy (npx expo install ...).
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = process.argv[2];
if (!app) throw new Error('usage: node build.mjs <app copy>');
const out = path.resolve(here, '../../demo/missionlife');
const BASE = '/portfolio/demo/missionlife';

// 1. mocks live inside the app so Metro can resolve them
fs.cpSync(path.join(here, 'mocks'), path.join(app, 'demo-mocks'), { recursive: true });
fs.writeFileSync(path.join(app, 'metro.config.js'), `// demo build only: swap Firebase and the native date picker for browser stand-ins
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);
const m = (f) => path.join(__dirname, 'demo-mocks', f);
const swap = {
  'firebase/app': m('firebase-app.js'),
  'firebase/firestore': m('firebase-firestore.js'),
  'firebase/storage': m('firebase-storage.js'),
  '@react-native-community/datetimepicker': m('datetimepicker.js'),
};
config.resolver.resolveRequest = (ctx, name, platform) =>
  swap[name] ? { type: 'sourceFile', filePath: swap[name] } : ctx.resolveRequest(ctx, name, platform);
module.exports = config;
`);

// 2. entry + base path
const pkgPath = path.join(app, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.main = 'demo-mocks/demo-entry.js';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
const appJsonPath = path.join(app, 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
appJson.expo.name = 'MissionLife';
appJson.expo.experiments = { ...(appJson.expo.experiments || {}), baseUrl: BASE };
appJson.expo.web = { ...(appJson.expo.web || {}), output: 'single' };
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

// 3. export
fs.rmSync(path.join(app, 'dist'), { recursive: true, force: true });
execSync('npx expo export --platform web --output-dir dist --clear', { cwd: app, stdio: 'inherit' });

// 4. phone-sized frame + demo ribbon around the app
const indexPath = path.join(app, 'dist', 'index.html');
const frame = `<style>
  html, body { background: #0b0910 !important; }
  @media (min-width: 520px) {
    body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    #root { width: 400px !important; height: min(860px, 96vh) !important; flex: none !important; border-radius: 34px; overflow: hidden;
            box-shadow: 0 0 0 10px #1c1a24, 0 40px 90px rgba(0,0,0,.6); position: relative; }
  }
  #demo-ribbon { position: fixed; z-index: 99999; right: 12px; bottom: 12px; display: flex; gap: 8px; align-items: center;
    font: 600 12px/1.3 system-ui, sans-serif; background: #4f46e5; color: #fff; padding: 8px 12px; border-radius: 999px; box-shadow: 0 8px 24px rgba(0,0,0,.25); }
  #demo-ribbon button { font: inherit; border: 0; border-radius: 999px; padding: 3px 10px; cursor: pointer; }
</style>`;
const ribbon = `<div id="demo-ribbon">Demo · login demo / demo1234 · saved only in this browser <button type="button" onclick="localStorage.removeItem('missionlife-demo-v1');location.reload()">Reset</button></div>`;
let html = fs.readFileSync(indexPath, 'utf8')
  .replace('</head>', `${frame}</head>`)
  .replace(/<body([^>]*)>/, (mm) => `${mm}${ribbon}`)
  .replace(/<title>[^<]*<\/title>/, '<title>MissionLife · Demo</title>');
fs.writeFileSync(indexPath, html);

fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) fs.rmSync(path.join(out, f), { recursive: true, force: true });
fs.cpSync(path.join(app, 'dist'), out, { recursive: true });
console.log('built', out);
