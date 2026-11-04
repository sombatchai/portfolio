/* ==========================================================
   Edit your personal info and skills here (projects live in projects.js).
   Every page reads from this file.
   ========================================================== */

const PROFILE = {
  name: "Sombatchai Khamkhao",
  nameTh: "สมบัติชัย คำขาว",
  title: "Software Developer Intern / CWIE Candidate",
  email: "schkkh0@gmail.com",
  phone: "092-560-3744",
  github: "https://github.com/sombatchai",
  resume: "cv/Sombatchai%20khamkhao.pdf",
  location: "Nakhon Ratchasima, Thailand",
  summary: "Third-year Digital Technology student at Suranaree University of Technology with a strong passion for software development. Hands-on experience building full-stack web, mobile and database applications with JavaScript, React, Node.js and relational databases. Eager to bring problem-solving, adaptability and cross-functional teamwork to a software developer internship.",
  education: [
    { school: "Suranaree University of Technology", years: "2024 – Present", degree: "B.Sc. Digital Technology — Institute of Digital Arts and Science" },
    { school: "Phraibung Wittayakom School", years: "2018 – 2023", degree: "High School Diploma (Science–Mathematics Program)" },
  ],
  coursework: [
    "Database Design and Development", "Advanced Database Design and Development", "Project in Database Administration",
    "Foundation in Information and Network Security", "Cryptographic Protocols", "Project in Cyber Security",
  ],
  softSkills: [
    { t: "Problem-Solving & Analytical", d: "Break down system structure and application logic, and debug problems methodically." },
    { t: "Adaptability & Continuous Learning", d: "Pick up new tools, technologies and a system's data flow quickly to keep improving." },
    { t: "Cross-Functional Collaboration", d: "Communicate clearly, split work as a team and deliver projects on target." },
  ],
};

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

/* Inline SVG thumbnails so the project cards look good without screenshots.
   Replace `thumb` with an image path (e.g. "assets/img/aecc.jpg") once you have real screenshots. */
