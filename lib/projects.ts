export type Project = {
  slug: string;
  name: string;
  nameSuffix?: string;
  client: string;
  category: string;
  gloss?: string;
  /** <title> without the " · Rajab Muzaffarov" suffix */
  metaTitle: string;
  description: string;
  lede: string;
  context: string[];
  built: string[];
  stack: string[];
  stats?: { label: string; value: string; note?: string }[];
  role: string;
  live?: { label: string; url: string };
  team?: string;
};

export const projects: Project[] = [
  {
    slug: "frutera",
    name: "Frutera",
    client: "Cresta Systems",
    category: "Export-logistics ERP",
    gloss: "Team build with Ilyosbek Axmedjanov at Cresta Systems",
    metaTitle: "Frutera — Export-Logistics ERP by Rajab Muzaffarov",
    description:
      "Frutera is an export-logistics ERP built by Rajab Muzaffarov and Ilyosbek Axmedjanov: Telegram, customs and Google Sheets ingestion, Claude extraction and nightly ledger reconciliation.",
    lede:
      "An ERP that replaced the spreadsheets and group chats an agricultural-export company was running on. Customs declarations, CMR waybills and invoices are read by Claude into structured shipments; plain Telegram messages become client payments and agent transfers; and every night a reconciliation pass compares each client's card against the shared sheet and reports what moved. Four export lines, one system of record.",
    context: [
      "Before Frutera, the business ran on Telegram group chats and a shared Google Sheet. Shipments, customs paperwork, payments and agent transfers were tracked by hand across chats and spreadsheets.",
      "The goal was a single system of record that people would actually use: one that reads the chats and documents they already send instead of asking them to change how they work.",
    ],
    built: [
      "Ingestion from four sources: watched Telegram groups over MTProto, the Uzbek customs portal behind an E-IMZO digital signature, Google Sheets read back for reconciliation, and a WhatsApp arrival bridge",
      "Claude-powered extraction that turns customs declarations, CMR waybills, invoices and free-text Telegram messages into shipments, client payments and agent transfers",
      "A nightly reconciliation pass that compares every client's card with the shared sheet and reports what moved",
      "Next.js CRM of 40 pages over 150 API endpoints and 38 PostgreSQL tables: shipment board, master grid, client ledgers, cash desks, FX monitor and profit analytics",
      "Per-line, per-page access grants, an audit trail of every mutation, and nightly encrypted backups delivered over Telegram",
      "Field entry from a Telegram Mini App and an append-only Android app, with an offline queue and idempotent retry",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Express", "Prisma", "PostgreSQL", "Telegram MTProto", "Claude API", "Google Sheets API", "Docker"],
    stats: [
      { label: "Lines", value: "105k" },
      { label: "Tables", value: "38" },
      { label: "Endpoints", value: "150" },
      { label: "Services", value: "6", note: "on one 2 GB box" },
    ],
    role: "Full-stack developer, team build with Ilyosbek Axmedjanov",
    team: "Ilyosbek Axmedjanov",
  },
  {
    slug: "ai-avtojavob-aylo",
    name: "AI Avtojavob",
    nameSuffix: "/ Aylo",
    client: "Cresta",
    category: "AI sales automation",
    gloss: "“Avtojavob” is Uzbek for auto-reply",
    metaTitle: "AI Avtojavob / Aylo — AI Sales Automation by Rajab Muzaffarov",
    description:
      "AI Avtojavob (Aylo), built by Rajab Muzaffarov: AI sales automation that turns Instagram comments into AI direct-message replies across Instagram, Telegram, Facebook and WhatsApp.",
    lede:
      "An AI sales assistant for businesses flooded with social-media inquiries. A customer comments under a post, a keyword matches, and a reply written in the business's own voice lands in their DMs. Instagram, Telegram, Facebook and WhatsApp all run through one platform.",
    context: [
      "Shops that sell through Instagram and Telegram get the same questions hundreds of times a day: how much is it, is it in stock, do you deliver. Every unanswered comment is a lost sale, and answering by hand doesn't scale.",
      "AI Avtojavob gives those businesses one platform that watches their channels, recognises buying intent and answers in their own tone, so the conversation moves to DMs while the customer is still interested.",
    ],
    built: [
      "A unified platform connecting Instagram, Telegram, Facebook and WhatsApp to automate customer communication and sales workflows",
      "Automated Instagram comment detection: businesses attach keywords to posts, and a matching comment triggers an AI-written direct-message reply",
      "Customisable AI prompts, so each business controls how its assistant talks to potential customers and answers inquiries",
      "Business-facing and admin consoles for managing integrations, posts, automation rules, prompts and customer conversations",
      "A self-serve onboarding flow that lets businesses register and connect their channels with minimal setup",
    ],
    stack: ["AI API integrations", "Social media APIs", "Automation rules", "Admin console"],
    role: "Full-stack developer",
  },
  {
    slug: "sifat-nazorat",
    name: "Sifat Nazorat",
    client: "Toshkent Sinov Xizmati",
    category: "Quality-control platform",
    gloss: "Uzbek for “quality control”",
    metaTitle: "Sifat Nazorat — QR Quality-Control Platform by Rajab Muzaffarov",
    description:
      "Sifat Nazorat, built by Rajab Muzaffarov for Toshkent Sinov Xizmati: a lab quality-control platform with QR-code verification pages, on Next.js and MongoDB.",
    lede:
      "A quality-control platform for laboratory testing and product certification. Scan the QR code on a product and a verification page, generated from the lab's database records, shows what was tested and who made it. It was designed around how the lab actually works, not as a static brochure site.",
    context: [
      "A test certificate is only useful if a buyer can trust it. Paper certificates are easy to copy and hard to check, and a laboratory's records live in its own systems where the public can't see them.",
      "Sifat Nazorat connects the two: each certified product carries a QR code, and scanning it opens a public verification page generated from the lab's own database records.",
    ],
    built: [
      "A QR-based verification system: scanning a product's QR code opens a dynamically generated verification page",
      "Dynamic routes for every product and producer, connecting public verification pages to the underlying database records",
      "Authentication and protected functionality with Supabase Auth",
      "Responsive interfaces for laboratory services, product information, verification workflows and company content",
      "File and media management wired to external storage for uploaded content",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "Supabase Auth", "External storage"],
    role: "Full-stack developer",
  },
  {
    slug: "cresta",
    name: "Cresta",
    nameSuffix: "from day one",
    client: "Cresta · Uzbekistan",
    category: "Website, Telegram bot and CRM",
    metaTitle: "Cresta — Website, Telegram Bot and CRM by Rajab Muzaffarov",
    description:
      "Rajab Muzaffarov helped build the digital infrastructure of Cresta, a new development company in Uzbekistan: its corporate website, a Telegram bot and the CRM behind client management.",
    lede:
      "Helped build the digital infrastructure of a newly founded development company: its corporate website, a Telegram bot for communication and workflows, and the CRM behind client management. Frontend to backend, development to deployment.",
    context: [
      "A brand-new company needs to look established from its first day and needs internal tools before it has an internal team to build them.",
      "I worked across the stack to give Cresta its public face and the systems behind it, from the first commit to production.",
    ],
    built: [
      "The corporate website, the company's primary public-facing web presence",
      "A Telegram bot that supports communication and business workflows",
      "Contributions to the company's CRM system for internal operations and client management",
      "Frontend and backend work delivered through to production deployment",
    ],
    stack: ["Corporate site", "Telegram bot", "CRM"],
    role: "Full-stack developer",
    live: { label: "cresta.uz", url: "https://cresta.uz/" },
  },
  {
    slug: "t-sx",
    name: "T-SX",
    nameSuffix: "corporate site",
    client: "Toshkent Sinov Xizmati",
    category: "Corporate website and CMS",
    metaTitle: "T-SX Corporate Website — Toshkent Sinov Xizmati, by Rajab Muzaffarov",
    description:
      "The official website of Toshkent Sinov Xizmati (T-SX), built by Rajab Muzaffarov: a news CMS, photo gallery and admin interface that keeps the company's public information current.",
    lede:
      "The official website for a testing-services company: a news CMS, a photo gallery of facilities and events, and an admin interface that keeps public information current. Structured to grow into CRM and internal workflows.",
    context: [
      "Toshkent Sinov Xizmati needed a website its own staff could keep up to date without calling a developer for every announcement.",
      "The site presents the company's services, activities and organisational information, and is built to grow into communication and CRM tooling for internal workflows.",
    ],
    built: [
      "The official corporate website presenting the company's services, activities and organisational information",
      "A dynamic news and content management system run from a dedicated admin interface",
      "A photo gallery showcasing the company's activities, facilities and events",
      "A structure ready for ongoing communication and CRM functionality",
    ],
    stack: ["News CMS", "Photo gallery", "Admin panel"],
    role: "Full-stack developer",
    live: { label: "t-sx.uz", url: "https://t-sx.uz/" },
  },
  {
    slug: "fimtext",
    name: "Fimtext",
    client: "Textile testing & QC laboratory",
    category: "Landing page",
    metaTitle: "Fimtext — Textile Laboratory Landing Page by Rajab Muzaffarov",
    description:
      "The official landing page for Fimtext, a textile testing and quality-control laboratory, built by Rajab Muzaffarov with clear information architecture on desktop and mobile.",
    lede:
      "The landing page for a textile testing and quality-control lab, presenting its services, capabilities and company information with clear information architecture on desktop and mobile.",
    context: [
      "Fimtext's clients are manufacturers who need to know quickly whether the lab can test what they make. The page has to answer that in seconds, on whatever device they are holding.",
    ],
    built: [
      "The official landing page for the laboratory",
      "A responsive, modern interface presenting the lab's services, capabilities and company information",
      "Clear information architecture and a consistent experience across desktop and mobile",
    ],
    stack: ["Landing page", "Responsive UI", "Information architecture"],
    role: "Full-stack developer",
  },
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
