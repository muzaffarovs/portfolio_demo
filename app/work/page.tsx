import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs } from "@/lib/site";

const title = "Work — Projects by Rajab Muzaffarov";
const description =
  "Projects by Rajab Muzaffarov, full-stack developer in Tashkent: Frutera export ERP, AI Avtojavob sales automation, Sifat Nazorat QR verification, Cresta, T-SX and Fimtext.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/work/" },
  openGraph: { type: "website", url: "/work/", title, description, images: [OG_IMAGE] },
  twitter: { title, description },
};

export default function Work() {
  return (
    <main>
      <JsonLd graph={[
        {
          "@type": "CollectionPage",
          "@id": `${SITE}/work/#page`,
          url: `${SITE}/work/`,
          name: title,
          description,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          author: { "@id": PERSON_ID },
          hasPart: projects.map(p => ({ "@id": `${SITE}/work/${p.slug}/#project` })),
        },
        breadcrumbs([{ name: "Work", path: "/work/" }]),
      ]} />
      <header className="wrap page-head">
        <ol className="crumbs"><li><Link href="/">{NAME}</Link></li><li>Work</li></ol>
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title">Work by <span>Rajab Muzaffarov</span></h1>
        <p className="page-lede">Production platforms I&apos;ve built or helped build in Tashkent: an export-logistics ERP, AI sales automation, a QR-verified quality-control system, corporate sites, a CRM and a Telegram bot.</p>
      </header>
      <section className="wrap section" aria-label="Projects">
        <ul className="work-list">
          {projects.map(p => (
            <li key={p.slug} className="reveal">
              <Link href={`/work/${p.slug}/`}>
                <div>
                  <p className="client">{p.client} · {p.category}</p>
                  <h2>{p.name}{p.nameSuffix && <> <span>{p.nameSuffix}</span></>}</h2>
                </div>
                <p className="desc">{p.description}</p>
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Contact />
    </main>
  );
}