const THUMBS = {
  twin: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="tw1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16123a"/><stop offset="1" stop-color="#2a1a6b"/></linearGradient>
    <linearGradient id="tw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#6d5bff"/></linearGradient></defs>
    <rect width="400" height="250" fill="url(#tw1)"/>
    <g stroke="#7c5cff" stroke-opacity=".25">${Array.from({length:12},(_,i)=>`<line x1="${-100+i*50}" y1="250" x2="${100+i*50}" y2="130"/>`).join("")}${Array.from({length:6},(_,i)=>`<line x1="0" y1="${140+i*22}" x2="400" y2="${140+i*22}"/>`).join("")}</g>
    <g class="floaty"><path d="M200 70 l60 30 v60 l-60 30 l-60 -30 v-60z" fill="url(#tw2)" opacity=".9"/><path d="M200 70 l60 30 l-60 30 l-60 -30z" fill="#d8ccff"/><path d="M200 130 v60 l60 -30 v-60z" fill="#5b3df5"/></g>
    <rect x="80" y="120" width="34" height="60" rx="3" fill="#3b2a9e"/><rect x="290" y="105" width="30" height="80" rx="3" fill="#3b2a9e"/>
    <circle class="pulse" cx="97" cy="112" r="6" fill="#5eead4"/><circle class="pulse" cx="305" cy="96" r="6" fill="#f0abfc" style="animation-delay:-1s"/>
    <rect x="20" y="186" width="128" height="34" rx="8" fill="#0a0918" opacity=".75"/><text x="34" y="209" fill="#fff" font-family="Inter,sans-serif" font-weight="800" font-size="16">AECverse</text>
    <rect x="280" y="20" width="100" height="26" rx="13" fill="#5eead4" opacity=".16"/><circle cx="295" cy="33" r="4" fill="#5eead4"/><text x="305" y="38" fill="#5eead4" font-family="Inter,sans-serif" font-size="11" font-weight="600">LIVE · 3D</text>
  </svg>`,
  mobile: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="mb1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b1d8f"/><stop offset="1" stop-color="#8b2fc9"/></linearGradient></defs>
    <rect width="400" height="250" fill="url(#mb1)"/>
    <circle cx="200" cy="260" r="160" fill="#c084fc" opacity=".18"/>
    <g transform="translate(110 40) rotate(-10)"><rect width="80" height="160" rx="14" fill="#0e0b22"/><rect x="8" y="14" width="64" height="40" rx="8" fill="#7c5cff"/><rect x="8" y="62" width="64" height="10" rx="4" fill="#ffffff22"/><rect x="8" y="78" width="44" height="10" rx="4" fill="#ffffff22"/></g>
    <g class="floaty" transform="translate(160 25)"><rect width="84" height="172" rx="16" fill="#0e0b22" stroke="#a78bfa" stroke-opacity=".6"/><circle cx="42" cy="48" r="20" fill="#5eead4" opacity=".85"/><rect x="12" y="84" width="60" height="9" rx="4" fill="#fff" opacity=".8"/><rect x="12" y="100" width="40" height="7" rx="3" fill="#ffffff44"/><rect x="12" y="120" width="60" height="20" rx="10" fill="#7c5cff"/></g>
    <g transform="translate(250 50) rotate(10)"><rect width="78" height="155" rx="14" fill="#0e0b22"/><rect x="8" y="16" width="62" height="62" rx="10" fill="#f0abfc" opacity=".5"/><rect x="8" y="88" width="50" height="9" rx="4" fill="#ffffff33"/></g>
    <g class="floaty" style="animation-delay:-2s"><path d="M330 150 h34 v10 a17 17 0 0 1 -34 0z" fill="#fbbf24"/><rect x="342" y="176" width="10" height="12" fill="#f59e0b"/><rect x="334" y="188" width="26" height="6" rx="2" fill="#f59e0b"/></g>
    <rect x="40" y="150" width="46" height="46" rx="12" fill="#38bdf8"/><circle cx="63" cy="173" r="11" fill="none" stroke="#fff" stroke-width="4"/>
  </svg>`,
  chart: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="250" fill="#ecebfb"/>
    <rect x="16" y="16" width="368" height="22" rx="6" fill="#fff"/><circle cx="30" cy="27" r="5" fill="#7c5cff"/><rect x="42" y="23" width="70" height="8" rx="4" fill="#c4bdf5"/>
    <rect x="16" y="48" width="70" height="186" rx="8" fill="#fff"/>${[0,1,2,3,4,5].map(i=>`<rect x="26" y="${62+i*26}" width="50" height="10" rx="4" fill="${i===1?'#7c5cff':'#dcd8f7'}"/>`).join("")}
    <rect x="96" y="48" width="180" height="186" rx="8" fill="#fff"/>
    ${[46,70,58,96,82,110,90,124].map((h,i)=>`<rect class="bar" x="${110+i*20}" y="${220-h}" width="12" height="${h}" rx="3" fill="${i%2?'#7c5cff':'#4f46e5'}"/>`).join("")}
    <polyline points="110,150 130,130 150,140 170,105 190,115 210,88 230,96 250,70" fill="none" stroke="#5eead4" stroke-width="3"/>
    <rect x="286" y="48" width="98" height="96" rx="8" fill="#fff"/>
    <circle cx="335" cy="96" r="30" fill="none" stroke="#dcd8f7" stroke-width="14"/><circle cx="335" cy="96" r="30" fill="none" stroke="#7c5cff" stroke-width="14" stroke-dasharray="120 200" transform="rotate(-90 335 96)"/><circle cx="335" cy="96" r="30" fill="none" stroke="#5eead4" stroke-width="14" stroke-dasharray="40 200" stroke-dashoffset="-120" transform="rotate(-90 335 96)"/>
    <rect x="286" y="152" width="98" height="82" rx="8" fill="#fff"/><text x="298" y="186" font-family="Inter,sans-serif" font-weight="800" font-size="22" fill="#1e1b4b">฿2.4M</text><text x="298" y="206" font-family="Inter,sans-serif" font-size="11" fill="#10b981">▲ 18.2%</text>
  </svg>`,
  code: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="cd1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d0b24"/><stop offset="1" stop-color="#25165e"/></linearGradient></defs>
    <rect width="400" height="250" fill="url(#cd1)"/>
    <g class="floaty"><path d="M300 60 l50 25 v55 l-50 25 l-50 -25 v-55z" fill="#7c5cff" opacity=".85"/><path d="M300 60 l50 25 l-50 25 l-50 -25z" fill="#c4b5fd"/><path d="M300 110 v55 l50 -25 v-55z" fill="#4c1d95"/></g>
    <rect x="24" y="36" width="210" height="180" rx="12" fill="#0a0918" stroke="#a78bfa" stroke-opacity=".35"/>
    <circle cx="40" cy="52" r="4" fill="#f87171"/><circle cx="54" cy="52" r="4" fill="#fbbf24"/><circle cx="68" cy="52" r="4" fill="#34d399"/>
    <text font-family="JetBrains Mono,Consolas,monospace" font-size="12"><tspan x="40" y="86" fill="#c084fc">const</tspan><tspan fill="#e9e7ff"> me = {</tspan>
    <tspan x="54" y="106" fill="#5eead4">role</tspan><tspan fill="#e9e7ff">: </tspan><tspan fill="#fbbf24">"developer"</tspan>
    <tspan x="54" y="126" fill="#5eead4">loves</tspan><tspan fill="#e9e7ff">: </tspan><tspan fill="#fbbf24">"clean UI"</tspan>
    <tspan x="54" y="146" fill="#5eead4">learning</tspan><tspan fill="#e9e7ff">: </tspan><tspan fill="#c084fc">true</tspan>
    <tspan x="40" y="166" fill="#e9e7ff">};</tspan></text>
    <rect class="pulse" x="64" y="176" width="8" height="15" fill="#a78bfa"/>
  </svg>`,
};

