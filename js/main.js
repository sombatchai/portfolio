/* ==========================================================
   Shared behaviour: layout, animations, rendering
   ========================================================== */

const ICONS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  download: '<path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16"/>',
  arrow: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
  up: '<path d="M12 19V5m-6 6l6-6 6 6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-5-5z"/><circle cx="15" cy="9" r="1.5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="7" r="2.5"/><path d="M17 13a5 5 0 0 1 5 5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
  heart: '<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  github: '<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C5.7 1.5 4.6 1.8 4.6 1.8a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 9c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V21"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
};
const icon = (name, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

/* ---------- Layout: nav, footer, background ---------- */
const NAV = [
  ["index.html", "Home", "home"],
  ["index.html#work", "Projects", "folder"],
  ["index.html#skills", "Skills", "code"],
  ["index.html#about", "About", "user"],
  ["index.html#contact", "Contact", "mail"],
];
const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

function buildLayout() {
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="bg-fx" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>
    ${finePointer && !reduceMotion ? '<div class="cursor-glow" aria-hidden="true"></div>' : ""}
    <div class="scroll-progress" aria-hidden="true"></div>
    <header class="nav">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Home">
          <span class="logo"><span class="br">&lt;</span>S·K<span class="br">&gt;</span></span>
          <span class="divider"></span>
          <span class="name">${PROFILE.name}</span>
        </a>
        <ul class="nav-links" id="navLinks">
          ${NAV.map(([href, label, ic]) => `<li><a href="${href}" class="${href === current || (current === "project.html" && href === "index.html#work") ? "active" : ""}">${icon(ic)}${label}</a></li>`).join("")}
        </ul>
        <div style="display:flex;gap:10px;align-items:center">
          <a class="btn btn-sm btn-resume" href="${PROFILE.resume}" download="Sombatchai-Khamkhao-CV.pdf">${icon("download")}Download Resume</a>
          <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="container footer-inner">
        <div>
          <div class="logo" style="font-size:22px"><span class="br">&lt;</span>S·K<span class="br">&gt;</span></div>
          <div style="margin-top:6px">© ${new Date().getFullYear()} ${PROFILE.name} · Built with passion & lots of coffee ☕</div>
        </div>
        <div class="socials">
          <a href="${PROFILE.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
          <a href="${PROFILE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
          <a href="mailto:${PROFILE.email}" aria-label="Email">${icon("mail")}</a>
        </div>
      </div>
    </footer>
    <button class="to-top" aria-label="Back to top">${icon("up")}</button>`);

  // fill any [data-icon] placeholders in the page markup
  $$("[data-icon]").forEach((el) => el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)));
  $$("[data-profile]").forEach((el) => {
    const key = el.dataset.profile;
    if (el.tagName === "A") el.href = key === "email" ? `mailto:${PROFILE.email}` : PROFILE[key];
    if (el.hasAttribute("data-profile-text")) el.textContent = PROFILE[key];
  });

  const toggle = $(".nav-toggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- Preloader (first visit of the session only) ---------- */
function preloader() {
  let seen = false;
  try { seen = sessionStorage.getItem("sk-loaded") === "1"; sessionStorage.setItem("sk-loaded", "1"); } catch (e) {}
  if (seen || reduceMotion) return Promise.resolve();
  const chars = "<S·K/>".split("");
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="preloader"><div style="text-align:center">
      <div class="logo-big">${chars.map((c, i) => `<span style="animation-delay:${i * 0.08}s;${"<>/".includes(c) ? "color:var(--primary-2)" : ""}">${c === "<" ? "&lt;" : c === ">" ? "&gt;" : c}</span>`).join("")}</div>
      <div class="bar"><i></i></div>
    </div></div>`);
  return new Promise((res) => setTimeout(() => {
    $(".preloader").classList.add("done");
    setTimeout(() => $(".preloader")?.remove(), 700);
    res();
  }, 1300));
}

/* ---------- Page transitions ---------- */
function pageTransitions() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || a.hasAttribute("download") || e.metaKey || e.ctrlKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !url.pathname.endsWith(".html") || url.hash && url.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 280);
  });
  window.addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("is-leaving"); });
}

