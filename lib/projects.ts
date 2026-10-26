export type Project = {
  slug: string;
  name: string;
  nameSuffix?: string;
  client: string;
  category: string;
  gloss?: string;
  /** <title> before the " · Rajab Muzaffarov" suffix */
  metaTitle: string;
  description: string;
  lede: string;
  /** one line for the work index */
  summary: string;
  built: string[];
  stack: string[];
  stats?: { label: string; value: string; note?: string }[];
  role: string;
  live?: { label: string; url: string };
  team?: string;
  /** screenshot of the live product, 1440×900 */
  image?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "frutera",
    name: "Frutera",
    client: "Cresta Systems",
    category: "Export-logistics ERP",
    gloss: "Team build with Ilyosbek Axmedjanov at Cresta Systems",
    metaTitle: "Frutera: export-logistics ERP",
    description:
      "Frutera: an ERP for an agricultural exporter. Reads customs declarations, waybills and Telegram messages into shipments and payments, and reconciles every client ledger nightly.",
    summary: "ERP for an agricultural exporter. Customs papers and Telegram chats in, ledgers out.",
    lede:
      "An ERP that replaced the spreadsheets and group chats an agricultural-export company was running on. Customs declarations, CMR waybills and invoices are read by Claude into structured shipments; plain Telegram messages become client payments and agent transfers; and every night a reconciliation pass compares each client's card against the shared sheet and reports what moved.",
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
    role: "Full-stack developer",
    team: "Ilyosbek Axmedjanov",
  },
  {
    slug: "ai-avtojavob-aylo",
    name: "AI Avtojavob",
    nameSuffix: "/ Aylo",
    client: "Cresta",
    category: "AI sales automation",
    gloss: "“Avtojavob” is Uzbek for auto-reply",
    metaTitle: "AI Avtojavob (Aylo): AI replies for Instagram and Telegram sellers",
    description:
      "AI Avtojavob (Aylo): a comment under an Instagram post matches a keyword and the customer gets an AI-written DM in the shop's own voice. Instagram, Telegram, Facebook, WhatsApp.",
    summary: "Instagram comment matches a keyword, the customer gets an AI reply in DMs.",
    lede:
      "An AI sales assistant for businesses flooded with social-media inquiries. A customer comments under a post, a keyword matches, and a reply written in the business's own voice lands in their DMs. Instagram, Telegram, Facebook and WhatsApp all run through one platform.",
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
    metaTitle: "Sifat Nazorat: QR verification for lab certificates",
    description:
      "Sifat Nazorat for Toshkent Sinov Xizmati: scan the QR code on a certified product and see the lab record behind it. Next.js, MongoDB, Supabase Auth.",
    summary: "Scan the QR on a certified product, see the lab record behind it.",
    lede:
      "A quality-control platform for laboratory testing and product certification. Scan the QR code on a product and a verification page, generated from the lab's database records, shows what was tested and who made it.",
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
    metaTitle: "Cresta: website, Telegram bot and CRM",
    description:
      "Cresta's corporate website, its Telegram bot and parts of the CRM behind client management, frontend to deployment.",
    summary: "Corporate site, Telegram bot and CRM work for a new development company.",
    lede:
      "Helped build the digital infrastructure of a newly founded development company: its corporate website, a Telegram bot for communication and workflows, and the CRM behind client management.",
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
    metaTitle: "T-SX: Toshkent Sinov Xizmati website",
    description:
      "The Toshkent Sinov Xizmati website at t-sx.uz: news CMS, photo gallery and an admin panel the staff run themselves.",
    summary: "Company site with a news CMS and gallery the staff update themselves.",
    lede:
      "The official website for a testing-services company: a news CMS, a photo gallery of facilities and events, and an admin interface that keeps public information current.",
    built: [
      "The official corporate website presenting the company's services, activities and organisational information",
      "A dynamic news and content management system run from a dedicated admin interface",
      "A photo gallery showcasing the company's activities, facilities and events",
    ],
    stack: ["News CMS", "Photo gallery", "Admin panel"],
    role: "Full-stack developer",
    live: { label: "t-sx.uz", url: "https://t-sx.uz/" },
    image: { src: "/work/t-sx.webp", alt: "The t-sx.uz home page: the Toshkent Sinov Xizmati name set large over 3D molecules, with a navigation bar in Uzbek." },
  },
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
