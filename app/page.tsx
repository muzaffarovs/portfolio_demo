import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Lead from "@/components/Lead";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/projects";
import { CV, NAME, PERSON_ID, SITE, WEBSITE_ID, person, website } from "@/lib/site";

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
        <Lead label="Index" links={[
          { href: "/work/", label: "Selected work" },
          { href: "/about/", label: "About" },
          { href: CV, label: "Résumé, PDF", external: true },
        ]}>
          <p>
            Full-stack developer in Tashkent. I build the software a business runs on: AI that answers customers in their DMs,
            QR-verified lab certificates, an export ERP, and the admin panels behind them.
          </p>
        </Lead>
      </section>

      <section className="block" aria-label="Work">
        <WorkIndex />
      </section>

      <Contact />
    </main>
  );
}
