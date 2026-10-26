import type { Metadata } from "next";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Sec from "@/components/Sec";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/projects";
import { NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs } from "@/lib/site";

const title = "Work";
const description =
  "Projects by Rajab Muzaffarov: the Frutera export ERP, AI Avtojavob, Sifat Nazorat QR verification, and sites for Cresta and T-SX.";

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
      <header className="page-head wrap">
        <h1 className="display display-page">Work</h1>
        <p className="page-sub">Built or helped build, all running in production.</p>
      </header>
      <section className="block" aria-label="Projects">
        <div className="wrap">
          <Sec title="Projects" note={String(projects.length).padStart(2, "0")} as="p" />
          <WorkIndex />
        </div>
      </section>
      <Contact />
    </main>
  );
}
