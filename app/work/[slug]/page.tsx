import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
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
  return {
    title: p.metaTitle,
    description: p.description,
        alternates: { canonical: url },
    openGraph: { type: "article", url, title: full, description: p.description, images: [OG_IMAGE], authors: [`${SITE}/about/`] },
    twitter: { title: full, description: p.description },
  };
}

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
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
          ...(p.live ? { sameAs: p.live.url } : {}),
        },
        breadcrumbs([{ name: "Work", path: "/work/" }, { name: fullName, path: `/work/${p.slug}/` }]),
      ]} />

      <header className="wrap page-head">
        <ol className="crumbs"><li><Link href="/">Home</Link></li><li><Link href="/work/">Work</Link></li><li>{fullName}</li></ol>
        <p className="client">{p.client} · {p.category}</p>
        <h1 className="page-title">{p.name}{p.nameSuffix && <> <span>{p.nameSuffix}</span></>}</h1>
        {p.gloss && <p className="gloss">{p.gloss}</p>}
        <p className="page-lede">{p.lede}</p>
        <dl className="meta-row">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Client</dt><dd>{p.client}</dd></div>
          {p.live && <div><dt>Live</dt><dd><a href={p.live.url} target="_blank" rel="noopener">{p.live.label} ↗</a></dd></div>}
        </dl>
      </header>

      <section className="wrap case-body">
        <h2 className="reveal">What I built</h2>
        <div className="reveal">
          {p.stats && (
            <dl className="stats">
              {p.stats.map(s => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}{s.note && <> <small>{s.note}</small></>}</dd></div>)}
            </dl>
          )}
          <ul className="points">{p.built.map((t, k) => <li key={k}>{t}</li>)}</ul>
        </div>
      </section>

      <section className="wrap case-body">
        <h2 className="reveal">Stack</h2>
        <ul className="chips reveal">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
      </section>

      <nav className="wrap pager" aria-label="More projects">
        <Link href={`/work/${prev.slug}/`}><small>← Previous</small><b>{prev.name}</b></Link>
        <Link href={`/work/${next.slug}/`}><small>Next →</small><b>{next.name}</b></Link>
      </nav>

      <Contact heading="p" />
    </main>
  );
}
