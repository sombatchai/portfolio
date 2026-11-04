/* AEC VERSE browser demo runtime.
   Runs the real AEC VERSE front end and the real server.js inside the browser, with no backend:
   - window.supabase.createClient -> local accounts (sample admin / engineer / visitor),
   - fetch('/api/...')            -> the Express routes from server.js, run here by a tiny router,
   - window.io()                  -> a local Socket.IO pair wired to server.js's io.on('connection'),
   - Supabase Storage URLs        -> files kept in this browser (localStorage + IndexedDB),
     seeded with the plant's scene, quiz and settings, and the bundled 3D model.
   Nothing is sent to AE&C's Supabase or server. */
(function () {
  const BASE = document.currentScript.src.replace(/[^/]*$/, "");      // .../demo-runtime/
  const SITE = BASE.replace(/demo-runtime\/$/, "");                     // demo root
  const SUPA = "https://hzlokmixfkfrmkuucfhg.supabase.co";
  const MODEL_NAME = "model_1787933647305_biogas_v2_lit.glb";
  const LS = "aec-demo:";
  const realFetch = window.fetch.bind(window);
  const tick = (fn) => setTimeout(fn, 0);

  /* ================= storage (Supabase Storage stand-in) ================= */
  const SEED_FILES = ["scene_state_v1.json", "knowledge_settings_v1.json", "knowledge_questions_v1.json",
    "general_settings_v1.json", "feature_toggles_v1.json", "site_content_v1.json", "work_orders_v1.json", "notifications_v1.json"];
  const blobURLs = {};                       // name -> object URL for binary uploads (models, avatars)
  const idb = new Promise((resolve) => {
    try {
      const r = indexedDB.open("aec-demo", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("files");
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(null);
    } catch (e) { resolve(null); }
  });
  const idbDo = (mode, fn) => idb.then((db) => db && new Promise((res) => {
    const tx = db.transaction("files", mode); const req = fn(tx.objectStore("files"));
    tx.oncomplete = () => res(req && req.result); tx.onerror = () => res(null);
  }));
  // restore binary uploads from earlier pages as object URLs
  const blobsReady = idbDo("readonly", (s) => s.getAllKeys()).then(async (keys) => {
    for (const k of keys || []) { const b = await idbDo("readonly", (s) => s.get(k)); if (b) blobURLs[k] = URL.createObjectURL(b); }
  });

  const parseStorage = (url) => {
    const m = String(url).match(/\/storage\/v1\/object\/(public\/|list\/)?([^/?]+)\/?([^?]*)/);
    return m && { kind: m[1] === "list/" ? "list" : m[1] === "public/" ? "public" : "object", bucket: m[2], name: decodeURIComponent(m[3] || "") };
  };
  const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

  async function storageFetch(url, init = {}) {
    const p = parseStorage(url); const method = (init.method || "GET").toUpperCase();
    const key = `${p.bucket}/${p.name}`;
    if (p.kind === "list") {
      const names = new Set(SEED_FILES.concat(MODEL_NAME));
      Object.keys(localStorage).filter((k) => k.startsWith(LS + "file:" + p.bucket + "/")).forEach((k) => names.add(k.slice((LS + "file:" + p.bucket + "/").length)));
      Object.keys(blobURLs).filter((k) => k.startsWith(p.bucket + "/")).forEach((k) => names.add(k.slice(p.bucket.length + 1)));
      return json([...names].map((name) => ({ name, id: name, updated_at: new Date().toISOString(), metadata: {} })));
    }
    if (method === "DELETE") { localStorage.removeItem(LS + "file:" + key); delete blobURLs[key]; idbDo("readwrite", (s) => s.delete(key)); return json({ message: "deleted" }); }
    if (method === "POST" || method === "PUT") {
      const body = init.body;
      if (typeof body === "string") localStorage.setItem(LS + "file:" + key, body);
      else {
        const blob = body instanceof Blob ? body : new Blob([body]);
        blobURLs[key] = URL.createObjectURL(blob);
        idbDo("readwrite", (s) => s.put(blob, key));
      }
      return json({ Key: key });
    }
    // GET
    const text = localStorage.getItem(LS + "file:" + key);
    if (text !== null) return new Response(text, { headers: { "Content-Type": "application/json" } });
    await blobsReady;
    if (blobURLs[key]) return realFetch(blobURLs[key]);
    if (p.name === MODEL_NAME) return realFetch(SITE + "demo-assets/" + MODEL_NAME);
    if (SEED_FILES.includes(p.name)) return realFetch(BASE + "seed/" + p.name);
    return new Response("not found", { status: 404 });
  }
  // the 3D loaders (three.js r128) use XMLHttpRequest, so point storage URLs at local files there too
  const xhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    const p = String(url).startsWith(SUPA) && parseStorage(url);
    if (p && p.kind === "public") {
      const key = `${p.bucket}/${p.name}`;
      if (blobURLs[key]) url = blobURLs[key];
      else if (p.name === MODEL_NAME) url = SITE + "demo-assets/" + MODEL_NAME;
      else if (SEED_FILES.includes(p.name)) url = BASE + "seed/" + p.name;
    }
    return xhrOpen.call(this, method, url, ...rest);
  };

  /* ================= accounts (Supabase Auth stand-in) ================= */
  const now = () => new Date().toISOString();
  const SAMPLE_USERS = [
    { id: "demo-admin", email: "admin@aecverse.demo", password: "demo1234", app_metadata: { role: "admin" }, user_metadata: { nickname: "Demo Admin", full_name: "Demo Admin", display_name: "Demo Admin" } },
    { id: "demo-engineer", email: "engineer@aecverse.demo", password: "demo1234", app_metadata: { role: "engineer" }, user_metadata: { nickname: "Demo Engineer", full_name: "Demo Engineer", display_name: "Demo Engineer" } },
    { id: "demo-visitor", email: "visitor@aecverse.demo", password: "demo1234", app_metadata: { role: "user" }, user_metadata: { nickname: "Demo Visitor", full_name: "Demo Visitor", display_name: "Demo Visitor" } },
  ];
  const loadUsers = () => { try { return JSON.parse(localStorage.getItem(LS + "users")) || null; } catch (e) { return null; } };
  let users = loadUsers() || SAMPLE_USERS.map((u) => ({ ...u, created_at: now(), last_sign_in_at: null, email_confirmed_at: now() }));
  const saveUsers = () => localStorage.setItem(LS + "users", JSON.stringify(users));
  saveUsers();
  const publicUser = (u) => { if (!u) return null; const { password, ...rest } = u; return { aud: "authenticated", role: "authenticated", ...rest }; };
  const tokenFor = (u) => "demo-token." + u.id;
  const userByToken = (t) => users.find((u) => tokenFor(u) === String(t || "").replace(/^Bearer /, ""));
  const sessionFor = (u) => ({ access_token: tokenFor(u), refresh_token: "demo-refresh", token_type: "bearer", expires_in: 86400, expires_at: Math.floor(Date.now() / 1000) + 86400, user: publicUser(u) });
  const getSession = () => { const id = localStorage.getItem(LS + "session"); const u = users.find((x) => x.id === id); return u ? sessionFor(u) : null; };
  const authListeners = new Set();
  const notifyAuth = (ev) => { const s = getSession(); authListeners.forEach((cb) => tick(() => cb(ev, s))); };
  const err = (message, status = 400) => ({ message, status, name: "AuthApiError" });

  const auth = {
    async getSession() { return { data: { session: getSession() }, error: null }; },
    async getUser(token) {
      const u = token ? userByToken(token) : users.find((x) => x.id === localStorage.getItem(LS + "session"));
      return u ? { data: { user: publicUser(u) }, error: null } : { data: { user: null }, error: err("Invalid token", 401) };
    },
    async signInWithPassword({ email, password }) {
      const u = users.find((x) => x.email.toLowerCase() === String(email || "").trim().toLowerCase());
      if (!u || u.password !== password) return { data: { user: null, session: null }, error: err("Invalid login credentials") };
      u.last_sign_in_at = now(); saveUsers(); localStorage.setItem(LS + "session", u.id); notifyAuth("SIGNED_IN");
      return { data: { user: publicUser(u), session: sessionFor(u) }, error: null };
    },
    async signUp({ email, password, options = {} }) {
      email = String(email || "").trim().toLowerCase();
      if (users.some((x) => x.email === email)) return { data: { user: null, session: null }, error: err("User already registered") };
      const u = { id: "demo-" + Math.random().toString(36).slice(2, 10), email, password, app_metadata: { role: "user" }, user_metadata: options.data || {}, created_at: now(), email_confirmed_at: now(), last_sign_in_at: now() };
      users.push(u); saveUsers(); localStorage.setItem(LS + "session", u.id); notifyAuth("SIGNED_IN");
      return { data: { user: publicUser(u), session: sessionFor(u) }, error: null };
    },
    async signOut() { localStorage.removeItem(LS + "session"); notifyAuth("SIGNED_OUT"); return { error: null }; },
    async updateUser({ data, password, email } = {}) {
      const u = users.find((x) => x.id === localStorage.getItem(LS + "session"));
      if (!u) return { data: { user: null }, error: err("Not signed in", 401) };
      if (data) u.user_metadata = { ...u.user_metadata, ...data };
      if (password) u.password = password;
      if (email) u.email = email;
      saveUsers(); notifyAuth("USER_UPDATED");
      return { data: { user: publicUser(u) }, error: null };
    },
    async resetPasswordForEmail() { return { data: {}, error: null }; },
    async verifyOtp() { return { data: {}, error: err("Email codes are not sent in the demo. Use a sample account instead.") }; },
    async signInWithOAuth() { alert("Google sign-in is turned off in the demo.\nUse a sample account: admin@aecverse.demo / demo1234"); return { data: {}, error: err("OAuth disabled in demo") }; },
    async refreshSession() { return { data: { session: getSession() }, error: null }; },
    onAuthStateChange(cb) { authListeners.add(cb); tick(() => cb("INITIAL_SESSION", getSession())); return { data: { subscription: { unsubscribe: () => authListeners.delete(cb) } } }; },
    admin: {
      async listUsers() { return { data: { users: users.map(publicUser) }, error: null }; },
      async getUserById(id) { const u = users.find((x) => x.id === id); return u ? { data: { user: publicUser(u) }, error: null } : { data: { user: null }, error: err("User not found", 404) }; },
      async updateUserById(id, attrs = {}) {
        const u = users.find((x) => x.id === id); if (!u) return { data: { user: null }, error: err("User not found", 404) };
        if (attrs.app_metadata) u.app_metadata = { ...u.app_metadata, ...attrs.app_metadata };
        if (attrs.user_metadata) u.user_metadata = { ...u.user_metadata, ...attrs.user_metadata };
        saveUsers(); return { data: { user: publicUser(u) }, error: null };
      },
    },
  };
  const client = { auth, storage: { from: () => ({}) }, from: () => { throw new Error("[demo] tables are not used by AEC VERSE"); } };
  window.supabase = { createClient: () => client };

  /* ================= Socket.IO stand-in ================= */
  const serverSockets = new Map();   // id -> server-side socket
  let ioServer = null;               // set when server.js creates new Server()
  let seq = 0;
  const mkEmitter = () => {
    const ls = {};
    return {
      on(ev, fn) { (ls[ev] = ls[ev] || []).push(fn); return this; },
      once(ev, fn) { const w = (...a) => { this.off(ev, w); fn(...a); }; return this.on(ev, w); },
      off(ev, fn) { if (!fn) delete ls[ev]; else ls[ev] = (ls[ev] || []).filter((f) => f !== fn); return this; },
      _fire(ev, args) { (ls[ev] || []).slice().forEach((f) => { try { f(...args); } catch (e) { console.error(e); } }); },
    };
  };
  class FakeServer {
    constructor() { this._mw = []; this._conn = []; this.sockets = { sockets: serverSockets }; ioServer = this; }
    use(fn) { this._mw.push(fn); return this; }
    on(ev, fn) { if (ev === "connection" || ev === "connect") this._conn.push(fn); return this; }
    emit(ev, ...args) { serverSockets.forEach((s) => s._toClient(ev, args)); return true; }
    to(room) { return { emit: (ev, ...args) => { serverSockets.forEach((s) => s.rooms.has(room) && s._toClient(ev, args)); return true; } }; }
    in(room) { return this.to(room); }
  }
  window.io = function (url, opts = {}) {
    const id = "demo-sock-" + ++seq;
    const client = mkEmitter(); const srv = mkEmitter();
    const mgr = mkEmitter();
    Object.assign(client, {
      id, connected: false, io: mgr,
      emit(ev, ...args) { const a = args.map((x) => (typeof x === "function" ? (...r) => tick(() => x(...r)) : x)); tick(() => srv._fire(ev, a)); return client; },
      disconnect() { if (client.connected) { client.connected = false; serverSockets.delete(id); tick(() => { srv._fire("disconnect", ["client namespace disconnect"]); client._fire("disconnect", ["io client disconnect"]); }); } return client; },
      close() { return client.disconnect(); }, connect() { return client; }, removeAllListeners() { return client; },
    });
    const s = Object.assign(srv, {
      id, data: {}, rooms: new Set([id]), handshake: { auth: opts.auth || {}, query: opts.query || {} },
      emit(ev, ...args) { s._toClient(ev, args); return true; },
      _toClient(ev, args) { tick(() => client._fire(ev, args)); },
      join(r) { s.rooms.add(r); }, leave(r) { s.rooms.delete(r); },
      broadcast: { emit: (ev, ...args) => { serverSockets.forEach((o) => o !== s && o._toClient(ev, args)); return true; } },
      to(room) { return { emit: (ev, ...args) => serverSockets.forEach((o) => o !== s && o.rooms.has(room) && o._toClient(ev, args)) }; },
      disconnect() { client.disconnect(); },
    });
    serverReady.then(async () => {
      const mws = ioServer ? ioServer._mw : [];
      for (const mw of mws) {
        const e = await new Promise((res) => mw(s, (x) => res(x)));
        if (e) { client._fire("connect_error", [e]); return; }
      }
      serverSockets.set(id, s); client.connected = true;
      (ioServer ? ioServer._conn : []).forEach((fn) => fn(s));
      tick(() => client._fire("connect", []));
    });
    return client;
  };

  /* ================= Express stand-in + /api routing ================= */
  const routes = [];
  function express() {
    const app = () => {};
    app.use = () => app;
    ["get", "post", "patch", "put", "delete"].forEach((m) => { app[m] = (p, ...hs) => { if (typeof p === "string") routes.push({ m: m.toUpperCase(), p, hs }); return app; }; });
    app.listen = (port, cb) => { cb && tick(cb); };
    return app;
  }
  express.json = () => (req, res, next) => next();
  express.static = () => (req, res, next) => next();
  const match = (pattern, pathname) => {
    const keys = [];
    const re = new RegExp("^" + pattern.replace(/:([A-Za-z_]+)/g, (_, k) => { keys.push(k); return "([^/]+)"; }) + "/?$");
    const m = pathname.match(re);
    return m && Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
  };
  async function apiFetch(url, init = {}) {
    await serverReady;
    const u = new URL(url, location.href);
    const pathname = u.pathname.slice(u.pathname.indexOf("/api/"));
    const method = (init.method || "GET").toUpperCase();
    const headers = {};
    new Headers(init.headers || {}).forEach((v, k) => { headers[k.toLowerCase()] = v; });
    let body = init.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) {} }
    for (const r of routes) {
      if (r.m !== method) continue;
      const params = match(r.p, pathname); if (!params) continue;
      return new Promise((resolve) => {
        let status = 200; const out = {};
        const res = {
          status(c) { status = c; return res; }, set() { return res; }, header() { return res; }, setHeader() { return res; },
          json(o) { resolve(json(o === undefined ? null : o, status)); return res; },
          send(x) { resolve(typeof x === "object" ? json(x, status) : new Response(x == null ? "" : String(x), { status })); return res; },
          end() { resolve(new Response(null, { status })); return res; }, sendStatus(c) { status = c; return res.end(); }, sendFile() { return res.end(); },
        };
        const req = { method, path: pathname, url: pathname + u.search, params, query: Object.fromEntries(u.searchParams), body: body || {}, headers, get: (h) => headers[h.toLowerCase()] };
        let i = 0;
        const next = (e) => { if (e) return resolve(json({ error: String(e.message || e) }, 500)); const h = r.hs[i++]; if (!h) return; Promise.resolve().then(() => h(req, res, next)).catch(next); };
        next();
      });
    }
    return json({ error: "Not found in demo: " + method + " " + pathname }, 404);
  }

  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (String(url).startsWith(SUPA) && /\/storage\/v1\/object\//.test(url)) return storageFetch(url, init);
    try {
      const u = new URL(url, location.href);
      if (u.origin === location.origin && u.pathname.includes("/api/")) return apiFetch(u.href, init);
    } catch (e) {}
    return realFetch(input, init);
  };

  /* ================= run server.js ================= */
  const fakeRequire = (name) => {
    if (name === "express") return express;
    if (name === "http") return { createServer: () => ({ listen: (port, cb) => { cb && tick(cb); } }) };
    if (name === "socket.io") return { Server: FakeServer };
    if (name === "path") return { join: (...p) => p.join("/"), resolve: (...p) => p.join("/"), dirname: (p) => p, basename: (p) => String(p).split("/").pop(), extname: (p) => (String(p).match(/\.[^.]+$/) || [""])[0] };
    if (name === "@supabase/supabase-js") return { createClient: () => client };
    throw new Error("[demo] server module not available: " + name);
  };
  const fakeProcess = { env: { RAILWAY_PROJECT_ID: "demo", SUPABASE_SERVICE_ROLE_KEY: "demo", PORT: "3000" }, platform: "browser", on() {}, exit() {} };
  const quietConsole = { ...console, log() {}, info() {} };
  const serverReady = realFetch(BASE + "server.js").then((r) => r.text()).then((src) => {
    new Function("require", "process", "__dirname", "console", src)(fakeRequire, fakeProcess, "", quietConsole);
    return new Promise((res) => setTimeout(res, 150)); // let the boot-time state loads start
  }).catch((e) => console.error("[demo] server failed to start", e));

  /* ================= demo ribbon + sample logins ================= */
  document.addEventListener("DOMContentLoaded", () => {
    const bar = document.createElement("div");
    bar.style.cssText = "position:fixed;z-index:2147483647;left:12px;bottom:12px;display:flex;gap:8px;align-items:center;font:600 12px/1.3 system-ui,sans-serif;background:#16a34a;color:#fff;padding:8px 12px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.3)";
    bar.innerHTML = 'Demo · sample accounts · saved only in this browser <button type="button" style="font:inherit;border:0;border-radius:999px;padding:3px 10px;cursor:pointer">Reset</button>';
    bar.querySelector("button").onclick = () => {
      Object.keys(localStorage).filter((k) => k.startsWith(LS)).forEach((k) => localStorage.removeItem(k));
      idbDo("readwrite", (s) => s.clear()).then(() => (location.href = SITE + "Login.html"));
    };
    document.body.appendChild(bar);

    if (/\/Login\.html$/i.test(location.pathname)) {
      const box = document.createElement("div");
      box.style.cssText = "position:fixed;z-index:2147483646;right:16px;top:16px;max-width:300px;font:13px/1.5 system-ui,sans-serif;background:#fff;color:#111;border-radius:14px;padding:14px 16px;box-shadow:0 12px 40px rgba(0,0,0,.25)";
      box.innerHTML = "<b>Demo accounts</b> (password <code>demo1234</code>)<br>" +
        SAMPLE_USERS.map((u) => `<a href="#" data-email="${u.email}" style="display:block;margin-top:6px;color:#15803d">${u.email} · ${u.app_metadata.role}</a>`).join("");
      box.querySelectorAll("a").forEach((a) => a.onclick = (e) => {
        e.preventDefault();
        const em = document.querySelector('input[type="email"], input[name="email"], #email');
        const pw = document.querySelector('input[type="password"]');
        if (em) { em.value = a.dataset.email; em.dispatchEvent(new Event("input", { bubbles: true })); }
        if (pw) { pw.value = "demo1234"; pw.dispatchEvent(new Event("input", { bubbles: true })); }
      });
      document.body.appendChild(box);
    }
  });
})();
