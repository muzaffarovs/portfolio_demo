import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import WorkIndex from "@/components/WorkIndex";
import { getProject, projects } from "@/lib/projects";
import { CV, NAME, PERSON_ID, SITE, WEBSITE_ID, person, website } from "@/lib/site";

const STACK: [string, string[]][] = [
  ["Languages", ["TypeScript", "JavaScript", "SQL"]],
  ["Frontend", ["React", "Next.js", "Tailwind CSS", "TanStack Query", "Zustand", "Zod"]],
  ["Backend", ["Node.js", "Express", "REST APIs", "Prisma", "Telegram Bot API", "n8n"]],
  ["Data", ["PostgreSQL", "MongoDB", "Supabase"]],
  ["Shipping", ["Docker", "Vercel", "Cloudflare", "Linux", "Git"]],
];

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
    dateModified: "2026-10-26",
  },
  person,
  {
    "@type": "ItemList",
    "@id": `${SITE}/#work`,
    name: `Selected work by ${NAME}`,
    itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/work/${p.slug}/`, name: p.nameSuffix?.startsWith("/") ? `${p.name} ${p.nameSuffix}` : p.name })),
  },
];

export default function Home() {
  const frutera = getProject("frutera")!;
  return (
    <main>
      <JsonLd graph={graph} />

      <section className="hero">
        <div className="wrap">
          <h1 className="display" aria-label="Rajab Muzaffarov, full-stack developer in Tashkent">
            <span aria-hidden="true">Rajab</span>
            <span aria-hidden="true">Muzaffarov</span>
          </h1>
        </div>
        <div className="wrap grid hero-foot">
          <p className="label col-label">Index</p>
          <p className="statement">
            Full-stack developer in Tashkent. I build the software a business runs on: AI that answers customers in their DMs,
            QR-verified lab certificates, an export ERP, and the admin panels behind them.
          </p>
          <ul className="hero-links">
            <li><Link href="/work/">Selected work</Link></li>
            <li><Link href="/about/">About</Link></li>
            <li><a href={CV} target="_blank" rel="noopener">Résumé, PDF</a></li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="work-h">
        <div className="wrap grid section-head">
          <h2 className="label col-label" id="work-h">Selected work</h2>
          <p className="count">{String(projects.length).padStart(2, "0")} projects</p>
        </div>
        <div className="wrap"><WorkIndex /></div>
      </section>

      <section className="section" aria-labelledby="fig-h">
        <div className="wrap grid">
          <h2 className="label col-label" id="fig-h">In figures</h2>
          <div className="figures-body">
            <p className="figures-intro reveal">
              <Link href="/work/frutera/">Frutera</Link>, the export ERP I built with {frutera.team}. It reads customs papers and Telegram
              chats and reconciles every client ledger overnight.
            </p>
            <dl className="figures reveal">
              {frutera.stats!.map(s => (
                <div key={s.label}><dt>{s.label}{s.note && <> <small>{s.note}</small></>}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" id="stack" aria-labelledby="stack-h">
        <div className="wrap grid">
          <h2 className="label col-label" id="stack-h">Stack</h2>
          <div className="stack reveal">
            {STACK.map(([k, items]) => (
              <div key={k}>
                <h3>{k}</h3>
                <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