/* ---------- Scroll effects ---------- */
function scrollFx() {
  const nav = $(".nav"), bar = $(".scroll-progress"), top = $(".to-top");
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 20);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    top.classList.toggle("show", y > 600);
    // parallax
    $$("[data-parallax]").forEach((el) => {
      el.style.transform = `translateY(${y * parseFloat(el.dataset.parallax)}px)`;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

function splitWords() {
  $$(".split-words").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(" ");
            const w = document.createElement("span");
            w.className = "w";
            w.innerHTML = `<span style="--d:${(i++ * 0.06).toFixed(2)}s">${part}</span>`;
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("wave")) walk(n);
        else if (n.nodeType === 1) {
          const w = document.createElement("span");
          w.className = "w";
          n.replaceWith(w);
          const inner = document.createElement("span");
          inner.style.setProperty("--d", `${(i++ * 0.06).toFixed(2)}s`);
          inner.append(n);
          w.append(inner);
        }
      });
    };
    walk(el);
  });
}

function reveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add("in");
      if (el.matches("[data-count]")) countUp(el);
      $$(".meter i", el).forEach((m) => (m.style.width = m.dataset.w + "%"));
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$("[data-reveal], .split-words, [data-count], .skill-cat").forEach((el) => io.observe(el));

  // a fully clipped element never reports as intersecting, so watch the photo's parent instead
  const imgIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      $$(":scope > .reveal-img", en.target).forEach((el) => el.classList.add("in"));
      imgIo.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  new Set($$(".reveal-img").map((el) => el.parentElement)).forEach((p) => imgIo.observe(p));

  // auto-stagger children of [data-stagger]
  $$("[data-stagger]").forEach((wrap) => {
    [...wrap.children].forEach((c, i) => {
      if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", "");
      c.style.setProperty("--d", `${i * 0.09}s`);
      io.observe(c);
    });
  });
}

function countUp(el) {
  const end = parseFloat(el.dataset.count), dur = 1600, t0 = performance.now();
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.firstChild.textContent = Math.round(end * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Typing roles ---------- */
function typer() {
  const el = $("[data-typer]");
  if (!el) return;
  const words = JSON.parse(el.dataset.typer);
  const out = $(".txt", el);
  if (reduceMotion) { out.textContent = words.join(" | "); return; }
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    out.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  };
  tick();
}

/* ---------- Pointer effects ---------- */
function pointerFx() {
  if (!finePointer || reduceMotion) return;
  const glow = $(".cursor-glow");
  addEventListener("pointermove", (e) => {
    if (glow) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }
  }, { passive: true });

  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  // 3D tilt
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest("[data-tilt]");
    $$("[data-tilt].tilting").forEach((c) => { if (c !== card) { c.style.transform = ""; c.classList.remove("tilting"); } });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.classList.add("tilting");
    card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
  }, { passive: true });

  // magnetic buttons
  $$(".btn").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------- Photo motion ---------- */
function photoMotion() {
  if (reduceMotion) return;

  // photos drift inside their frame as you scroll
  const imgs = $$(".reveal-img img, [data-pimg]");
  const onScroll = () => {
    imgs.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const off = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.translate = `0 ${(-off * r.height * 0.08).toFixed(1)}px`;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // layers inside [data-mouse] follow the pointer at different depths
  if (!finePointer) return;
  $$("[data-mouse]").forEach((zone) => {
    const layers = $$("[data-depth]", zone);
    zone.addEventListener("pointermove", (e) => {
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth);
        l.style.translate = `${(x * d).toFixed(1)}px ${(y * d).toFixed(1)}px`;
      });
    });
    zone.addEventListener("pointerleave", () => layers.forEach((l) => (l.style.translate = "")));
  });
}

/* ---------- Rendering helpers ---------- */
function projectCard(p) {
  return `
    <a class="card spot project" href="project.html?id=${p.id}" data-tilt data-cat="${p.category}" data-id="${p.id}" aria-label="${p.title}: read the case study">
      <div class="thumb">${p.thumb}<span class="cat">${p.category}</span></div>
      <div class="body">
        <h3>${p.title}</h3>
        <p>${p.short}</p>
        <div class="foot">
          <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <span class="open">${icon("external")}</span>
        </div>
      </div>
    </a>`;
}

