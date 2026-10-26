import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import WorkIndex from "@/components/WorkIndex";
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
      <header className="page-head">
        <div className="wrap">
          <ol className="crumbs"><li><Link href="/">Index</Link></li><li>Work</li></ol>
          <h1 className="display display-page">Work</h1>
        </div>
        <div className="wrap grid">
          <p className="label col-label">{String(projects.length).padStart(2, "0")} projects</p>
          <p className="statement">Things I&apos;ve built or helped build that are running in production.</p>
        </div>
      </header>
      <section className="section section-tight" aria-label="Projects">
        <div className="wrap"><WorkIndex summaries /></div>
      </section>
      <Contact />
    </main>
  );
}
