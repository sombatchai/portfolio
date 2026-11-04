/* ==========================================================
   Renders project.html?id=<id> from PROJECTS + DETAILS.
   Runs before main.js so reveals, lightbox and pointer effects
   pick up the generated markup.
   ========================================================== */
(function () {
  const root = document.getElementById("caseStudy");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) {
    root.innerHTML = `<section class="page-hero"><div class="container"><h1>Project not found</h1><p class="lead">That project doesn't exist. <a class="link-arrow" href="index.html#work">See all projects →</a></p></div></section>`;
    return;
  }
  const d = DETAILS[id] || {};
  document.title = `${p.title} — Sombatchai Khamkhao`;

  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  const tick = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>`;
  const head = (title, sub) => `
    <div class="section-head" data-reveal><div>
      <h2 class="section-title">${title}</h2>${sub ? `<p class="section-sub">${sub}</p>` : ""}
    </div></div>`;
  const section = (title, sub, body, cls = "") => `<section class="cs-section ${cls}"><div class="container">${head(title, sub)}${body}</div></section>`;
  const shot = (s, cls = "") => `
    <figure class="shot ${cls}" data-reveal>
      <div class="frame"><img src="${s.src}" alt="${s.t}" loading="lazy"></div>
      <figcaption><b>${s.t}</b>${s.d ? `<small>${s.d}</small>` : ""}</figcaption>
    </figure>`;
  const isGithub = /github\.com/.test(p.link);
  const cover = d.cover ? `<img src="${d.cover}" alt="${p.title} cover" style="object-position:${d.coverPos || "0 0"}">` : p.thumb;


  /* ---------- diagrams drawn as SVG so they stay sharp and match the theme ---------- */
  const archSvg = () => {
    const box = (x, y, w, h, title, sub, accent) => `
      <g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${accent ? "#2e7d12" : "#ffffff"}" stroke="${accent ? "#2e7d12" : "#7cc35a"}" stroke-width="1.5"/>
      <text x="${x + w / 2}" y="${y + h / 2 - (sub ? 4 : -5)}" text-anchor="middle" class="dg-t${accent ? " inv" : ""}">${title}</text>
      ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 16}" text-anchor="middle" class="dg-s${accent ? " inv" : ""}">${sub}</text>` : ""}</g>`;
    const tag = (x, y, t) => `<g><rect x="${x - t.length * 3.6 - 10}" y="${y - 13}" width="${t.length * 7.2 + 20}" height="24" rx="12" fill="#ffffff" stroke="#7cc35a"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="dg-l">${t}</text></g>`;
    return `<svg class="dg" viewBox="0 0 900 360" role="img" aria-label="AEC VERSE architecture diagram">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3f9a1f"/></marker></defs>
      <g fill="none" stroke="#3f9a1f" stroke-width="2">
        <path d="M240 180 H356" marker-start="url(#ah)" marker-end="url(#ah)"/>
        <path d="M560 165 C 620 150, 630 85, 676 80" marker-end="url(#ah)"/>
        <path d="M560 195 C 620 210, 630 275, 676 280" marker-end="url(#ah)"/>
        <path d="M140 145 V40 H676" stroke-dasharray="6 6" marker-end="url(#ah)"/>
        <path d="M140 215 V325 H676" stroke-dasharray="6 6" marker-end="url(#ah)"/>
      </g>
      ${box(40, 145, 200, 70, "Browser", "Three.js 3D client")}
      ${box(360, 140, 200, 80, "Server", "Node.js + Express", true)}
      ${box(680, 50, 190, 60, "Supabase Storage", "")}
      ${box(680, 250, 190, 60, "Supabase Auth", "")}
      ${tag(298, 160, "Socket.IO")}${tag(410, 40, "download 3D models")}${tag(410, 325, "login")}
      ${tag(625, 112, "save JSON files")}${tag(625, 252, "verify token")}
    </svg>`;
  };
  const seqSvg = (sq) => {
    const xs = sq.actors.map((_, i) => 110 + i * 230), top = 30, gap = 56, h = top + 60 + sq.steps.length * gap + 70;
    const head = (y) => sq.actors.map((a, i) => `<g><rect x="${xs[i] - 85}" y="${y}" width="170" height="40" rx="10" fill="${i === 1 ? "#2e7d12" : "#ffffff"}" stroke="${i === 1 ? "#2e7d12" : "#7cc35a"}" stroke-width="1.5"/><text x="${xs[i]}" y="${y + 25}" text-anchor="middle" class="dg-t sm${i === 1 ? " inv" : ""}">${a}</text></g>`).join("");
    const lines = xs.map((x) => `<line x1="${x}" y1="${top + 40}" x2="${x}" y2="${h - 70}" stroke="#9ccf84" stroke-dasharray="4 6"/>`).join("");
    const steps = sq.steps.map((st, i) => {
      const y = top + 80 + i * gap, x1 = xs[st.from], x2 = xs[st.to];
      if (st.from === st.to) {
        // loop toward the inside of the diagram so the label never runs off the edge
        const left = st.from === xs.length - 1, d = left ? -1 : 1;
        return `<path d="M${x1} ${y - 10} h${36 * d} v22 h${-32 * d}" fill="none" stroke="#3f9a1f" stroke-width="2" marker-end="url(#ah2)"/><text x="${x1 + 46 * d}" y="${y + 6}" text-anchor="${left ? "end" : "start"}" class="dg-l">${st.t}</text>`;
      }
      return `<line x1="${x1}" y1="${y}" x2="${x2 - 6}" y2="${y}" stroke="#3f9a1f" stroke-width="2" marker-end="url(#ah2)"/><text x="${(x1 + x2) / 2}" y="${y - 9}" text-anchor="middle" class="dg-l">${st.t}</text>`;
    }).join("");
    return `<svg class="dg" viewBox="0 0 920 ${h}" role="img" aria-label="${sq.title}">
      <defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3f9a1f"/></marker></defs>
      ${lines}${head(top)}${steps}${head(h - 60)}
    </svg>`;
  };

  let html = `
  <section class="cs-hero">
    <div class="container cs-hero-grid">
      <div>
        <div class="crumbs" data-reveal><a href="index.html">Home</a> / <a href="index.html#work">Projects</a> / <span>${p.title}</span></div>
        <div class="cs-badges" data-reveal style="--d:.1s">
          <span class="chip">${ic("folder")}${p.type}</span>
          <span class="chip" style="text-transform:capitalize">${ic("layout")}${p.category}</span>
          <span class="chip">${ic("zap")}${p.year}</span>
        </div>
        ${d.logo ? `<img class="cs-logo" src="${d.logo}" alt="" data-reveal style="--d:.15s">` : ""}
        <h1 class="split-words">${p.title}</h1>
        <p class="lead" data-reveal style="--d:.3s">${d.tagline || p.short}</p>
        <div class="cs-role" data-reveal style="--d:.35s">${ic("user")}<span><small>My role</small><b>${p.role}</b></span></div>
        <div class="tags" data-reveal style="--d:.4s;margin:18px 0 26px">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="hero-actions" data-reveal style="--d:.45s">
          ${isGithub ? `<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">${ic("github")}View on GitHub</a>` : ""}
          ${/figma\.com/.test(p.link) ? `<a class="btn btn-primary" href="${p.link}" target="_blank" rel="noopener">${ic("external")}View Figma prototype</a>` : ""}
          <a class="btn" href="index.html#work">${ic("folder")}All projects</a>
        </div>
      </div>
      <div class="cs-cover reveal-img ${d.coverFit ? "fit" : "kenburns"} shine">${cover}</div>
    </div>
  </section>`;

  if (d.stats) html += `
  <section class="cs-section tight"><div class="container stats" data-stagger>
    ${d.stats.map((s) => `<div class="card spot stat">${/^\d+$/.test(s.n) ? `<div class="num" data-count="${s.n}">0</div>` : `<div class="num">${s.n}</div>`}<p>${s.l}</p></div>`).join("")}
  </div></section>`;

  if (d.client) html += `
  <section class="cs-section tight"><div class="container">
    <div class="card spot client-banner" data-reveal>
      <div><span class="chip">${ic("server")}Capstone project · real client</span><h3>${d.client.title}</h3><p>${d.client.text}</p></div>
      <div class="client-list">${d.client.companies.map((c) => `<div><b>${c.name}</b><small>${c.role}</small></div>`).join("")}</div>
    </div>
  </div></section>`;

  // overview + problem / solution
  if (d.overview) html += section("Overview", null, `
    <div class="cs-overview">
      <div class="prose" data-reveal>${d.overview.map((t) => `<p>${t}</p>`).join("")}</div>
      ${d.problem ? `<div class="ps" data-stagger>
        <div class="card spot ps-card problem"><span class="ps-tag">Problem</span><p>${d.problem}</p></div>
        <div class="card spot ps-card solution"><span class="ps-tag">Solution</span><p>${d.solution}</p></div>
      </div>` : ""}
    </div>`);

  if (d.concepts) html += section("Core Concepts", "The ideas the app is built on.", `
    <div class="values" data-stagger>${d.concepts.map((c, i) => `<div class="card spot value"><div class="icon-box"><b>0${i + 1}</b></div><h4>${c.t}</h4><p>${c.d}</p></div>`).join("")}</div>`);

  if (d.objectives || d.myRole) html += section(d.goalsTitle || "Goals & My Role", null, `
    <div class="cs-two">
      ${d.objectives ? `<div class="card spot cs-pad" data-reveal><h3>${ic("target")}${d.objectivesLabel || "Objectives"}</h3><ul class="checklist">${d.objectives.map((o) => `<li>${tick}${o}</li>`).join("")}</ul></div>` : ""}
      ${d.myRole ? `<div class="card spot cs-pad role-card" data-reveal style="--d:.1s"><h3>${ic("user")}${d.myRole.title}</h3><p class="muted">The parts I owned:</p><div class="role-pills">${d.myRole.items.map((r) => `<span>${r}</span>`).join("")}</div></div>` : ""}
    </div>`);

  if (d.lab) html += section("Lab Setup", "Everything ran on our own equipment in an isolated test environment.", `
    <div class="cs-two">${d.lab.map((g) => `<div class="card spot cs-pad" data-reveal><h3>${ic(g.g === "Hardware" ? "server" : "code")}${g.g}</h3><div class="pill-row">${g.items.map((x) => `<span class="tag">${x}</span>`).join("")}</div></div>`).join("")}</div>`);

  if (d.clientReqs) html += section(d.clientReqs.title, d.clientReqs.sub, `
    <ol class="req-list" data-stagger>${d.clientReqs.items.map((r, i) => `<li class="card spot"><span>${String(i + 1).padStart(2, "0")}</span>${r}</li>`).join("")}</ol>`);

  if (d.archDiagram) html += section(d.archDiagram.title, d.archDiagram.sub, `<div class="card dg-card" data-reveal>${archSvg()}</div>`);
  if (d.sequence) html += section(d.sequence.title, d.sequence.sub, `<div class="card dg-card" data-reveal>${seqSvg(d.sequence)}</div>`);

  if (d.features) html += section("Key Features", null, `
    <div class="soft-grid feat-grid" data-stagger>${d.features.map((f) => `<div class="card spot soft"><div class="icon-box">${ic(f.icon)}</div><h4>${f.t}</h4><p>${f.d}</p></div>`).join("")}</div>`);

  if (d.business) html += section("Business Model", "From our hackathon pitch deck.", `
    <div class="soft-grid" data-stagger>${d.business.map((f) => `<div class="card spot soft"><div class="icon-box">${ic(f.icon)}</div><h4>${f.t}</h4><p>${f.d}</p></div>`).join("")}</div>`);

  if (d.steps) html += section("Method", "The attack flow we simulated, step by step.", `
    <ol class="steps" data-stagger>${d.steps.map((s, i) => `<li class="card spot"><span class="n">${i + 1}</span><h4>${s.t}</h4><p>${s.d}</p></li>`).join("")}</ol>`);

  if (d.highlight) html += `
  <section class="cs-section"><div class="container">
    <div class="card spot cs-highlight" data-reveal>
      <span class="chip">${ic("bulb")}Problem solving</span>
      <h3>${d.highlight.title}</h3>
      ${d.highlight.text.map((t) => `<p>${t}</p>`).join("")}
    </div>
  </div></section>`;

  if (d.phoneScreens) html += section("App Screens", "The mobile app, screen by screen. Click to enlarge.", `
    <div class="shots phones" data-stagger>${d.phoneScreens.map((sc) => shot(sc, "phone")).join("")}</div>`);

  if (d.screens) html += section(d.phoneScreens ? "Admin Website" : "Screens", "Click any screenshot to enlarge.", `
    <div class="shots" data-stagger>${d.screens.map((s) => shot(s)).join("")}</div>`);

  if (d.results) {
    const r = d.results;
    const cell = (v) => {
      const label = Number.isInteger(v) ? `${v}%` : `${Math.round(v)}%`;
      return `<td><span class="heat" style="--v:${v / 100}" title="${label} cracked">${label}</span></td>`;
    };
    html += section("Results", "Crack success rate by password type, security level and tool. Darker means easier to crack.", `
      <div class="card cs-pad table-wrap" data-reveal>
        <table class="heatmap">
          <thead>
            <tr><th rowspan="2">Password type</th>${r.cols.map((c) => `<th colspan="2">${c}</th>`).join("")}</tr>
            <tr>${r.cols.map(() => r.tools.map((t) => `<th class="tool">${t}</th>`).join("")).join("")}</tr>
          </thead>
          <tbody>${r.rows.map((row) => `<tr><th><b>${row.t}</b><small>e.g. ${row.ex}</small></th>${row.v.map(cell).join("")}</tr>`).join("")}</tbody>
        </table>
        <div class="heat-legend"><span>0% · never cracked</span><i></i><span>100% · always cracked</span></div>
      </div>`);
  }

  if (d.findings) html += section("Key Findings", null, `
    <div class="soft-grid" data-stagger>${d.findings.map((f, i) => `<div class="card spot soft"><div class="icon-box">${ic(["zap", "target", "tool", "bulb"][i % 4])}</div><h4>${f.t}</h4><p>${f.d}</p></div>`).join("")}</div>`);

  if (d.diagrams) html += section("System Design", "Diagrams from our Software Requirements Specification and OOP report.", `
    <div class="shots diagrams" data-stagger>${d.diagrams.map((s) => shot(s, "light")).join("")}</div>`);

  if (d.oop) html += section("OOP & Data Structures in Practice", "Where each concept lives in the real code.", `
    <div class="oop-list">${d.oop.map((o, i) => `
      <div class="oop-row ${i % 2 ? "flip" : ""}">
        <div class="oop-text" data-reveal="${i % 2 ? "right" : "left"}"><span class="oop-n">0${i + 1}</span><h3>${o.t}</h3><p>${o.d}</p></div>
        ${shot({ src: o.img, t: `${o.t}: code` }, "code")}
      </div>`).join("")}</div>`);

  if (d.requirements) html += section("Functional Requirements", "From the SRS: what each module must do and how it validates input.", `
    <div class="faq req" data-stagger>${d.requirements.map((q, i) => `<details class="card" ${i === 0 ? "open" : ""}><summary>${q.t}<span class="plus">+</span></summary><div class="answer">${q.d}</div></details>`).join("")}</div>`);

  if (d.admin || d.architecture) html += section("Admin System & Architecture", null, `
    <div class="cs-two">
      ${d.admin ? `<div class="card spot cs-pad" data-reveal><h3>${ic("server")}Admin web</h3><ul class="checklist">${d.admin.map((o) => `<li>${tick}${o}</li>`).join("")}</ul></div>` : ""}
      ${d.architecture ? `<div class="card spot cs-pad" data-reveal style="--d:.1s"><h3>${ic("layout")}Project structure</h3><div class="arch">${d.architecture.map((a) => `<div><code>${a.t}</code><span>${a.d}</span></div>`).join("")}</div></div>` : ""}
    </div>`);

  const stack = d.stack || [{ g: "Built with", items: p.tags }];
  html += section("Tech Stack", null, `
    <div class="stack-grid" data-stagger>${stack.map((s) => `<div class="card spot cs-pad"><small>${s.g}</small><div class="pill-row">${s.items.map((x) => `<span class="tag">${x}</span>`).join("")}</div></div>`).join("")}</div>`);

  if (!d.features && p.highlights) html += section("Highlights", null, `
    <div class="card spot cs-pad" data-reveal><ul class="checklist">${p.highlights.map((h) => `<li>${tick}${h}</li>`).join("")}</ul></div>`);

  if (d.learnings) html += section("What I Learned", null, `
    <div class="card spot cs-pad" data-reveal><ul class="checklist">${d.learnings.map((h) => `<li>${tick}${h}</li>`).join("")}</ul></div>`);

  // prev / next
  const i = PROJECTS.indexOf(p);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
  html += `
  <section class="cs-section"><div class="container cs-nav">
    <a class="card spot" href="project.html?id=${prev.id}" data-reveal="left"><small>← Previous</small><b>${prev.title}</b></a>
    <a class="card spot next" href="project.html?id=${next.id}" data-reveal="right"><small>Next →</small><b>${next.title}</b></a>
  </div></section>`;

  root.innerHTML = html;
})();
