import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs } from "@/lib/site";

const title = "Work";
const description =
  "Projects by Rajab Muzaffarov: the Frutera export ERP, AI Avtojavob, Sifat Nazorat QR verification, and sites for Cresta, T-SX and Fimtext.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/" },
  openGraph: { type: "website", url: "/work/", title: `${title} · ${NAME}`, description, images: [OG_IMAGE] },
  twitter: { title: `${title} · ${NAME}`, description },
};

export default function Work() {
  return (
    <main>
      <JsonLd graph={[
        {
          "@type": "CollectionPage",
          "@id": `${SITE}/work/#page`,
          url: `${SITE}/work/`,
          name: `${title} · ${NAME}`,
          description,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          author: { "@id": PERSON_ID },
          hasPart: projects.map(p => ({ "@id": `${SITE}/work/${p.slug}/#project` })),
        },
        breadcrumbs([{ name: "Work", path: "/work/" }]),
      ]} />
      <header className="wrap page-head">
        <ol className="crumbs"><li><Link href="/">Home</Link></li><li>Work</li></ol>
                <h1 className="page-title">Work</h1>
        <p className="page-lede">Things I&apos;ve built or helped build that are running in production.</p>
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
                <p className="desc">{p.summary}</p>
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
