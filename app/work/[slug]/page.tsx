import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Lead from "@/components/Lead";
import { getProject, projects } from "@/lib/projects";
import { NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const url = `/work/${p.slug}/`;
  const full = `${p.metaTitle} · ${NAME}`;
  const images = [p.image?.src ?? OG_IMAGE];
  return {
    title: p.metaTitle,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: full, description: p.description, images, authors: [`${SITE}/about/`] },
    twitter: { title: full, description: p.description, images },
  };
}

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const url = `${SITE}/work/${p.slug}/`;
  const fullName = p.nameSuffix?.startsWith("/") ? `${p.name} ${p.nameSuffix}` : p.name;

  return (
    <main>
      <JsonLd graph={[
        {
          "@type": "WebPage",
          "@id": `${url}#page`,
          url,
          name: `${p.metaTitle} · ${NAME}`,
          description: p.description,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: { "@id": `${url}#project` },
          author: { "@id": PERSON_ID },
        },
        {
          "@type": "CreativeWork",
          "@id": `${url}#project`,
          name: fullName,
          description: p.description,
          url,
          genre: p.category,
          creator: p.team ? [{ "@id": PERSON_ID }, { "@type": "Person", name: p.team }] : { "@id": PERSON_ID },
          sourceOrganization: { "@type": "Organization", name: p.client.replace(/ ·.*$/, "") },
          keywords: p.stack.join(", "),
          ...(p.image ? { image: `${SITE}${p.image.src}` } : {}),
          ...(p.live ? { sameAs: p.live.url } : {}),
        },
        breadcrumbs([{ name: "Work", path: "/work/" }, { name: fullName, path: `/work/${p.slug}/` }]),
      ]} />

      <header className="page-head">
        <div className="wrap">
          <h1 className="display display-page">{p.name}</h1>
        </div>
        <Lead label={p.category} links={[
          ...(p.live ? [{ href: p.live.url, label: `${p.live.label} ↗`, external: true }] : []),
          { href: `/work/${next.slug}/`, label: `Next: ${next.name}` },
          { href: "/work/", label: "All work" },
        ]}>
          <p>{p.lede}</p>
        </Lead>
      </header>

      {p.image && (
        <figure className="shot wrap reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image.src} alt={p.image.alt} width={1440} height={900} loading="eager" />
        </figure>
      )}

      {p.stats && (
        <section className="block" aria-label="In figures">
          <div className="wrap grid">
            <p className="label col-label">Figures</p>
            <dl className="figures reveal">
              {p.stats.map(s => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
            </dl>
          </div>
        </section>
      )}

      <Contact />
    </main>
  );
}
