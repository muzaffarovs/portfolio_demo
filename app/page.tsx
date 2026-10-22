import Link from "next/link";
import type { CSSProperties } from "react";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { qrPath } from "@/lib/qr";
import { CV, NAME, PERSON_ID, SITE, WEBSITE_ID, person, website } from "@/lib/site";

const v = (i: number) => ({ "--i": i }) as CSSProperties;
const d = (i: number) => ({ "--d": i }) as CSSProperties;

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Supabase", "Tailwind CSS", "TanStack Query", "Zustand", "Zod", "n8n", "Telegram Bot API", "Docker", "Vercel"];

const Letters = ({ text, from }: { text: string; from: number }) => (
  <>{[...text].map((c, i) => <span key={i} className="l" style={v(from + i)}>{c}</span>)}</>
);

const CaseLink = ({ slug, label }: { slug: string; label: string }) => (
  <Link className="case-link" href={`/work/${slug}/`}>Read the {label} case study <span className="arr" aria-hidden="true">→</span></Link>
);

/* Containers the demo loops rewrite are rendered as raw HTML so React never reconciles them. */
const html = (s: string) => ({ __html: s });

const graph = [
  website,
  {
    "@type": "ProfilePage",
    "@id": `${SITE}/#profilepage`,
    url: `${SITE}/`,
    name: "Rajab Muzaffarov — Full-Stack Developer in Tashkent, Uzbekistan",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    primaryImageOfPage: { "@id": `${SITE}/#avatar` },
    dateCreated: "2026-09-15",
    dateModified: "2026-10-22",
  },
  person,
  {
    "@type": "ItemList",
    "@id": `${SITE}/#work`,
    name: `Selected work by ${NAME}`,
    itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/work/${p.slug}/`, name: p.nameSuffix && p.nameSuffix.startsWith("/") ? `${p.name} ${p.nameSuffix}` : p.name })),
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd graph={graph} />
      <header className="hero wrap">
        <div className="hero-text">
          <p className="eyebrow">Salom — I&apos;m</p>
          <h1 className="name"><span className="sr-only">Rajab Muzaffarov, full-stack developer in Tashkent</span>
            <span className="n1" aria-hidden="true"><Letters text="Rajab" from={0} /></span>
            <span className="n2" aria-hidden="true"><Letters text="Muzaffarov" from={3} /></span>
          </h1>
          <p className="role">Full-stack developer in Tashkent, Uzbekistan. I build production web platforms with <b>React, Next.js and TypeScript</b>: AI sales assistants that answer customers in their DMs, QR-verified lab certificates, and the CRMs and admin panels behind them.</p>
          <div className="cta">
            <Link className="btn primary magnetic" href="/work/">See the work <span className="arr" aria-hidden="true">→</span></Link>
            <a className="btn ghost magnetic" href={CV} target="_blank" rel="noopener">Résumé (PDF)</a>
          </div>
          <dl className="facts">
            <div><dt>Experience</dt><dd>2+ years in production</dd></div>
            <div><dt>Focus</dt><dd>React · Next.js · TypeScript</dd></div>
            <div><dt>Tashkent time</dt><dd><span data-clock>--:--</span> · UTC+5</dd></div>
          </dl>
        </div>

        <figure className="swatch">
          <div className="cloth" id="cloth">
            <canvas id="ikat" aria-hidden="true"></canvas>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="me" id="me" src="/avatar.webp" width={820} height={836} alt="Rajab Muzaffarov's avatar: a folded-paper figure in a white mask" fetchPriority="high" draggable={false} />
            <span className="cloth-hint">Move your cursor to light the obsidian</span>
          </div>
          <figcaption className="tag">
            <p className="tag-h">Relic RM-26</p>
            <dl>
              <dt>Forged</dt><dd>TypeScript</dd>
              <dt>Tempered</dt><dd>React / Next.js</dd>
              <dt>Glass</dt><dd>Canvas, cut live</dd>
              <dt>Figure</dt><dd>Folded paper</dd>
              <dt>Origin</dt><dd>Tashkent, UZ</dd>
            </dl>
          </figcaption>
        </figure>
      </header>

      <div className="ticker" aria-label="Tech stack">
        <div className="ticker-track">
          {[0, 1].map(g => (
            <div className="ticker-group" key={g} aria-hidden={g === 1 || undefined}>
              {STACK.map(s => <span key={s + "s"}>{s}</span>).flatMap((el, i) => [el, <i key={i} />])}
            </div>
          ))}
        </div>
      </div>

      <section className="wrap section" id="work">
        <div className="sec-head reveal">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">Platforms that run real business workflows.</h2>
          <p className="sub">Two years of shipping production software, from AI that replies to customers on Instagram to QR codes that prove a lab test happened.</p>
        </div>

        <article className="feature reveal" data-spot>
          <div className="feat-copy">
            <p className="client">Cresta · AI product</p>
            <h3><Link href="/work/ai-avtojavob-aylo/">AI Avtojavob <span>/ Aylo</span></Link></h3>
            <p className="gloss">“Avtojavob” is Uzbek for auto-reply</p>
            <p className="lede">An AI sales assistant for businesses flooded with social-media inquiries. A customer comments under a post, a keyword matches, and a reply written in the business&apos;s own voice lands in their DMs. Instagram, Telegram, Facebook and WhatsApp all run through one platform.</p>
            <ul className="points">
              <li>Keyword-to-post rules that turn Instagram comments into AI direct-message replies</li>
              <li>Custom prompts so each business controls how its assistant talks to customers</li>
              <li>Business and admin consoles for integrations, posts, rules and conversations</li>
              <li>Self-serve onboarding: register and connect channels with minimal setup</li>
            </ul>
            <ul className="chips"><li>AI API integrations</li><li>Social media APIs</li><li>Automation rules</li><li>Admin console</li></ul>
            <CaseLink slug="ai-avtojavob-aylo" label="Aylo" />
          </div>

          <div className="demo" id="demo-aylo" role="img" aria-label="Animated illustration: an Instagram comment asking the price matches a keyword rule, and the AI assistant replies in direct messages.">
            <div className="demo-top">
              <span className="demo-label">Illustrative demo</span>
              <ul className="channels"><li className="ch">Instagram</li><li className="ch">Telegram</li><li className="ch">Facebook</li><li className="ch">WhatsApp</li></ul>
            </div>
            <div className="aylo-grid">
              <div className="post">
                <div className="post-img"><canvas id="post-ikat"></canvas><span>Atlas collection · #atlas</span></div>
                <div className="comments" id="aylo-comments" dangerouslySetInnerHTML={html(
                  `<p class="cm"><b>@malika.uz</b>zo'r chiqibdi! <em class="tr">turned out great!</em></p>` +
                  `<p class="cm new"><b>@dilnoza_shop</b><mark class="lit">narx</mark>i qancha? <em class="tr">how much is it?</em></p>`
                )} />
              </div>
              <div className="dm">
                <div className="dm-head"><span className="av">A</span>Aylo assistant<small>→ @dilnoza_shop</small></div>
                <div className="dm-body" id="aylo-dm" dangerouslySetInnerHTML={html(
                  `<p class="msg ai">Assalomu alaykum! Atlas ko'ylak narxi 249 000 so'm. Toshkent bo'ylab yetkazish bepul. <em class="tr">Hi! The atlas dress is 249,000 so'm. Free delivery across Tashkent.</em></p>` +
                  `<p class="msg me">Bittasini olaman <em class="tr">I'll take one</em></p>` +
                  `<p class="msg ai">Ajoyib! Manzilingizni yuboring. <em class="tr">Great! Send me your address.</em></p>`
                )} />
              </div>
            </div>
            <div className="rule hit" id="aylo-rule"><span className="k">Rule</span>comment has <code>&quot;narx&quot;</code> on <code>#atlas</code> → <b>AI reply in DM</b><span className="state">matched</span></div>
          </div>
        </article>

        <article className="feature flip reveal" data-spot>
          <div className="feat-copy">
            <p className="client">Toshkent Sinov Xizmati · Quality control</p>
            <h3><Link href="/work/sifat-nazorat/">Sifat Nazorat</Link></h3>
            <p className="gloss">Uzbek for “quality control”</p>
            <p className="lede">A quality-control platform for laboratory testing and product certification. Scan the QR code on a product and a verification page, generated from the lab&apos;s database records, shows what was tested and who made it. It was designed around how the lab actually works, not as a static brochure site.</p>
            <ul className="points">
              <li>QR verification that resolves to dynamically generated pages</li>
              <li>Dynamic routes for every product and producer, backed by database records</li>
              <li>Authentication and protected functionality with Supabase Auth</li>
              <li>File and media management wired to external storage</li>
            </ul>
            <ul className="chips"><li>Next.js</li><li>TypeScript</li><li>MongoDB</li><li>Supabase Auth</li></ul>
            <CaseLink slug="sifat-nazorat" label="Sifat Nazorat" />
          </div>

          <div className="demo" id="demo-qr" role="img" aria-label="Animated illustration: a product QR code is scanned and a verification page shows sample test results with a verified stamp.">
            <div className="demo-top">
              <span className="demo-label">Sample record</span>
              <code className="route">/products/<b id="slug">paxta-ip-30-1</b></code>
            </div>
            <div className="qr-grid">
              <div className="scanner" id="scanner">
                <svg id="qr" viewBox="-1 -1 27 27" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true"><path d={qrPath()} /></svg>
                <span className="beam"></span>
              </div>
              <div className="cert" id="cert">
                <p className="cert-h"><span>Verification</span><b>● live record</b></p>
                <dl>
                  <div className="row" style={d(0)}><dt>Product</dt><dd>Paxta ip Ne 30/1 <small>cotton yarn</small></dd></div>
                  <div className="row" style={d(1)}><dt>Producer</dt><dd>Namuna Tekstil <small>(sample)</small></dd></div>
                  <div className="row" style={d(2)}><dt>Tests</dt><dd>Linear density · Tensile strength · Twist</dd></div>
                  <div className="row" style={d(3)}><dt>Protocol</dt><dd>№ 0412/26</dd></div>
                </dl>
                <span className="stamp">Tasdiqlangan<small>verified</small></span>
              </div>
            </div>
          </div>
        </article>

        <article className="feature reveal" data-spot>
          <div className="feat-copy">
            <p className="client">Cresta Systems · Export logistics ERP</p>
            <h3><Link href="/work/frutera/">Frutera</Link></h3>
            <p className="gloss">Team build with Ilyosbek Axmedjanov at Cresta Systems</p>
            <p className="lede">An ERP that replaced the spreadsheets and group chats an agricultural-export company was running on. Customs declarations, CMR waybills and invoices are read by Claude into structured shipments; plain Telegram messages become client payments and agent transfers; and every night a reconciliation pass compares each client&apos;s card against the shared sheet and reports what moved. Four export lines, one system of record.</p>
            <dl className="stats">
              <div><dt>Lines</dt><dd>105k</dd></div>
              <div><dt>Tables</dt><dd>38</dd></div>
              <div><dt>Endpoints</dt><dd>150</dd></div>
              <div><dt>Services</dt><dd>6 <small>on one 2 GB box</small></dd></div>
            </dl>
            <ul className="points">
              <li>Ingest from four sources: watched Telegram groups over MTProto, the Uzbek customs portal behind an E-IMZO digital signature, Google Sheets read back for reconciliation, and a WhatsApp arrival bridge</li>
              <li>Next.js CRM of 40 pages over 150 API endpoints and 38 Postgres tables — shipment board, master grid, client ledgers, cash desks, FX monitor, profit analytics</li>
              <li>Per-line, per-page access grants, an audit trail of every mutation, and nightly encrypted backups delivered over Telegram</li>
              <li>Field entry from a Telegram Mini App and an append-only Android app, with an offline queue and idempotent retry</li>
            </ul>
            <ul className="chips"><li>Next.js 16 · React 19</li><li>TypeScript</li><li>Express · Prisma</li><li>PostgreSQL</li><li>Telegram MTProto</li><li>Claude API</li><li>Google Sheets API</li><li>Docker</li></ul>
            <CaseLink slug="frutera" label="Frutera" />
          </div>

          <div className="demo" id="demo-fru" role="img" aria-label="Animated illustration: a CMR waybill posted in a Telegram group is extracted into a shipment record, then a payment message becomes a client payment, and each record syncs to Google Sheets.">
            <div className="demo-top">
              <span className="demo-label">Illustrative demo</span>
              <code className="route">telegram → <b>claude</b> → postgres → sheets</code>
            </div>
            <div className="fru-grid">
              <div className="dm">
                <div className="dm-head"><span className="av">Y</span>Yuklar guruhi<small>watched chat</small></div>
                <div className="dm-body fru-chat" id="fru-chat" dangerouslySetInnerHTML={html(
                  `<p class="msg ai"><span class="file">CMR_0412.pdf</span>Andijon → Moskva, gilos 20 t <em class="tr">Andijan → Moscow, cherries 20 t</em></p>`
                )} />
              </div>
              <div className="cert" id="fru-rec">
                <p className="cert-h"><span>Record</span><b id="fru-kind">● shipment</b></p>
                <dl id="fru-rows" dangerouslySetInnerHTML={html(
                  `<div class="row" style="--d:0"><dt>Document</dt><dd>CMR waybill</dd></div>` +
                  `<div class="row" style="--d:1"><dt>Cargo</dt><dd>Gilos <small>cherries</small> · 20 t</dd></div>` +
                  `<div class="row" style="--d:2"><dt>Route</dt><dd>Andijon → Moskva</dd></div>` +
                  `<div class="row" style="--d:3"><dt>Client</dt><dd>Namuna Agro <small>(sample)</small></dd></div>`
                )} />
              </div>
            </div>
            <div className="rule hit" id="fru-rule"><span className="k">Sheets</span>record complete → <b>row appended to client ledger</b><span className="state">synced</span></div>
          </div>
        </article>

        <p className="eyebrow sub-h">Also shipped</p>
        <div className="also">
          <article className="card reveal" data-spot>
            <div className="viz" aria-hidden="true">
              <div className="kanban" id="kanban" dangerouslySetInnerHTML={html(
                `<div class="kcol"><p>New</p><div class="kc"><span>Site inquiry</span></div><div class="kc"><span>Telegram lead</span><em>via bot</em></div></div>` +
                `<div class="kcol"><p>In talks</p><div class="kc"><span>Call back</span></div></div>` +
                `<div class="kcol"><p>Won</p><div class="kc"><span>Referral</span></div><div class="kc"><span>Site inquiry</span></div></div>`
              )} />
            </div>
            <div className="card-body">
              <p className="client">Cresta · Uzbekistan</p>
              <h3><Link href="/work/cresta/">Cresta, from day one</Link></h3>
              <p className="desc">Helped build the digital infrastructure of a newly founded development company: its corporate website, a Telegram bot for communication and workflows, and the CRM behind client management. Frontend to backend, development to deployment.</p>
              <ul className="chips"><li>Corporate site</li><li>Telegram bot</li><li>CRM</li></ul>
              <CaseLink slug="cresta" label="Cresta" />
            </div>
          </article>

          <article className="card reveal" data-spot>
            <div className="viz" aria-hidden="true">
              <div className="cms" id="cms">
                <div className="cms-bar"><span>News · Admin</span><b>+ New post</b></div>
                <div className="cms-rows">
                  <div className="cms-row"><span className="th"></span><span className="ln"><i></i><i></i></span><span className="tgl on"></span><span className="cms-state">Live</span></div>
                  <div className="cms-row"><span className="th"></span><span className="ln"><i></i><i></i></span><span className="tgl on" id="tgl"></span><span className="cms-state" id="tgl-state">Live</span></div>
                </div>
                <div className="gal" id="gal"><span></span><span></span><span></span><span></span><span></span><span></span></div>
              </div>
            </div>
            <div className="card-body">
              <p className="client">Toshkent Sinov Xizmati</p>
              <h3><Link href="/work/t-sx/">T-SX corporate site</Link></h3>
              <p className="desc">The official website for a testing-services company: a news CMS, a photo gallery of facilities and events, and an admin interface that keeps public information current. Structured to grow into CRM and internal workflows.</p>
              <ul className="chips"><li>News CMS</li><li>Photo gallery</li><li>Admin panel</li></ul>
              <CaseLink slug="t-sx" label="T-SX" />
            </div>
          </article>

          <article className="card reveal" data-spot>
            <div className="viz" aria-hidden="true">
              <div className="weave" id="weave"><span className="loupe" id="loupe"></span></div>
              <span className="viz-note">Plain weave · loupe ×4</span>
            </div>
            <div className="card-body">
              <p className="client">Textile testing &amp; QC laboratory</p>
              <h3><Link href="/work/fimtext/">Fimtext</Link></h3>
              <p className="desc">The landing page for a textile testing and quality-control lab, presenting its services, capabilities and company information with clear information architecture on desktop and mobile.</p>
              <ul className="chips"><li>Landing page</li><li>Responsive UI</li><li>Information architecture</li></ul>
              <CaseLink slug="fimtext" label="Fimtext" />
            </div>
          </article>
        </div>
      </section>

      <section className="wrap section" id="stack">
        <div className="sec-head reveal">
          <p className="eyebrow">Toolbox</p>
          <h2 className="h2">One TypeScript stack, front to back.</h2>
          <p className="sub">What I ship with, grouped the way it shows up in a project.</p>
        </div>
        <div className="tools">
          {TOOLS.map(([k, items]) => (
            <div className="tool reveal" key={k}><p className="tool-k">{k}<span>{String(items.length).padStart(2, "0")}</span></p><ul>{items.map(t => <li key={t}>{t}</li>)}</ul></div>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}

const TOOLS: [string, string[]][] = [
  ["Languages", ["JavaScript", "TypeScript", "HTML5", "CSS3"]],
  ["Frontend", ["React", "Next.js", "Tailwind CSS", "shadcn/ui"]],
  ["State & data", ["Redux Toolkit", "Zustand", "TanStack Query", "React Hook Form", "Zod"]],
  ["Backend", ["Node.js", "Express.js", "REST APIs"]],
  ["Databases", ["MongoDB", "PostgreSQL", "Supabase"]],
  ["Auth", ["Supabase Auth", "JWT", "HTTP-only cookies"]],
  ["AI & automation", ["AI API integrations", "n8n", "Telegram Bot API", "Social media APIs"]],
  ["DevOps & tools", ["Git & GitHub", "Docker", "Vercel", "Cloudflare", "Linux / WSL"]],
];
