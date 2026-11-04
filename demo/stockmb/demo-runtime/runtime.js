/* StockMB browser demo runtime.
   Lets the original Electron screens run on a static site:
   - window.require('electron') returns an ipcRenderer that talks to the original main.js,
     which is executed here with fake electron / path / sqlite3 modules;
   - sqlite3 is backed by sql.js (SQLite in WebAssembly), seeded with sample data,
     and saved in sessionStorage so data survives page-to-page navigation in this tab. */
(function () {
  const BASE = document.currentScript.src.replace(/[^/]*$/, "");
  const KEY = "stockmb-demo-db-v1";

  /* ---------- renderer side: ipcRenderer ---------- */
  const listeners = {};
  const pending = [];
  const mainHandlers = {};
  let ready = false;

  const deliver = (ch, data) => {
    const ls = listeners[ch] || [];
    listeners[ch] = ls.filter((l) => !l.once);
    ls.forEach((l) => { try { l.fn({ sender: ipcRenderer }, data); } catch (e) { console.error(e); } });
  };
  const dispatch = (ch, data) => {
    const h = mainHandlers[ch];
    if (!h) return console.warn("[demo] no handler for", ch);
    const reply = (c, d) => setTimeout(() => deliver(c, d));
    h({ reply, sender: { send: reply } }, data);
  };
  const ipcRenderer = {
    send(ch, data) { ready ? dispatch(ch, data) : pending.push([ch, data]); },
    on(ch, fn) { (listeners[ch] = listeners[ch] || []).push({ fn }); return ipcRenderer; },
    once(ch, fn) { (listeners[ch] = listeners[ch] || []).push({ fn, once: true }); return ipcRenderer; },
    removeListener(ch, fn) { listeners[ch] = (listeners[ch] || []).filter((l) => l.fn !== fn); return ipcRenderer; },
    removeAllListeners(ch) { if (ch) delete listeners[ch]; else Object.keys(listeners).forEach((k) => delete listeners[k]); return ipcRenderer; },
  };
  const pathShim = { join: (...p) => p.join("/"), dirname: (p) => String(p).replace(/\/[^/]*$/, ""), basename: (p) => String(p).split("/").pop() };

  window.require = (name) => {
    if (name === "electron") return { ipcRenderer };
    if (name === "xlsx") return window.XLSX;
    if (name === "path") return pathShim;
    throw new Error("[demo] module not available in the browser: " + name);
  };

  /* ---------- main side: sqlite3 on top of sql.js ---------- */
  let sql; // sql.js Database
  let inTx = false;
  const save = () => {
    try {
      const bytes = sql.export();
      let s = "";
      for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      sessionStorage.setItem(KEY, btoa(s));
    } catch (e) { console.warn("[demo] could not save", e); }
  };
  const norm = (args) => {
    let cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
    let params = args.length === 1 && Array.isArray(args[0]) ? args[0] : args.length === 1 && args[0] && typeof args[0] === "object" ? args[0] : args;
    if (Array.isArray(params)) params = params.map((v) => (v === undefined ? null : v));
    return { params, cb };
  };
  const later = (cb, ctx, ...a) => cb && setTimeout(() => cb.apply(ctx || {}, a));
  const track = (text) => {
    const t = text.trim().toUpperCase();
    if (t.startsWith("BEGIN")) inTx = true;
    if (t.startsWith("COMMIT") || t.startsWith("ROLLBACK")) { inTx = false; return true; }
    return !inTx && !t.startsWith("SELECT") && !t.startsWith("PRAGMA");
  };

  function Database() {}
  Database.prototype.serialize = function (fn) { if (fn) fn(); return this; };
  Database.prototype.run = function (text, ...rest) {
    const { params, cb } = norm(rest);
    try {
      sql.run(text, params);
      const ctx = { lastID: sql.exec("SELECT last_insert_rowid()")[0].values[0][0], changes: sql.getRowsModified() };
      if (track(text)) save();
      later(cb, ctx, null);
    } catch (e) { later(cb, {}, e); }
    return this;
  };
  Database.prototype.get = function (text, ...rest) {
    const { params, cb } = norm(rest);
    try {
      const st = sql.prepare(text); st.bind(params);
      const row = st.step() ? st.getAsObject() : undefined; st.free();
      later(cb, null, null, row);
    } catch (e) { later(cb, null, e); }
    return this;
  };
  Database.prototype.all = function (text, ...rest) {
    const { params, cb } = norm(rest);
    try {
      const st = sql.prepare(text); st.bind(params);
      const rows = []; while (st.step()) rows.push(st.getAsObject()); st.free();
      later(cb, null, null, rows);
    } catch (e) { later(cb, null, e); }
    return this;
  };
  Database.prototype.prepare = function (text) {
    const st = sql.prepare(text);
    const api = {
      run: (...a) => { const { params, cb } = norm(a); try { st.run(params); if (!inTx) save(); later(cb, {}, null); } catch (e) { later(cb, {}, e); } return api; },
      finalize: (cb) => { st.free(); later(cb); },
    };
    return api;
  };

  const fakeMainRequire = (name) => {
    if (name === "electron") return {
      app: { isPackaged: false, getPath: () => "", whenReady: () => ({ then() {} }), on() {}, quit() {} },
      BrowserWindow: function () {},
      ipcMain: { on: (ch, fn) => { mainHandlers[ch] = fn; }, handle: (ch, fn) => { mainHandlers[ch] = fn; } },
    };
    if (name === "path") return pathShim;
    if (name === "sqlite3") return { verbose() { return this; }, Database };
    throw new Error("[demo] main.js module not available: " + name);
  };

  /* ---------- sample data ---------- */
  const tile = (bg, label) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="24" fill="${bg}"/>` +
    `<text x="100" y="118" font-family="Segoe UI, sans-serif" font-size="64" font-weight="700" fill="#fff" text-anchor="middle">${label}</text></svg>`);

  function seed() {
    const products = [
      ["P001", "น้ำดื่ม 600 มล.", "เครื่องดื่ม", 10, 140, "#0ea5e9", "W"],
      ["P002", "ชาเขียวขวด", "เครื่องดื่ม", 20, 85, "#22c55e", "T"],
      ["P003", "กาแฟกระป๋อง", "เครื่องดื่ม", 18, 60, "#92400e", "C"],
      ["P004", "นมจืด UHT", "เครื่องดื่ม", 15, 44, "#60a5fa", "M"],
      ["P005", "ขนมปังแซนด์วิช", "อาหาร", 25, 30, "#f59e0b", "B"],
      ["P006", "มาม่าต้มยำ", "อาหาร", 7, 200, "#ef4444", "N"],
      ["P007", "ปลากระป๋อง", "อาหาร", 22, 75, "#f97316", "F"],
      ["P008", "ข้าวสาร 5 กก.", "อาหาร", 180, 18, "#a3a3a3", "R"],
      ["P009", "มันฝรั่งทอด", "ขนม", 20, 96, "#eab308", "S"],
      ["P010", "ช็อกโกแลตแท่ง", "ขนม", 25, 8, "#7c2d12", "Ch"],
      ["P011", "สบู่ก้อน", "ของใช้", 15, 52, "#ec4899", "So"],
      ["P012", "ยาสีฟัน", "ของใช้", 45, 5, "#14b8a6", "Tp"],
      ["P013", "กระดาษทิชชู่", "ของใช้", 35, 40, "#8b5cf6", "Ti"],
      ["P014", "ผงซักฟอก", "ของใช้", 69, 22, "#3b82f6", "D"],
    ];
    products.forEach(([id, name, cat, price, qty, bg, l]) =>
      sql.run("INSERT INTO product (product_id, product_name, pro_category, price, quantity, image) VALUES (?,?,?,?,?,?)", [id, name, cat, price, qty, tile(bg, l)]));

    const emps = [
      ["E001", "Demo Owner", 30, "ชาย", "080-000-0001", "เจ้าของร้าน", 25000, "ปริญญาตรี", 2018, "owner@demo.shop", "demo", "demo1234", "Admin"],
      ["E002", "Somchai (sample)", 24, "ชาย", "080-000-0002", "พนักงานขาย", 12000, "ปวส.", 2022, "staff1@demo.shop", "staff", "staff1234", "Staff"],
      ["E003", "Suda (sample)", 27, "หญิง", "080-000-0003", "พนักงานคลังสินค้า", 13000, "ปริญญาตรี", 2020, "staff2@demo.shop", "suda", "suda1234", "Staff"],
    ];
    emps.forEach((e) => sql.run("INSERT INTO employee (emp_id, emp_name, age, sex, phone, position, salary, qualification, year_qual, email, username, password, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", e));

    // deterministic pseudo-random so every visitor sees the same sample history
    let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let d = 85; d >= 0; d -= 6) {
      const p = products[Math.floor(rnd() * products.length)];
      const qty = 20 + Math.floor(rnd() * 60), cost = +(p[3] * 0.65).toFixed(2);
      sql.run("INSERT INTO import_expenses (product_id, import_qty, unit_cost, total_cost, recorded_by, import_date) VALUES (?,?,?,?,?, datetime('now', ?))",
        [p[0], qty, cost, +(qty * cost).toFixed(2), "Suda (sample)", `-${d} days`]);
    }
    for (let d = 60; d >= 0; d--) {
      const n = 1 + Math.floor(rnd() * 4);
      for (let k = 0; k < n; k++) {
        const p = products[Math.floor(rnd() * products.length)];
        const qty = 1 + Math.floor(rnd() * 4);
        sql.run("INSERT INTO sales_history (product_id, total_amount, sold_by, sale_date) VALUES (?,?,?, datetime('now', ?, ?))",
          [p[0], p[3] * qty, rnd() < 0.6 ? "Somchai (sample)" : "Demo Owner", `-${d} days`, `-${Math.floor(rnd() * 600)} minutes`]);
      }
    }
  }

  /* ---------- demo ribbon + login hint ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const bar = document.createElement("div");
    bar.style.cssText = "position:fixed;z-index:99999;right:12px;bottom:12px;display:flex;gap:8px;align-items:center;font:600 12px/1.3 system-ui,sans-serif;background:#4f46e5;color:#fff;padding:8px 12px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.25)";
    bar.innerHTML = 'Demo · sample data · saved only in this tab <button type="button" style="font:inherit;border:0;border-radius:999px;padding:3px 10px;cursor:pointer">Reset</button>';
    bar.querySelector("button").onclick = () => { sessionStorage.removeItem(KEY); localStorage.removeItem("employeeName"); localStorage.removeItem("employeeRole"); location.href = "Login.html"; };
    document.body.appendChild(bar);

    const u = document.getElementById("username"), p = document.getElementById("password");
    if (u && p && /login\.html$/i.test(location.pathname)) {
      u.value = "demo"; p.value = "demo1234";
      const hint = document.createElement("p");
      hint.style.cssText = "margin:10px 0 0;font:13px/1.5 system-ui,sans-serif;color:#4b5563;text-align:center";
      hint.textContent = "Demo login is filled in: demo / demo1234 (Admin) · staff / staff1234 (Staff)";
      (p.closest("form") || p.parentElement).appendChild(hint);
    }
  });

  /* ---------- boot ---------- */
  Promise.all([
    initSqlJs({ locateFile: (f) => BASE + f }),
    fetch(BASE + "main.js").then((r) => r.text()),
  ]).then(([SQL, mainSrc]) => {
    const saved = sessionStorage.getItem(KEY);
    sql = saved ? new SQL.Database(Uint8Array.from(atob(saved), (c) => c.charCodeAt(0))) : new SQL.Database();
    new Function("require", "process", "__dirname", mainSrc)(fakeMainRequire, { platform: "web" }, "");
    if (!saved || sql.exec("SELECT COUNT(*) FROM product")[0].values[0][0] === 0) { seed(); save(); }
    ready = true;
    pending.splice(0).forEach(([ch, data]) => dispatch(ch, data));
  }).catch((e) => console.error("[demo] failed to start", e));

  window.addEventListener("pagehide", () => { if (sql) save(); });
})();