function renderProjects() {
  $$("[data-projects]").forEach((wrap) => {
    const limit = parseInt(wrap.dataset.limit || "99", 10);
    const ids = wrap.dataset.only ? wrap.dataset.only.split(",") : null;
    const list = PROJECTS.filter((p) => !ids || ids.includes(p.id)).slice(0, limit);
    wrap.innerHTML = list.map(projectCard).join("");
  });

  // filters
  const filters = $(".filters");
  if (filters) {
    const cats = ["all", ...new Set(PROJECTS.map((p) => p.category))];
    const label = { all: "All", web: "Web", mobile: "Mobile", desktop: "Desktop", security: "Security", hackathon: "Hackathon", data: "Data" };
    filters.innerHTML = cats.map((c) => `<button class="filter ${c === "all" ? "active" : ""}" data-filter="${c}">${label[c] || c}<span class="count">${c === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}</span></button>`).join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", filters).forEach((f) => f.classList.toggle("active", f === btn));
      const f = btn.dataset.filter;
      $$(".project", $(".projects-grid")).forEach((card, i) => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("hide", !show);
        if (show && card.animate && !reduceMotion) card.animate([{ opacity: 0, transform: "translateY(20px) scale(.97)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: i * 60, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
      });
    });
  }
}

function renderSkills() {
  const wrap = $("[data-skills]");
  if (!wrap) return;
  const levelWord = (l) => (l >= 78 ? "Advanced" : l >= 62 ? "Intermediate" : "Learning");
  wrap.innerHTML = SKILLS.map((cat, i) => `
    <div class="card spot skill-cat" data-reveal style="--d:${i * 0.1}s">
      <div class="head"><div class="icon-box">${icon(cat.icon)}</div><div><h3>${cat.title}</h3><small>${cat.sub}</small></div></div>
      ${cat.items.map((s) => `
        <div class="skill-row">
          <div class="top">${s.icon ? `<img src="${DEVICON}${s.icon}" alt="" loading="lazy" ${s.invert ? 'style="filter:invert(1)"' : ""}>` : `<span class="icon-box" style="width:22px;height:22px;border-radius:6px;font-size:10px;font-weight:800">BI</span>`}${s.name}<span class="lvl">${levelWord(s.level)}</span></div>
          <div class="meter"><i data-w="${s.level}"></i></div>
        </div>`).join("")}
    </div>`).join("");
}

function renderMarquee() {
  $$("[data-marquee]").forEach((m) => {
    const items = m.classList.contains("reverse") ? [...MARQUEE].reverse() : MARQUEE;
    const html = items.map(([n, ic, inv]) => `<div class="tech-pill"><img src="${DEVICON}${ic}" alt="" loading="lazy" class="${inv ? "invert" : ""}">${n}</div>`).join("");
    m.innerHTML = `<div class="marquee-track">${html}${html}</div>`;
  });
}

/* ---------- About: timeline + lightbox ---------- */
function timeline() {
  const tl = $(".timeline");
  if (!tl) return;
  const fill = $(".line-fill", tl);
  const update = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.7 - r.top) / r.height, 0), 1);
    fill.style.height = p * 100 + "%";
  };
  addEventListener("scroll", update, { passive: true });
  update();
}

function lightbox() {
  const items = $$(".g-item, .shot");
  if (!items.length) return;
  document.body.insertAdjacentHTML("beforeend", `<div class="lightbox" role="dialog" aria-modal="true"><div><img alt=""><p></p></div></div>`);
  const lb = $(".lightbox"), img = $("img", lb), cap = $("p", lb);
  items.forEach((it) => {
    it.tabIndex = 0;
    const show = () => {
      const src = $("img", it);
      img.src = src.src; img.alt = src.alt;
      cap.textContent = $("figcaption", it)?.innerText.replace(/\n/g, " — ") || "";
      lb.classList.add("open");
    };
    it.addEventListener("click", show);
    it.addEventListener("keydown", (e) => e.key === "Enter" && show());
  });
  lb.addEventListener("click", () => lb.classList.remove("open"));
  document.addEventListener("keydown", (e) => e.key === "Escape" && lb.classList.remove("open"));
}

/* ---------- Contact form (opens the visitor's mail app) ---------- */
function contactForm() {
  const form = $("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`[${d.topic}] Message from ${d.name}${d.company ? " – " + d.company : ""}`);
    const body = encodeURIComponent(`${d.message}\n\n— ${d.name}\n${d.email}${d.company ? "\n" + d.company : ""}`);
    location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    $(".status", form).textContent = "✓ Opening your email app… Thanks for reaching out!";
    form.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  buildLayout();
  renderProjects();
  renderSkills();
  renderMarquee();
  splitWords();
  pageTransitions();
  scrollFx();
  pointerFx();
  photoMotion();
  timeline();
  lightbox();
  contactForm();
  document.body.classList.add("is-ready");
  await preloader();
  reveals();
  typer();
});
