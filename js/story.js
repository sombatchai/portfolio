/* ==========================================================
   Cinematic scroll story: builds the project chapters from
   PROJECTS/DETAILS, then feeds every [data-scene] two numbers:
   --p  progress through the scene (0 at its top, 1 at its end)
   --e  how far it has entered the viewport (0 → 1)
   ========================================================== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const P = (id) => PROJECTS.find((p) => p.id === id);
  const D = (id) => (typeof DETAILS !== "undefined" && DETAILS[id]) || {};
  const IMG = "assets/img/";
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    arrow: svg('<path d="M5 12h14m-6-6l6 6-6 6"/>'),
    github: svg('<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C5.7 1.5 4.6 1.8 4.6 1.8a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 9c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V21"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
    download: svg('<path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16"/>'),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
  };

  /* ---------- profile bits ---------- */
  $$("[data-profile]").forEach((el) => {
    const k = el.dataset.profile;
    el.href = k === "email" ? `mailto:${PROFILE.email}` : PROFILE[k];
    if (el.hasAttribute("data-text")) el.textContent = PROFILE[k];
  });
  $("#year").textContent = new Date().getFullYear();
  $("#projCount").textContent = PROJECTS.length;

  /* ---------- chapter visuals ---------- */
  const VISUALS = {
    aecverse: () => `<div class="v-cover"><img src="${IMG}projects/aecverse/cover.jpg" alt="AEC VERSE biogas plant"><img class="logo" src="${IMG}projects/aecverse/logo.png" alt="AEC VERSE logo"></div>`,
    // real screens from the app, plus the project logo
    mission: () => `<div class="v-phones">
        <div class="phone b"><img src="${IMG}projects/mission/quests.jpg" alt="MissionLife quests screen"></div>
        <div class="phone c"><img src="${IMG}projects/mission/trophy.jpg" alt="MissionLife trophy screen"></div>
        <div class="phone a"><img src="${IMG}projects/mission/set-goal.jpg" alt="MissionLife set your goal screen"></div>
        <img class="ml-logo" src="${IMG}projects/mission/logo.png" alt="MissionLife logo">
      </div>`,
    retail: () => `<div class="v-browser"><div class="browser"><div class="bar"><i></i><i></i><i></i><span>retail-insight · dashboard</span></div><div class="view">${P("retail").thumb}</div></div></div>`,
    stockmb: () => `<div class="v-windows">
        <div class="win a"><img src="${IMG}projects/stockmb/dashboard-sales.jpg" alt="StockMB sales dashboard"></div>
        <div class="win b"><img src="${IMG}projects/stockmb/products.jpg" alt="StockMB product management"></div>
      </div>`,
    chainpass: () => `<div class="v-windows">
        <div class="win a"><img src="${IMG}projects/chainpass/seats.jpg" alt="ChainPass zone and seat map"></div>
        <div class="win b"><img src="${IMG}projects/chainpass/home.jpg" alt="ChainPass event listing" style="object-position:0 32%"></div>
      </div>`,
    wifi: () => {
      const lines = [
        ["$ sudo airmon-ng start wlan0", ""], ["$ sudo airodump-ng -c 11 --bssid 8C:90:… wlan0", ""],
        ["[+] WPA handshake captured", "k"], ["$ aircrack-ng -w rockyou.txt test3-01.cap", ""],
        ['KEY FOUND! [ password ]  00:00:00', "k"], ["Th@ngY0u!234  →  not found", "bad"],
      ];
      return `<div class="v-term"><div class="term"><div class="bar">kali@lab: ~/wifi-pentest</div>
        <pre>${lines.map(([l, c], i) => `<span style="--i:${i + 1}" class="${c}">${l}</span>`).join("")}</pre></div>
        <div class="heat-row">
          <div style="--v:1"><b>100%</b><span>WEP cracked</span></div>
          <div style="--v:.55"><b>0–100%</b><span>WPA by password</span></div>
          <div style="--v:.1"><b>0%</b><span>Complex passwords</span></div>
        </div></div>`;
    },
  };

  const ORDER = ["aecverse", "mission", "retail", "stockmb", "chainpass", "wifi"].filter(P);
  $("#work").innerHTML = ORDER.map((id, i) => {
    const p = P(id), d = D(id);
    const n = String(i + 1).padStart(2, "0");
    const stats = (d.stats || []).slice(0, 3);
    const parts = [
      `<div class="ch-kick">Chapter ${n} · ${p.category} · ${p.year}</div>`,
      `<h2 class="ch-title">${p.title.split(" – ")[0]}</h2>`,
      `<p class="ch-lead">${d.tagline || p.short}</p>`,
      `<div class="ch-role">Role: <b>${p.role}</b></div>`,
      stats.length ? `<div class="ch-stats">${stats.map((s) => `<div><b>${s.n}</b><span>${s.l}</span></div>`).join("")}</div>` : "",
      `<div class="ch-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>`,
      `<div><a class="pill fill" href="project.html?id=${id}">Read case study ${IC.arrow}</a></div>`,
    ].filter(Boolean);
    return `
      <section class="chapter ${i % 2 ? "flip" : ""}" id="ch-${id}" data-scene data-chapter="${n}" data-label="${p.title.split(" – ")[0]}">
        <div class="stage">
          <div class="ch-num" aria-hidden="true">${n}</div>
          <div class="ch-text">${parts.map((h, k) => h.replace(/^<(\w+)/, `<$1 style="--k:${k}"`)).join("")}</div>
          <div class="ch-visual">${VISUALS[id] ? VISUALS[id]() : p.thumb}</div>
        </div>
      </section>`;
  }).join("");

  /* ---------- skills / about / contact ---------- */
  $("#skillGrid").innerHTML = SKILLS.map((g, i) => `
    <div class="sg rv" style="--d:${i * 0.08}s"><h4>${g.title}</h4><ul>${g.items.map((s) =>
      `<li>${s.icon ? `<img src="${DEVICON}${s.icon}" alt="" loading="lazy" class="${s.invert ? "inv" : ""}">` : `<span class="ph">{ }</span>`}${s.name}</li>`).join("")}</ul></div>`).join("");
  $("#softGrid").innerHTML = PROFILE.softSkills.map((s, i) => `<div class="rv" style="--d:${i * 0.08}s"><b>${s.t}</b><span>${s.d}</span></div>`).join("");
  $("#summary").textContent = PROFILE.summary;
  $("#edu").innerHTML = PROFILE.education.map((e) => `<li><small>${e.years}</small><b>${e.school}</b><span>${e.degree}</span></li>`).join("");
  $("#courses").innerHTML = PROFILE.coursework.map((c) => `<span>${c}</span>`).join("");
  const tel = PROFILE.phone ? `tel:+66${PROFILE.phone.replace(/\D/g, "").replace(/^0/, "")}` : "";
  $("#contactRow").innerHTML = [
    tel && `<a class="pill" href="${tel}">${IC.phone}${PROFILE.phone}</a>`,
    `<a class="pill" href="${PROFILE.github}" target="_blank" rel="noopener">${IC.github}GitHub</a>`,
    PROFILE.linkedin && `<a class="pill" href="${PROFILE.linkedin}" target="_blank" rel="noopener">${IC.linkedin}LinkedIn</a>`,
    `<a class="pill fill" href="${PROFILE.resume}" download="Sombatchai-Khamkhao-CV.pdf">${IC.download}Download CV</a>`,
  ].filter(Boolean).join("");

  /* ---------- intro letters + statement words ---------- */
  $$("[data-chars]").forEach((el) => {
    let c = el.classList.contains("l2") ? 6 : 0;
    el.innerHTML = [...el.textContent].map((ch) => `<span class="ch" style="--c:${c++}">${ch}</span>`).join("");
  });
  const st = $("#statementText");
  st.innerHTML = st.innerHTML.split(/(<em>.*?<\/em>|\s+)/).filter((t) => t && !/^\s+$/.test(t)).map((t) => {
    const hl = t.startsWith("<em>");
    return t.replace(/<\/?em>/g, "").split(" ").map((w) => `<span class="w${hl ? " hl" : ""}">${w}</span>`).join(" ");
  }).join(" ");
  const words = $$(".w", st);

  /* ---------- chapter rail ---------- */
  const rail = $("#rail");
  rail.innerHTML = $$("[data-chapter]").map((c) => `<a href="#${c.id}"><span>${c.dataset.label}</span>${c.dataset.chapter}<i></i></a>`).join("");

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
  $$(".rv").forEach((el) => io.observe(el));

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    document.documentElement.classList.add("lenis");
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = a.getAttribute("href") === "#work" ? $(".chapter") : $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: 0 }) : target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- mobile menu ---------- */
  const menuBox = $("#menu"), menuToggle = $(".menu-toggle");
  const setMenu = (open) => { menuBox.classList.toggle("open", open); menuToggle.classList.toggle("open", open); menuToggle.setAttribute("aria-expanded", open); };
  menuToggle.addEventListener("click", () => setMenu(!menuBox.classList.contains("open")));
  $$("a", menuBox).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- per-frame scene progress ---------- */
  const scenes = $$("[data-scene]");
  const top = $(".top"), menu = $$(".menu a"), railLinks = $$("a", rail);
  const sectionFor = { intro: () => [$("#intro"), $("#statement")], work: () => $$(".chapter"), skills: () => [$("#skills")], about: () => [$("#about")], contact: () => [$("#contact")] };
  let lastLit = -1;

  function frame(t) {
    if (lenis) lenis.raf(t);
    const vh = innerHeight;
    scenes.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const travel = r.height - vh;
      const p = travel > 0 ? clamp(-r.top / travel) : clamp((vh - r.top) / (vh + r.height));
      s.style.setProperty("--p", p.toFixed(4));
      s.style.setProperty("--e", clamp((vh - r.top) / (vh + r.height)).toFixed(4));
      if (s.id === "statement") {
        const lit = Math.round(clamp(p * 1.35) * words.length);
        if (lit !== lastLit) { words.forEach((w, i) => w.classList.toggle("lit", i < lit)); lastLit = lit; }
      }
    });
    top.classList.toggle("solid", scrollY > vh * 0.6);

    // active chapter on the rail, active section in the menu
    const mid = vh / 2;
    const chapters = $$(".chapter");
    let active = -1;
    chapters.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) active = i; });
    rail.classList.toggle("show", active >= 0);
    railLinks.forEach((a, i) => a.classList.toggle("on", i === active));
    menu.forEach((a) => {
      const key = a.getAttribute("href").slice(1);
      const on = (sectionFor[key] || (() => []))().some((el) => { const r = el.getBoundingClientRect(); return r.top < mid && r.bottom > mid; });
      a.classList.toggle("on", on);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
