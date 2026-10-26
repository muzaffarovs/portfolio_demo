import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Sec from "@/components/Sec";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/projects";
import { CV, NAME, PERSON_ID, SITE, WEBSITE_ID, person, website } from "@/lib/site";

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "Prisma", "Tailwind CSS", "Telegram Bot API", "Docker"];

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

      <section className="block" aria-labelledby="work-h">
        <div className="wrap">
          <Sec id="work-h" title="Work" note={String(projects.length).padStart(2, "0")} />
          <WorkIndex />
        </div>
      </section>

      <section className="block" id="stack" aria-labelledby="stack-h">
        <div className="wrap">
          <Sec id="stack-h" title="Stack" />
          <p className="big-line reveal">{STACK.join(", ")}.</p>
        </div>
      </section>

      <Contact />
    </main>
  );
}
