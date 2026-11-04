/* ==========================================================
   Projects — edit text, tags and links here.
   `thumb` can be an inline SVG from data.js or an <img> tag.
   ========================================================== */

THUMBS.stock = `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="250" fill="#f1f0fb"/>
    <rect x="0" y="0" width="64" height="250" fill="#1e1b4b"/>${[0,1,2,3,4].map(i=>`<rect x="14" y="${40+i*34}" width="36" height="20" rx="6" fill="${i===0?'#7c5cff':'#ffffff22'}"/>`).join("")}
    <text x="80" y="30" font-family="Inter,sans-serif" font-weight="800" font-size="15" fill="#1e1b4b">StockMB · Dashboard</text>
    ${[["Sales","฿48,250","#7c5cff"],["Cost","฿31,900","#f59e0b"],["Stock","1,284","#10b981"]].map(([l,v,c],i)=>`<rect x="${80+i*104}" y="44" width="96" height="52" rx="8" fill="#fff"/><rect x="${88+i*104}" y="54" width="6" height="32" rx="3" fill="${c}"/><text x="${100+i*104}" y="64" font-family="Inter,sans-serif" font-size="9" fill="#6b7280">${l}</text><text x="${100+i*104}" y="84" font-family="Inter,sans-serif" font-weight="800" font-size="14" fill="#111827">${v}</text>`).join("")}
    <rect x="80" y="106" width="200" height="128" rx="8" fill="#fff"/>
    ${[40,64,52,82,70,96,88].map((h,i)=>`<rect class="bar" x="${96+i*26}" y="${220-h}" width="10" height="${h}" rx="2" fill="#7c5cff"/><rect class="bar" x="${107+i*26}" y="${220-h*.6}" width="8" height="${h*.6}" rx="2" fill="#f59e0b"/>`).join("")}
    <rect x="288" y="106" width="96" height="128" rx="8" fill="#fff"/>${[0,1,2,3,4].map(i=>`<rect x="296" y="${118+i*22}" width="16" height="16" rx="4" fill="#ede9fe"/><rect x="318" y="${121+i*22}" width="40" height="5" rx="2" fill="#d1d5db"/><rect x="318" y="${129+i*22}" width="26" height="4" rx="2" fill="#e5e7eb"/><rect x="364" y="${122+i*22}" width="12" height="8" rx="2" fill="${i===2?'#fecaca':'#d1fae5'}"/>`).join("")}
  </svg>`;

THUMBS.wifi = `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="250" fill="#050b12"/>
    <g font-family="JetBrains Mono,Consolas,monospace" font-size="10" fill="#22c55e" opacity=".55">${["$ airmon-ng start wlan0","$ airodump-ng wlan0mon","BSSID              PWR  CH  ENC","AA:BB:CC:11:22:33  -42   6  WPA2","[+] WPA handshake captured","$ aircrack-ng -w wordlist.txt","[!] Weak passphrase detected"].map((l,i)=>`<text x="18" y="${34+i*16}">${l}</text>`).join("")}</g>
    <g transform="translate(290 140)" fill="none" stroke-linecap="round">
      <path class="pulse" d="M-60 -10 a85 85 0 0 1 120 0" stroke="#5eead4" stroke-width="8" opacity=".5"/>
      <path class="pulse" style="animation-delay:-.6s" d="M-40 12 a57 57 0 0 1 80 0" stroke="#5eead4" stroke-width="8" opacity=".75"/>
      <path class="pulse" style="animation-delay:-1.2s" d="M-20 34 a28 28 0 0 1 40 0" stroke="#5eead4" stroke-width="8"/>
      <circle cx="0" cy="52" r="7" fill="#5eead4"/>
    </g>
    <g class="floaty" transform="translate(320 160)"><rect x="-16" y="0" width="52" height="40" rx="8" fill="#7c5cff"/><path d="M-6 0 v-12 a16 16 0 0 1 32 0 v12" fill="none" stroke="#a78bfa" stroke-width="6"/><circle cx="10" cy="18" r="5" fill="#fff"/><rect x="8" y="20" width="4" height="10" fill="#fff"/></g>
  </svg>`;

