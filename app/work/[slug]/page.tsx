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
  const n = (k: number) => String(k + 1).padStart(2, "0");

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
          <ol className="crumbs"><li><Link href="/">Index</Link></li><li><Link href="/work/">Work</Link></li><li>{n(i)}</li></ol>
          <h1 className="display display-page">{p.name}{p.nameSuffix?.startsWith("/") && <span> {p.nameSuffix}</span>}</h1>
        </div>
        <div className="wrap grid">
          <dl className="facts">
            <div><dt>Client</dt><dd>{p.client}</dd></div>
            <div><dt>Type</dt><dd>{p.category}</dd></div>
            <div><dt>Role</dt><dd>{p.role}</dd></div>
            {p.team && <div><dt>With</dt><dd>{p.team}</dd></div>}
            {p.live && <div><dt>Live</dt><dd><a href={p.live.url} target="_blank" rel="noopener">{p.live.label} ↗</a></dd></div>}
          </dl>
          <div className="lede-col">
            {p.gloss && !p.team && <p className="gloss">{p.gloss}</p>}
            <p className="lede">{p.lede}</p>
          </div>
        </div>
      </header>

      {p.image && (
        <figure className="shot wrap reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image.src} alt={p.image.alt} width={1440} height={900} loading="eager" />
          {p.live && <figcaption><span>{p.live.label}</span><span>Live site, captured October 2026</span></figcaption>}
        </figure>
      )}

      {p.stats && (
        <section className="section" aria-label="In figures">
          <div className="wrap grid">
            <p className="label col-label">In figures</p>
            <dl className="figures figures-body reveal">
              {p.stats.map(s => <div key={s.label}><dt>{s.label}{s.note && <> <small>{s.note}</small></>}</dt><dd>{s.value}</dd></div>)}
            </dl>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="built-h">
        <div className="wrap grid">
          <h2 className="label col-label" id="built-h">What I built</h2>
          <ol className="built">
            {p.built.map((t, k) => <li key={k} className="reveal"><span>{n(k)}</span><p>{t}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-h">
        <div className="wrap grid">
          <h2 className="label col-label" id="stack-h">Stack</h2>
          <p className="stack-line reveal">{p.stack.join(", ")}</p>
        </div>
      </section>

      <nav className="next" aria-label="Next project">
        <Link className="wrap grid" href={`/work/${next.slug}/`}>
          <span className="label col-label">Next project</span>
          <span className="next-name">{next.name} <span aria-hidden="true">→</span></span>
        </Link>
      </nav>

      <Contact heading="p" />
    </main>
  );
}