/* From the CV. level (0–100) only drives the bar length; keep it honest. */
const SKILLS = [
  {
    title: "Languages & Core", sub: "Core programming", icon: "code",
    items: [
      { name: "JavaScript (ES6+)", icon: "javascript/javascript-original.svg", level: 82 },
      { name: "Java", icon: "java/java-original.svg", level: 75 },
      { name: "SQL", icon: "azuresqldatabase/azuresqldatabase-original.svg", level: 78 },
      { name: "HTML5", icon: "html5/html5-original.svg", level: 85 },
      { name: "CSS3", icon: "css3/css3-original.svg", level: 80 },
    ],
  },
  {
    title: "Frontend & Mobile", sub: "Web & app UI", icon: "layout",
    items: [
      { name: "React.js", icon: "react/react-original.svg", level: 74 },
      { name: "React Native (Expo)", icon: "react/react-original.svg", level: 70 },
      { name: "Responsive Web Design", icon: "css3/css3-original.svg", level: 80 },
    ],
  },
  {
    title: "Backend & Databases", sub: "APIs & data", icon: "server",
    items: [
      { name: "Node.js", icon: "nodejs/nodejs-original.svg", level: 70 },
      { name: "Express.js", icon: "express/express-original.svg", level: 68, invert: true },
      { name: "Firebase Realtime DB", icon: "firebase/firebase-original.svg", level: 70 },
      { name: "MySQL", icon: "mysql/mysql-original.svg", level: 74 },
      { name: "SQLite", icon: "sqlite/sqlite-original.svg", level: 72 },
      { name: "RESTful APIs", icon: null, level: 68 },
    ],
  },
  {
    title: "Developer Tools", sub: "Workflow", icon: "tool",
    items: [
      { name: "Git", icon: "git/git-original.svg", level: 78 },
      { name: "GitHub", icon: "github/github-original.svg", level: 78, invert: true },
      { name: "VS Code", icon: "vscode/vscode-original.svg", level: 85 },
      { name: "DB Browser for SQLite", icon: "sqlite/sqlite-original.svg", level: 75 },
    ],
  },
];

const MARQUEE = [
  ["Java", "java/java-original.svg"], ["Python", "python/python-original.svg"],
  ["JavaScript", "javascript/javascript-original.svg"], ["TypeScript", "typescript/typescript-original.svg"],
  ["React", "react/react-original.svg"], ["Next.js", "nextjs/nextjs-original.svg", true],
  ["Node.js", "nodejs/nodejs-original.svg"], ["Tailwind", "tailwindcss/tailwindcss-original.svg"],
  ["Three.js", "threejs/threejs-original.svg", true], ["Firebase", "firebase/firebase-original.svg"], ["Supabase", "supabase/supabase-original.svg"],
  ["Electron", "electron/electron-original.svg"], ["Socket.IO", "socketio/socketio-original.svg", true], ["Express", "express/express-original.svg", true],
  ["SQLite", "sqlite/sqlite-original.svg"], ["Docker", "docker/docker-original.svg"],
  ["Git", "git/git-original.svg"], ["GitHub", "github/github-original.svg", true],
  ["Figma", "figma/figma-original.svg"], ["VS Code", "vscode/vscode-original.svg"],
];
