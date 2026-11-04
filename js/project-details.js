/* ==========================================================
   Case-study content for project.html?id=<id>
   Written from the project reports (OOP, SRS, Cyber Security)
   and the GitHub READMEs. Every section is optional.
   ========================================================== */

const IMG = "assets/img/projects/";
const CHECK = "check";

const DETAILS = {
  /* ------------------------------------------------------ */
  aecverse: {
    cover: `${IMG}aecverse/cover.jpg`,
    logo: `${IMG}aecverse/logo.png`,
    tagline: "Capstone project built for a real company: a Smart Biogas Digital Twin and industrial metaverse for safety training.",
    client: {
      title: "Built for a real client",
      text: "AEC VERSE is our capstone project, developed for real companies. The requirements came from Accepted Engineering & Consultant Co., Ltd. (AE&C), with support from TITON Engineering & Consultant. We built it as a team of three software developers.",
      companies: [
        { name: "Accepted Engineering & Consultant Co., Ltd.", role: "Client · Requirement owner (AE&C)" },
        { name: "TITON Engineering & Consultant", role: "Supporting company" },
      ],
    },
    stats: [
      { n: "26", l: "Web pages" },
      { n: "32", l: "API endpoints" },
      { n: "21", l: "Real-time socket events" },
      { n: "7,250+", l: "Lines of JavaScript (app + server)" },
    ],
    overview: [
      "Biogas power plants run high-risk processes, with high pressure and flammable gas. Training or emergency drills on the real site are limited by safety and by the cost of stopping the machines.",
      "AEC VERSE brings Digital Twin technology and an Industrial Metaverse together. It simulates the real plant and links it to production data, so staff can learn each step, inspect risk points and rehearse emergencies from anywhere, without being exposed to the hazard. That prevents accidents and lowers the company's costs.",
    ],
    problem: "Hands-on safety training at a biogas plant is dangerous and expensive, and emergency drills on site are limited by safety rules and machine downtime.",
    solution: "A browser-based 3D digital twin of the plant where trainees explore, learn and rehearse emergencies together, with real-time alerts, safety quizzes and certificates.",
    objectives: [
      "Design and develop a 3D Digital Twin web application architecture",
      "Use a metaverse environment for safety inspection and machine management",
      "Build a real-time alert system for emergencies and critical points",
      "Test and evaluate virtual machine management in real use",
      "Make remote plant visits easy for partners and experts",
    ],
    myRole: { title: "My part (web development)", items: ["26-page web app structure", "5 interactive modal types", "Safety Assessment Quizzes", "E-Certificate generation"] },
    clientReqs: {
      title: "Requirements from AE&C",
      sub: "The client's checklist the platform had to deliver.",
      items: [
        "Prepare plant documents for the industrial metaverse",
        "Build a 3D model of the biogas power plant",
        "Choose the metaverse platform for the plant",
        "Set up accounts on the chosen platform",
        "Create 3D avatars for users",
        "Create a space and upload the plant's 3D model",
        "Design the environment around the space",
        "Attach safety information, photos, documents and extra 3D views to each area",
        "Test every feature inside the plant's metaverse",
        "Invite participants to activities such as virtual safety training",
      ],
    },
    screens: [
      { src: `${IMG}aecverse/login.jpg`, t: "Sign in", d: "Login page with a live system-status panel (tanks, pumps, sensors, alarms) and Google sign-in." },
      { src: `${IMG}aecverse/metaverse.jpg`, t: "Metaverse – 3D plant overview", d: "Walk the plant as an avatar, see plant risk and live KPIs, browse 336 structure parts, and adjust models with admin-locked transform tools." },
      { src: `${IMG}aecverse/avatar.jpg`, t: "Avatar", d: "Pick or create a character, choose a walking style and a colour tag that other players see." },
      { src: `${IMG}aecverse/user-management.jpg`, t: "Settings – user management", d: "Admins manage accounts and track each trainee's safety checklist progress. Other users' emails are blurred for privacy." },
    ],
    archDiagram: {
      title: "System architecture",
      sub: "How the browser, server and Supabase talk to each other.",
    },
    sequence: {
      title: "Emergency flow",
      sub: "From a trainee reporting an incident to everyone being moved to the assembly point.",
      actors: ["Trainee", "Server", "Notification", "Every 3D world"],
      steps: [
        { from: 0, to: 1, t: "Send report (with token)" },
        { from: 1, to: 1, t: "Check permissions · 3 gates" },
        { from: 1, to: 2, t: "pushBroadcast" },
        { from: 1, to: 3, t: "emergency_alert" },
        { from: 1, to: 3, t: "emergency_called (evacuation call)" },
        { from: 3, to: 3, t: "warpToPoint → assembly point" },
      ],
    },
    features: [
      { icon: "layout", t: "26-page web app", d: "The full page structure of the platform, from the public portal to training and admin pages." },
      { icon: "target", t: "Interactive modals", d: "Five types of pop-ups that present equipment information, safety steps and warnings during training." },
      { icon: "check", t: "Safety assessment", d: "Quizzes that check each trainee's understanding and score it automatically." },
      { icon: "book", t: "E-Certificate", d: "Trainees who pass receive an electronic certificate." },
      { icon: "zap", t: "Real-time emergencies", d: "An incident report reaches every connected 3D world instantly and moves everyone to the assembly point." },
      { icon: "users", t: "Remote plant visits", d: "Partners and experts can visit the plant in 3D without travelling to the site." },
    ],
    stack: [
      { g: "Frontend & 3D", items: ["JavaScript", "HTML5", "CSS3", "Three.js"] },
      { g: "Server", items: ["Node.js", "Express", "Socket.IO"] },
      { g: "Data & auth", items: ["Supabase Storage", "Supabase Auth"] },
      { g: "Codebase", items: ["13 modules", "32 API endpoints", "21 socket events"] },
    ],
    learnings: [
      "Working from a real client's requirement list and delivering against it.",
      "Structuring a large multi-page app so content stays consistent across 26 pages.",
      "Designing real-time flows where one event must reach every connected user at once.",
    ],
  },

  /* ------------------------------------------------------ */
  mission: {
    cover: `${IMG}mission/cover.jpg`,
    coverPos: "50% 50%",
    coverFit: true,
    logo: `${IMG}mission/logo.png`,
    tagline: "Turn daily tasks into quests: earn XP, level up, unlock trophies and defeat the boss of every mission.",
    stats: [
      { n: "5", l: "Team members" },
      { n: "21%", l: "My share of the work" },
      { n: "4", l: "Quest goal types" },
      { n: "2", l: "Apps: mobile + admin web" },
    ],
    overview: [
      "The world changes fast, so self-improvement has become a skill everyone needs. Yet most people abandon new habits within a few weeks: routines feel repetitive, there is pressure, and results take too long to show.",
      "Mission Life uses game design and behavioural psychology to fix that. Everyday routines become challenging missions, every success gives XP and levels right away, and progress is shown as clear statistics instead of a feeling.",
    ],
    concepts: [
      { t: "Life-to-Game Synthesis", d: "Real-life behaviour becomes character stats, so living your life feels like an adventure." },
      { t: "Visualized Achievement", d: "Invisible effort becomes graphics and statistics you can see and want to keep collecting." },
      { t: "Gamified Discipline", d: "Reward psychology turns hard habits into something fun to repeat." },
    ],
    objectives: [
      "Build an app that records and tracks self-improvement",
      "Motivate users to keep doing useful activities consistently",
      "Turn hard or boring routines into fun challenges through XP and levels",
      "Show progress as clear data and statistics, not just a feeling",
    ],
    myRole: {
      title: "My part (course 1101103, team of 5)",
      items: ["All admin UI designed in Figma", "Back end of the user system", "Login · Register · Forgot Password", "Home · Quest · Trophy · History", "Mission & Create Mission", "Create Character", "Database design & linking all user data"],
    },
    phoneScreens: [
      { src: `${IMG}mission/login.jpg`, t: "Login" },
      { src: `${IMG}mission/home.jpg`, t: "Home: level, XP & stats" },
      { src: `${IMG}mission/quests.jpg`, t: "Quests by category" },
      { src: `${IMG}mission/create-mission.jpg`, t: "Create your mission" },
      { src: `${IMG}mission/set-goal.jpg`, t: "Set your goal & XP" },
      { src: `${IMG}mission/trophy.jpg`, t: "Trophy room" },
      { src: `${IMG}mission/history.jpg`, t: "Mission history" },
    ],
    screens: [
      { src: `${IMG}mission/admin-dashboard.jpg`, t: "Admin dashboard", d: "Total users, feedback and missions, the most popular missions and new accounts per month." },
      { src: `${IMG}mission/admin-quests.jpg`, t: "Admin quest management", d: "See the missions of every user, then edit or delete them." },
      { src: `${IMG}mission/admin-add-mission.jpg`, t: "Admin add mission", d: "Create a mission for one user or send it to everyone (Global)." },
    ],
    features: [
      { icon: "user", t: "Accounts & OTP", d: "Sign up with birthday and age, log in, and reset the password in 3 steps: email, 6-digit OTP, new password." },
      { icon: "users", t: "Create a character", d: "A 4-step RPG-style avatar setup: upload or pick an image, name it, confirm and save." },
      { icon: "layout", t: "Home · Quest · Trophy · History", d: "Level and XP bar with a success/missed chart, daily quests by category, trophies that unlock with levels, and a full XP history." },
      { icon: "target", t: "Create mission", d: "Name and category, 4 goal types (count, collect XP, streak, one-time), units, start date and duration (7, 21 days or custom), with XP calculated automatically." },
      { icon: "zap", t: "Boss battle", d: "Every mission gets a monster. Logging real progress lowers its HP until it is DEFEATED." },
      { icon: "heart", t: "Profile, feedback & guide", d: "Edit profile, change password with OTP, send feedback to the admin and follow tips on every screen." },
    ],
    admin: [
      "Login with an email alert sent on every sign-in",
      "Dashboard: users, feedback, missions, popular missions and new accounts per month",
      "Quest management: view, add, edit and delete missions",
      "Send a mission to one user or to everyone (Global)",
      "Personal: view and edit user accounts",
      "Read and manage feedback from users",
    ],
    architecture: [
      { t: "Mobile app", d: "React Native + Expo screens: Login, Register, Home, Quest, Trophy, History, Create Mission, Battle, Profile, Feedback" },
      { t: "Firebase", d: "Authentication for accounts and Firestore for users, missions and feedback (full create, read, update and delete)" },
      { t: "Admin web", d: "HTML/CSS/JS admin site with a Node.js + Express API (questController.js)" },
      { t: "Device features", d: "Image Picker for the photo library and a native Date Time Picker for birthdays and dates" },
    ],
    stack: [
      { g: "Mobile app", items: ["React Native", "Expo"] },
      { g: "Backend & data", items: ["Firebase Authentication", "Cloud Firestore"] },
      { g: "Admin web", items: ["HTML / CSS / JS", "Node.js", "Express"] },
      { g: "Design & device", items: ["Figma", "Image Picker", "Date Time Picker"] },
    ],
    learnings: [
      "Designing a reward loop (XP, levels, bosses, trophies) that keeps users motivated.",
      "Building the user back end and database so every screen reads and writes the same data.",
      "Designing a full admin interface in Figma before it was built.",
    ],
  },

  /* ------------------------------------------------------ */
  retail: {
    cover: `${IMG}retail/cover.jpg`,
    coverPos: "0 0",
    tagline: "Import a shop's sales file and see the overview, trends, forecast and dead stock in one place.",
    stats: [
      { n: "7", l: "App pages" },
      { n: "3", l: "File formats: .xlsx · .xls · .csv" },
      { n: "3 mo", l: "Forecast horizon" },
      { n: "30/60/90", l: "Day dead-stock thresholds" },
    ],
    overview: [
      "Retail shops collect a lot of sales data but rarely have the time or tools to read it. Most of it sits in Excel files, and answering simple questions (What sells best? What is about to run out? What is not selling at all?) means building pivot tables or a Power BI report.",
      "Retail Insight came out of a student Data Analytics project. The team worked out the analysis, metrics and statistical models; I built this web app so the results could actually be used: import a sales file and every page updates at once. Data is stored in Firebase Firestore and streamed into the app in real time.",
    ],
    objectives: [
      "Turn the Data Analytics team's metrics and models into a working web app",
      "Let users import sales from Excel / CSV or enter it by hand, with no Excel or Power BI needed",
      "Show the overview, trends, forecast and stock risks in one consistent interface",
      "Keep every page in sync from one real-time data source",
    ],
    myRole: {
      title: "Web app development (frontend + Firebase)",
      items: ["All 7 pages in React", "Charts with Recharts", "Firestore data layer (real-time)", "Excel / CSV import", "Forecast & statistics in code", "Deploy on Vercel"],
    },
    features: [
      { icon: "layout", t: "Dashboard", d: "Total sales, net profit, bill count and average order value, a sales trend for 7, 30 or 90 days, top-5 products, peak sales hours and dead-stock / low-stock alerts." },
      { icon: "arrow", t: "Sales trends", d: "Daily sales, share of sales by category, a peak-hour heatmap and best / slow sellers, filterable by category." },
      { icon: "target", t: "Sales forecast", d: "Next month's demand from Linear Regression (Y = Intercept + Slope × MonthIndex), with an Actual vs Forecast chart and a 3-month outlook." },
      { icon: "bulb", t: "AI Insight", d: "Ranks which products to reorder first within a budget (greedy optimisation) and gives strategy tips on cash flow, ROI and safety stock." },
      { icon: "folder", t: "Product management", d: "Product list with stock, cost, price and status (best-seller / normal / low stock), search, filters and CSV export." },
      { icon: "zap", t: "Dead stock", d: "Flags products unsold for over 30, 60 or 90 days and calculates how much cash is tied up in them." },
      { icon: "server", t: "Data & statistics", d: "Import .xlsx / .xls / .csv or enter sales by hand, plus per-product statistics: mean, standard deviation, coefficient of variation, price elasticity and inventory turnover." },
    ],
    highlight: {
      title: "From an analytics report to a tool people can use",
      text: [
        "The team's analysis lived in spreadsheets and formulas. To make it usable I moved the calculations into code: the regression forecast, the descriptive statistics and the dead-stock rules all run in the browser on whatever data is loaded.",
        "Every page reads from one shared React context that listens to Firestore in real time, so importing a file updates the dashboard, forecast and statistics immediately without reloading.",
      ],
    },
    screens: [
      { src: `${IMG}retail/dashboard.jpg`, t: "Dashboard", d: "KPI cards, sales trend, top-5 products, peak sales time and stock alerts." },
      { src: `${IMG}retail/trends.jpg`, t: "Sales trends", d: "Daily sales, category share, peak-hour heatmap and best / slow sellers." },
      { src: `${IMG}retail/forecast.jpg`, t: "Sales forecast", d: "Linear Regression demand forecast with slope, intercept and the fitted equation." },
      { src: `${IMG}retail/data.jpg`, t: "Data & statistics", d: "CV, price elasticity, inventory turnover and descriptive statistics per product." },
      { src: `${IMG}retail/products.jpg`, t: "Product management", d: "Stock, cost, price and status for every product, with CSV / Excel export." },
      { src: `${IMG}retail/ai.jpg`, t: "AI Insight", d: "Decision support: reorder priorities within a budget and strategy suggestions." },
    ],
    stack: [
      { g: "Frontend", items: ["React 19", "Vite", "Tailwind CSS v4", "React Router"] },
      { g: "Charts", items: ["Recharts"] },
      { g: "Data", items: ["Firebase Firestore (real-time)", "SheetJS (xlsx)", "PapaParse"] },
      { g: "Deploy", items: ["Vercel"] },
    ],
    learnings: [
      "Turning another team's analysis and formulas into reliable code.",
      "Designing one real-time data layer that every page shares.",
      "Parsing messy Excel / CSV files with flexible column matching (Thai and English headers).",
    ],
  },

  /* ------------------------------------------------------ */
  stockmb: {
    cover: `${IMG}stockmb/dashboard-sales.jpg`,
    tagline: "A basic stock management and point-of-sale system for small and medium shops.",
    stats: [
      { n: "12", l: "Classes" },
      { n: "33", l: "Methods" },
      { n: "8", l: "Database tables" },
      { n: "18%", l: "My share of a 6-person team" },
    ],
    overview: [
      "Many shops still track stock by hand or in Excel, so counts drift, items run out unnoticed, stock gets reordered twice, and owners lack clear numbers to make decisions.",
      "StockMB brings a shop's core workflow into one desktop app: import stock, sell at the counter, deduct stock automatically, and report sales and costs as charts. It was built for two courses: OOP & Data Structures (1101093) and Software Engineering (1101163), where we wrote the full SRS.",
    ],
    objectives: [
      "Store and track inventory systematically and efficiently",
      "Show stock-in/stock-out and inventory status in real time to support the owner's decisions",
      "Protect data with role-based access (Owner/Admin vs Staff), in line with PDPA",
      "Reduce stock-checking mistakes and duplicate purchase orders",
    ],
    myRole: {
      title: "System design & development",
      items: ["Dashboard (sales & import analytics)", "Product Management", "Employee Data", "Database design"],
    },
    screens: [
      { src: `${IMG}stockmb/dashboard-sales.jpg`, t: "Sales dashboard", d: "Revenue vs import cost, viewable by day, month or year." },
      { src: `${IMG}stockmb/dashboard-import.jpg`, t: "Import dashboard", d: "Expenses: product imports, staff salaries and the total." },
      { src: `${IMG}stockmb/sales-history.jpg`, t: "Sales history", d: "Every sale with quantity, seller and timestamp; searchable by name or category." },
      { src: `${IMG}stockmb/product-stats.jpg`, t: "Per-product statistics", d: "Units in and out, revenue and cost for every product." },
      { src: `${IMG}stockmb/pos.jpg`, t: "Point of sale", d: "Pick products, add them to the cart and see the running receipt." },
      { src: `${IMG}stockmb/pos-checkout.jpg`, t: "Checkout", d: "Confirming payment saves the sale and deducts stock automatically." },
      { src: `${IMG}stockmb/products.jpg`, t: "Product management", d: "Add, edit, delete and restock products, with search and category filters." },
      { src: `${IMG}stockmb/add-product.jpg`, t: "Add product", d: "Image, code, name, category, quantity and unit price." },
      { src: `${IMG}stockmb/excel-import.jpg`, t: "Bulk import from Excel", d: "Load many products at once from a spreadsheet." },
      { src: `${IMG}stockmb/employees.jpg`, t: "Employee data (Admin)", d: "Position, salary, qualifications, account and active status." },
      { src: `${IMG}stockmb/login.jpg`, t: "Login", d: "Accounts are created by the admin; users can reset their password via a registered email." },
    ],
    diagrams: [
      { src: `${IMG}stockmb/context-diagram.jpg`, t: "Context diagram" },
      { src: `${IMG}stockmb/dfd-level0.jpg`, t: "Data flow diagram, level 0" },
      { src: `${IMG}stockmb/use-case.jpg`, t: "Use case diagram" },
      { src: `${IMG}stockmb/er-diagram.jpg`, t: "ER diagram" },
      { src: `${IMG}stockmb/relational.jpg`, t: "Relational model (8 tables)" },
      { src: `${IMG}stockmb/class-diagram.jpg`, t: "Class diagram" },
    ],
    oop: [
      { t: "Inheritance", d: "TimeDisplay.js is a parent class for Thai date/time display that every page reuses. In auth.js, Staff inherits from the general employee and adds page-access rules.", img: `${IMG}stockmb/code-inheritance.jpg` },
      { t: "Polymorphism", d: "One IPC entry point in main.js serves different statistics (sales, cost, salaries) depending on which screen asks.", img: `${IMG}stockmb/code-polymorphism.jpg` },
      { t: "Aggregation", d: "The sales cart in productsales.js groups products temporarily. Removing an item from the cart never touches the master product data.", img: `${IMG}stockmb/code-cart.jpg` },
      { t: "Composition", d: "Each sales_history record must belong to an existing product ID. Checkout runs inside a database transaction.", img: `${IMG}stockmb/code-transaction.jpg` },
      { t: "File input", d: "import-products-bulk validates Excel rows and inserts them in one SQLite transaction.", img: `${IMG}stockmb/code-bulk-import.jpg` },
      { t: "Role guard", d: "Staff accounts are redirected away from admin-only pages such as employee data.", img: `${IMG}stockmb/code-auth.jpg` },
    ],
    requirements: [
      { t: "Login system", d: "Validates username and password, assigns the Admin or Staff role and creates a session. It reports a failed login or a suspended account." },
      { t: "Product management", d: "Add, edit, delete and search products. Price and quantity must be ≥ 0, and changes update inventory immediately." },
      { t: "Stock monitoring", d: "Compares current stock with the minimum level and shows the status by colour: normal, warning or out of stock." },
      { t: "Product sales", d: "Quantity must be greater than 0 and not exceed stock. Each sale is saved, stock is deducted and the sales report updates." },
      { t: "Employee management", d: "Name is required and the role must be Admin or Staff. Changing the role changes which pages a user can open." },
    ],
    stack: [
      { g: "Desktop", items: ["Electron", "IPC (main ↔ renderer)"] },
      { g: "Database", items: ["SQLite (sqlite3)", "Transactions"] },
      { g: "UI", items: ["HTML", "CSS", "JavaScript"] },
      { g: "Design docs", items: ["SRS", "Context / DFD", "Use case", "ER & relational", "Class diagram"] },
    ],
    future: [
      "Mobile app (iOS / Android) for checking stock on the go",
      "Real-time alerts for low or expiring stock via LINE / email",
      "Multi-branch stock and sales separation",
      "Barcode / RFID scanning",
      "Automatic backup & recovery",
    ],
  },

  /* ------------------------------------------------------ */
  chainpass: {
    cover: `${IMG}chainpass/cover.jpg`,
    tagline: "A secure ticket marketplace that ends sold-out frustration, scalped tickets and fake-ticket scams, built on smart contracts.",
    stats: [
      { n: "15,000", l: "Tickets targeted in year 1" },
      { n: "฿40", l: "Fee per resale transaction" },
      { n: "4:1", l: "LTV : CAC ratio" },
      { n: "Year 3", l: "Projected to turn a profit" },
    ],
    overview: [
      "This project came from a hackathon. Our team picked the CP ALL research topic \"Designing a Blockchain-Based Thai Lottery System\". The paper shows that smart contracts can stop fraud, price gouging and disputes over who owns a ticket. We applied the same insight to a market with the same problems: concert and event tickets.",
      "Today's tickets (paper or plain e-tickets) are hard to verify. A screenshot of a QR code can be sold again and again, scalpers hoard tickets and resell them at 2 to 3 times the price, and fans often pay a stranger on social media for a ticket that never arrives.",
      "ChainPass is our answer: one platform for both first-hand sales and resale, where every ticket is a blockchain record with exactly one owner, payment goes through an escrow wallet, and resale prices are capped. <b>It is an idea and a Figma prototype for the competition, not a working product.</b>",
    ],
    concepts: [
      { t: "Smart Contract tickets", d: "Each ticket lives on the blockchain with one real owner, so it can't be copied or sold twice." },
      { t: "Built-in Digital Wallet", d: "Payments and refunds run through an in-app wallet, so money and ticket change hands inside the system at the same moment (escrow)." },
      { t: "End-to-end control", d: "First-hand sales and the resale market sit on the same platform, so the rules (price cap, ownership) follow the ticket everywhere." },
    ],
    goalsTitle: "Who It's For",
    objectivesLabel: "Customer segments & impact",
    objectives: [
      "B2C: fans who missed out and are afraid of being scammed or paying 2 to 3 times the price for a resale ticket",
      "B2C: sellers who can't attend and want to pass a ticket on quickly without looking like a scammer",
      "B2B: promoters who want a trustworthy, easy system and protection for their brand from fake tickets",
      "Expected impact: no fake tickets, fair resale prices, and promoters getting customer data they can trust",
    ],
    features: [
      { icon: "layout", t: "Browse events", d: "Concerts, sports, theatre and more, with search and an event detail page." },
      { icon: "target", t: "Zone & seat map", d: "Pick a zone on the venue map (standing or seated) and see the ticket details before buying." },
      { icon: "arrow", t: "Resale with a price cap", d: "Sellers list a ticket from \"My tickets\". The system caps the resale price at 100% of face value, so no scalping." },
      { icon: "server", t: "Checkout with C-Wallet", d: "Pay from the in-app wallet with a clear price breakdown and service fee." },
      { icon: "check", t: "Escrow & approval", d: "The buyer's money is held in escrow until the seller approves, then the ticket is reissued on the blockchain to the new owner." },
      { icon: "zap", t: "Wallet top-up", d: "Add money by PromptPay QR, bank transfer or card." },
      { icon: "users", t: "Seller credit score", d: "Every seller has a score, sales history and ratings, so buyers can check who they're dealing with." },
    ],
    highlight: {
      title: "How ChainPass compares to today's ticket apps",
      text: [
        "Market leaders mainly sell first-hand tickets as paper, PDF or in-app QR codes that can be screenshotted and resold. Resale happens outside the app, where buyers risk transferring money and getting nothing.",
        "ChainPass covers the whole journey: blockchain tickets that can't be copied, an escrow wallet that swaps money and ticket at the same time, a price cap on resale, and a credit score that shows whether a seller has a history of cancelling.",
      ],
    },
    business: [
      { icon: "target", t: "Market size", d: "TAM: Thai ticketing and entertainment ~฿6,000M/yr. SAM: resale market ~฿1,500M/yr. SOM: concert fans in Bangkok in year 1 ~฿45M/yr (2.5% of SAM)." },
      { icon: "zap", t: "Revenue streams", d: "B2B: annual licence for promoters (฿300,000 to ฿500,000 per company per year, unlimited events). B2C: ฿40 fee per transaction, built on volume." },
      { icon: "tool", t: "Costs", d: "Core team of 8, cloud and blockchain gas fees, marketing and operations: a burn rate of about ฿440,000 a month (฿5.28M a year)." },
      { icon: "bulb", t: "Break-even & projection", d: "Break-even around month 13 for B2B licences and month 25 for pay-per-use. Projected loss in years 1 and 2, then +฿18.37M net profit in year 3 at an LTV:CAC of 4:1." },
    ],
    screens: [
      { src: `${IMG}chainpass/home.jpg`, t: "Event listing", d: "Browse concerts and events, with search and category tabs." },
      { src: `${IMG}chainpass/seats.jpg`, t: "Zone & seat map", d: "Event details, ticket summary and the venue zone map." },
      { src: `${IMG}chainpass/resale.jpg`, t: "Resell a ticket", d: "Resale form with the price capped at 100% of face value." },
      { src: `${IMG}chainpass/checkout.jpg`, t: "Checkout with C-Wallet", d: "Order summary, wallet balance and service fee." },
      { src: `${IMG}chainpass/escrow.jpg`, t: "Escrow approval", d: "Money held safely until the seller approves the transfer." },
      { src: `${IMG}chainpass/wallet.jpg`, t: "C-Wallet top-up", d: "Wallet balance and top-up by PromptPay, bank transfer or card." },
      { src: `${IMG}chainpass/credit.jpg`, t: "Seller credit & history", d: "Seller score, earnings and transaction history." },
    ],
    stack: [
      { g: "Design", items: ["Figma (UX/UI prototype)"] },
      { g: "Pitch", items: ["Canva pitch deck"] },
      { g: "Concept tech", items: ["Blockchain", "Smart Contract", "Digital Wallet / Escrow"] },
    ],
    learnings: [
      "Taking an insight from a research paper and applying it to a different industry.",
      "Designing a complete user flow (buy, resell, escrow, wallet) as a clickable prototype under hackathon time pressure.",
      "Thinking like a startup: customer segments, personas, market sizing, revenue model and break-even.",
    ],
  },

  /* ------------------------------------------------------ */
  wifi: {
    tagline: "How strong is your Wi-Fi password, really? We measured it.",
    stats: [
      { n: "3", l: "Security levels: WEP, WPA, WPA2" },
      { n: "18", l: "Test passwords in 6 complexity types" },
      { n: "2", l: "Tools compared" },
      { n: "100%", l: "WEP networks cracked" },
    ],
    overview: [
      "Attackers often gain access to organisations through weak Wi-Fi. This project studied their methods by simulating a penetration test, so we could measure how password complexity and security level affect how easily a network is cracked.",
      "All testing was done on our own router in a controlled lab, with permission and for education only. No third-party network was attacked.",
    ],
    objectives: [
      "Study how attackers find and exploit weaknesses in wireless networks",
      "Analyse password weaknesses through a simulated penetration test",
      "Measure cracking time and compare tools",
      "Turn the findings into practical advice for using Wi-Fi safely",
    ],
    lab: [
      { g: "Hardware", items: ["Notebook", "USB Wi-Fi adapter (monitor mode)", "Wireless router (test target)"] },
      { g: "Software", items: ["Kali Linux", "aircrack-ng", "airodump-ng", "aireplay-ng", "Wireshark", "Wifite", "VMware / VirtualBox"] },
    ],
    steps: [
      { t: "Monitor mode", d: "Put the USB adapter into monitor mode (airmon-ng) and stop interfering processes." },
      { t: "Reconnaissance", d: "Scan nearby networks with airodump-ng, then lock onto the target BSSID and channel and save the capture." },
      { t: "Force a handshake", d: "For WPA/WPA2, send deauthentication frames (aireplay-ng) so a client reconnects and the 4-way handshake can be captured." },
      { t: "Verify capture", d: "Confirm the EAPOL packets of the handshake in Wireshark." },
      { t: "Crack", d: "Run dictionary or brute-force attacks with aircrack-ng (rockyou.txt), then repeat the whole flow automatically with Wifite and compare the timings." },
    ],
    screens: [
      { src: `${IMG}wifi/monitor-mode.jpg`, t: "Monitor mode enabled", d: "USB adapter switched to monitor mode." },
      { src: `${IMG}wifi/target-capture.jpg`, t: "Targeting the test router", d: "airodump-ng locked onto the lab BSSID and channel." },
      { src: `${IMG}wifi/deauth.jpg`, t: "Deauthentication", d: "Forcing the client to reconnect." },
      { src: `${IMG}wifi/wpa-handshake.jpg`, t: "WPA handshake captured", d: "Shown at the top right of airodump-ng." },
      { src: `${IMG}wifi/eapol-wireshark.jpg`, t: "EAPOL packets", d: "Handshake verified in Wireshark." },
      { src: `${IMG}wifi/wep-key-found.jpg`, t: "WEP key found", d: "Decrypted 100% correctly." },
      { src: `${IMG}wifi/wpa-key-found.jpg`, t: "WPA key found", d: "A dictionary word cracked in seconds." },
    ],
    /* success rate (%) per password type: [WEP-Aircrack, WEP-Wifite, WPA-A, WPA-W, WPA2-A, WPA2-W] */
    results: {
      cols: ["WEP", "WPA (TKIP)", "WPA2 (AES)"],
      tools: ["Aircrack-ng", "Wifite"],
      rows: [
        { t: "Letters only", ex: "password, security", v: [100, 100, 100, 100, 100, 100] },
        { t: "Digits only", ex: "87456321", v: [100, 100, 100, 66.66, 100, 66.66] },
        { t: "Letters + digits", ex: "superstar2207", v: [100, 100, 100, 100, 100, 100] },
        { t: "Upper + lower + digits", ex: "ThAilAnD2024", v: [100, 100, 0, 0, 0, 0] },
        { t: "Lower + digits + symbols", ex: "sh@zz@m00", v: [100, 100, 66.66, 66.66, 66.66, 66.66] },
        { t: "Upper + lower + digits + symbols", ex: "Th@ngY0u!234", v: [100, 100, 0, 0, 0, 0] },
      ],
    },
    findings: [
      { t: "WEP is broken", d: "Every password type was cracked at a 100% success rate, simple or complex. WEP should never be used." },
      { t: "WPA / WPA2 depend on the password", d: "Dictionary words fell instantly (\"password\" in 00:00:00), while passwords mixing cases, digits and symbols were never cracked (0%)." },
      { t: "Aircrack-ng vs Wifite", d: "Aircrack-ng was faster and more precise for experts. Wifite automates the whole flow and suits beginners, but was slower and failed on harder passwords." },
      { t: "Complexity matters most", d: "Password complexity was the single biggest factor. Use WPA2/WPA3 with a long passphrase that isn't in any wordlist." },
    ],
    stack: [
      { g: "Attack tools", items: ["aircrack-ng", "airodump-ng", "aireplay-ng", "Wifite"] },
      { g: "Analysis", items: ["Wireshark", "rockyou.txt wordlist"] },
      { g: "Environment", items: ["Kali Linux", "Virtual machines", "USB Wi-Fi adapter"] },
    ],
  },

};