THUMBS.hack = `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="hk1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a0f3d"/><stop offset="1" stop-color="#4c1d95"/></linearGradient></defs>
    <rect width="400" height="250" fill="url(#hk1)"/>
    <circle cx="200" cy="120" r="80" fill="none" stroke="#a78bfa" stroke-opacity=".3" stroke-width="2" stroke-dasharray="4 8"/>
    <g class="floaty"><circle cx="200" cy="120" r="48" fill="#0a0918" stroke="#c084fc" stroke-width="4"/><path d="M200 120 V88" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M200 120 L222 132" stroke="#5eead4" stroke-width="5" stroke-linecap="round"/><rect x="190" y="62" width="20" height="10" rx="3" fill="#c084fc"/></g>
    <text x="200" y="210" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="20" fill="#fff">HACKATHON</text>
    <text x="200" y="230" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#c4b5fd" letter-spacing="3">BUILD · PITCH · SHIP</text>
    <circle class="pulse" cx="70" cy="60" r="5" fill="#f0abfc"/><circle class="pulse" style="animation-delay:-1s" cx="330" cy="70" r="4" fill="#5eead4"/><circle class="pulse" style="animation-delay:-2s" cx="320" cy="190" r="5" fill="#fbbf24"/>
  </svg>`;

const PROJECTS = [
  {
    id: "aecverse",
    title: "AEC VERSE – Smart Biogas Digital Twin",
    short: "Capstone project for a real company: a 3D digital twin for biogas plant safety training.",
    long: "AEC VERSE is our capstone project, built for a real client: Accepted Engineering & Consultant Co., Ltd. (AE&C), with support from TITON Engineering & Consultant. It is a smart biogas digital twin where trainees explore a 3D model of the plant in the browser and learn its safety procedures. I built the web application structure — 26 pages with five types of interactive modal pop-ups used in the training — and designed the safety assessment quizzes that score each trainee and issue an electronic certificate.",
    category: "web",
    thumb: `<img src="assets/img/projects/aecverse/cover.jpg" alt="AEC VERSE biogas plant digital twin" style="object-position:30% 60%">`,
    tags: ["JavaScript", "HTML5", "CSS3", "3D Simulation"],
    role: "Software Developer (team of 3)",
    type: "Capstone · real client (AE&C)",
    year: "2025",
    highlights: [
      "Built the web application structure: 26 pages for the training platform",
      "Created 5 types of interactive modal pop-ups for safety training content",
      "Designed Safety Assessment Quizzes with automatic scoring",
      "Generated an electronic certificate (E-Certificate) for trainees who pass",
    ],
    link: "https://github.com/sombatchai/Aecverse",
  },
  {
    id: "mission",
    title: "MissionLife – Gamified Habit Tracker",
    short: "Mobile app that turns daily tasks into quests with XP, levels, trophies and boss battles.",
    long: "MissionLife turns everyday habits into an RPG. Users create missions with a goal type, duration and their own monster, earn XP as they log real progress, level up and unlock trophies. A separate admin website manages users, missions and feedback. Built by a team of five for course 1101103: I designed the admin UI and built the user-system back end and database.",
    category: "mobile",
    thumb: `<img src="assets/img/projects/mission/cover.jpg" alt="MissionLife app screens and logo" style="object-position:60% 50%">`,
    tags: ["React Native", "Expo", "Firebase", "Figma"],
    role: "Back end & UI (team of 5)",
    type: "Course project · 1101103",
    year: "2025",
    highlights: [
      "Built the user-system back end and database, and linked all user data",
      "Built Login, Register, Forgot Password (OTP), Home, Quest, Trophy, History, Mission, Create Mission and Create Character",
      "Designed the entire admin web UI in Figma",
      "XP and level system with 4 quest goal types and boss battles",
    ],
    link: "https://github.com/sombatchai/Mission-Life",
  },
  {
    id: "retail",
    title: "Retail Insight – Retail Sales Analytics",
    short: "Web app that turns a shop's sales file into a dashboard, trends, a sales forecast and dead-stock alerts.",
    long: "Retail Insight is a web app built for a student Data Analytics project. Shop owners import their sales (.xlsx, .xls or .csv) and immediately see an overview, sales trends by category, a Linear Regression demand forecast, AI-assisted reorder suggestions and dead-stock detection, without opening Excel or Power BI. The analysis and statistical models came from the Data Analytics team; I built the web app around them.",
    category: "web",
    thumb: `<img src="assets/img/projects/retail/cover.jpg" alt="Retail Insight dashboard" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:0 0">`,
    tags: ["React 19", "Vite", "Tailwind CSS", "Recharts", "Firebase Firestore", "SheetJS"],
    role: "Web app developer (frontend + Firebase)",
    type: "Data Analytics team project",
    year: "2024",
    highlights: [
      "Dashboard of sales, profit, bills and AOV with 7 / 30 / 90-day views",
      "Linear Regression forecast with an Actual vs Forecast chart",
      "Dead-stock detection at 30 / 60 / 90 days with the value of tied-up cash",
      "Excel / CSV import and real-time data from Firebase Firestore",
    ],
    link: "https://github.com/sombatchai/retail-insight",
    demo: "demo/retail/",
  },
  {
    id: "stockmb",
    title: "StockMB – Inventory Management System",
    short: "Desktop inventory system for adding, editing and tracking stock for small shops.",
    long: "StockMB is a desktop inventory management program for small and medium shops. It handles adding and editing products, tracking stock levels and sales, and shows reports to support the owner's decisions. It was built across the OOP & Data Structures and Software Engineering courses, including a full Software Requirements Specification (SRS).",
    category: "desktop",
    thumb: `<img src="assets/img/projects/stockmb/dashboard-sales.jpg" alt="StockMB sales dashboard" style="object-position:0 0">`,
    tags: ["Desktop app", "JavaScript", "SQLite", "MySQL"],
    role: "System Designer & Developer",
    type: "Course project",
    year: "2024",
    highlights: [
      "Add, edit and track inventory status for every product",
      "Designed the Dashboard, Product Management, Employee Data and the database",
      "Point-of-sale flow that records each sale and deducts stock automatically",
      "Bulk product import from Excel and role-based access for Owner and Staff",
    ],
    link: "https://github.com/sombatchai/StockMB",
  },
  {
    id: "chainpass",
    title: "ChainPass – Blockchain Ticketing (Hackathon)",
    short: "Hackathon concept: a ticket platform where smart contracts end fake tickets, scalping and resale scams.",
    long: "ChainPass is the idea our team pitched at a hackathon, working from the CP ALL research topic \"Designing a Blockchain-Based Thai Lottery System\". We took the paper's insight, that smart contracts can stop fraud, price gouging and ownership disputes, and applied it to concert and event tickets. The result is a concept, a clickable Figma prototype and a full pitch deck with the business model. It has not been built as a working product.",
    category: "hackathon",
    thumb: `<img src="assets/img/projects/chainpass/cover.jpg" alt="ChainPass prototype screens" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:0 0">`,
    tags: ["Figma", "UX/UI", "Blockchain concept", "Smart Contract", "Pitching"],
    role: "Team member (concept, prototype & pitch)",
    type: "Hackathon · concept & prototype",
    year: "2026",
    highlights: [
      "Turned a blockchain lottery research paper into a ticketing idea",
      "Designed the full buy / resell / escrow flow as a Figma prototype",
      "Price-capped resale and seller credit scores to stop scalping and scams",
      "Pitched with market sizing, revenue model, break-even and 3-year projection",
    ],
    link: "https://www.figma.com/design/oAiwWu1vlNelul8zIpt7fk/Hackathon",
  },
  {
    id: "wifi",
    title: "Wi-Fi Security Pentest",
    short: "Measured how password complexity affects WEP, WPA and WPA2 security.",
    long: "A Project in Cyber Security that simulates attacks on Wi-Fi networks in a controlled lab to measure how resistant they are. The team captured handshakes, ran dictionary attacks against passwords of different complexity, analysed the risks and recommended defences.",
    category: "security",
    thumb: THUMBS.wifi,
    tags: ["Kali Linux", "Aircrack-ng", "Wifite", "Wireshark"],
    role: "Team member",
    type: "Course project",
    year: "2025",
    highlights: [
      "Captured WPA handshakes in monitor mode using deauthentication",
      "Tested 18 passwords across 6 complexity types on WEP, WPA and WPA2",
      "Compared Aircrack-ng and Wifite on success rate and cracking time",
      "Recommended WPA2/WPA3 with long, complex passphrases",
    ],
    link: "#",
  },
];
