# Sombatchai Khamkhao — Developer Portfolio

Personal portfolio of **Sombatchai Khamkhao (สมบัติชัย คำขาว)**, a third-year Digital Technology student at Suranaree University of Technology (SUT), looking for a **Software Developer CWIE internship**.

The site tells my story as a cinematic scroll: each project is a chapter with real screenshots, followed by a detailed case study page.

![Home page](assets/img/readme/home.jpg)

## Projects featured

| Project | What it is | Stack |
| --- | --- | --- |
| **AEC VERSE** – Smart Biogas Digital Twin | Capstone built for a real company: an industrial metaverse and digital twin for safety training (26 pages, 32 API endpoints, real-time sockets) | JavaScript, Three.js, Node.js, Express, Socket.IO, Supabase |
| **MissionLife** – Gamified Habit Tracker | Mobile app that turns real-life goals into quests, XP, trophies and boss battles | React Native, Expo, Firebase, Figma |
| **Retail Insight** – Retail Sales Analytics | Web app for a Data Analytics team: import sales files and see the dashboard, trends, a Linear Regression forecast and dead stock | React 19, Vite, Tailwind CSS, Recharts, Firebase Firestore |
| **StockMB** – Inventory Management System | Desktop stock and point-of-sale system for small shops, with a full SRS | Electron, JavaScript, SQLite |
| **ChainPass** – Blockchain Ticketing (Hackathon) | Hackathon concept and Figma prototype: smart-contract tickets, escrow wallet and price-capped resale | Figma, Blockchain concept |
| **Wi-Fi Security Pentest** | Lab study of how password complexity affects WEP / WPA / WPA2 security | Kali Linux, Aircrack-ng, Wifite, Wireshark |

Each project has its own case study: overview, goals and role, features, diagrams, screenshots, tech stack and lessons learned.

![Case study page](assets/img/readme/case-study.jpg)

## Highlights of the site

- **Cinematic scroll story** on the home page, driven by scroll progress (CSS custom properties updated every frame) with smooth scrolling from Lenis
- **Data-driven content**: every page is rendered from plain JavaScript data files, so adding a project means adding one object
- **Case study pages** generated from the same data: stats, SVG architecture and sequence diagrams, screenshot galleries with a lightbox, phone mock-ups
- **No framework, no build step**: plain HTML, CSS and JavaScript
- Responsive layout with a mobile menu, and reduced-motion support

## Tech

- HTML5, CSS3 (custom properties, container queries, `clip-path`, masks)
- Vanilla JavaScript (ES2020+)
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- Google Fonts: Barlow, Barlow Condensed, Inter, JetBrains Mono, Noto Sans Thai

## Project structure

```
.
├── index.html             Home page (scroll story: intro, work, skills, about, contact)
├── project.html           Case study page (project.html?id=<project-id>)
├── css/
│   ├── story.css          Home page styles and scroll animations
│   ├── style.css          Shared base styles
│   ├── project.css        Case study layout
│   └── theme-console.css  Case study theme
├── js/
│   ├── data.js            Profile, skills and contact details
│   ├── projects.js        Project list (title, tags, role, year, link)
│   ├── project-details.js Case study content for each project
│   ├── story.js           Home page rendering and scroll engine
│   ├── main.js            Shared header, footer, reveals and lightbox
│   └── project-page.js    Case study rendering
├── assets/img/            Photos and project screenshots
└── cv/                    Resume (PDF)
```

## Run locally

Any static file server works. For example:

```bash
npx http-server -p 5500 -c-1
```

Then open http://localhost:5500.

## Editing the content

- **Profile, skills, contact**: `js/data.js`
- **Add or change a project**: add an entry to `js/projects.js` and its case study to `js/project-details.js` (the `id` must match), then put images in `assets/img/projects/<id>/`
- **Resume**: replace the PDF in `cv/`

## Notes

- Retail Insight screenshots use the sample data that ships with that project's repository, not real shop data.
- ChainPass is a hackathon idea and prototype; it has not been built as a working product.
- Other people's personal details in screenshots have been blurred.

## Contact

- Email: schkkh0@gmail.com
- GitHub: [@sombatchai](https://github.com/sombatchai)

© 2026 Sombatchai Khamkhao. The code is free to learn from; the photos, screenshots and resume are mine, so please don't reuse them.
