import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Sec from "@/components/Sec";
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

      <header className="page-head wrap">
        <p className="page-count"><Link href="/work/">Work</Link> {n(i)} / {String(projects.length).padStart(2, "0")}</p>
        <h1 className="display display-page">{p.name}{p.nameSuffix?.startsWith("/") && <span> {p.nameSuffix}</span>}</h1>
        <dl className="facts">
          <div><dt>Client</dt><dd>{p.client}</dd></div>
          <div><dt>Type</dt><dd>{p.category}</dd></div>
          <div><dt>Role</dt><dd>{p.role}{p.team && <>, with {p.team}</>}</dd></div>
          <div><dt>Live</dt><dd>{p.live ? <a href={p.live.url} target="_blank" rel="noopener">{p.live.label} ↗</a> : "Private"}</dd></div>
        </dl>
        <p className="lede">{p.lede}</p>
      </header>

      {p.image && (
        <figure className="shot wrap reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image.src} alt={p.image.alt} width={1440} height={900} loading="eager" />
          {p.live && <figcaption><span>{p.live.label}</span><span>Captured October 2026</span></figcaption>}
        </figure>
      )}

      {p.stats && (
        <section className="block" aria-labelledby="fig-h">
          <div className="wrap">
            <Sec id="fig-h" title="Figures" />
            <dl className="figures reveal">
              {p.stats.map(s => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}{s.note && <>, {s.note}</>}</dt></div>)}
            </dl>
          </div>
        </section>
      )}

      <section className="block" aria-labelledby="built-h">
        <div className="wrap">
          <Sec id="built-h" title="What I built" note={String(p.built.length).padStart(2, "0")} />
          <ol className="rows-n">
            {p.built.map((t, k) => <li key={k} className="reveal"><span>{n(k)}</span><p>{t}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="block" aria-labelledby="stack-h">
        <div className="wrap">
          <Sec id="stack-h" title="Stack" />
          <p className="big-line reveal">{p.stack.join(", ")}.</p>
        </div>
      </section>

      <nav className="next" aria-label="Next project">
        <Link className="wrap" href={`/work/${next.slug}/`}>
          <span className="next-label">Next</span>
          <span className="next-name">{next.name}</span>
        </Link>
      </nav>

      <Contact heading="p" />
    </main>
  );
}
