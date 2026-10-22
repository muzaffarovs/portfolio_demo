import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { CV, EMAIL, GITHUB, LINKEDIN, NAME, NAME_VARIANTS, OG_IMAGE, PERSON_ID, SITE, TELEGRAM, WEBSITE_ID, breadcrumbs, person } from "@/lib/site";

const title = "About Rajab Muzaffarov — Full-Stack Developer, Tashkent";
const description =
  "Who is Rajab Muzaffarov? A full-stack developer from Tashkent, Uzbekistan with 2+ years building production web apps with React, Next.js and TypeScript. Projects, stack and contacts.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about/" },
  openGraph: { type: "profile", url: "/about/", title, description, images: [OG_IMAGE], firstName: "Rajab", lastName: "Muzaffarov", username: "muzaffarovs" },
  twitter: { title, description },
};

export default function About() {
  return (
    <main>
      <JsonLd graph={[
        {
          "@type": ["AboutPage", "ProfilePage"],
          "@id": `${SITE}/about/#page`,
          url: `${SITE}/about/`,
          name: title,
          description,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: { "@id": PERSON_ID },
          dateModified: "2026-10-22",
        },
        person,
        breadcrumbs([{ name: "About", path: "/about/" }]),
      ]} />
      <header className="wrap page-head">
        <ol className="crumbs"><li><Link href="/">{NAME}</Link></li><li>About</li></ol>
        <p className="eyebrow">About</p>
        <h1 className="page-title">Rajab <span>Muzaffarov</span></h1>
        <p className="page-lede">
          I&apos;m <b>Rajab Muzaffarov</b>, a full-stack developer based in Tashkent, Uzbekistan. For more than two years I&apos;ve built production web
          applications with React, Next.js and TypeScript: AI-powered customer communication, laboratory quality-control platforms, an
          export-logistics ERP, CRMs and corporate websites.
        </p>
        <ul className="names" aria-label="Other spellings of my name">
          {NAME_VARIANTS.filter(n => n !== "muzaffarovs").map(n => <li key={n} lang={!/[а-я]/i.test(n) ? undefined : n.includes("Раджаб") ? "ru" : "uz-Cyrl"}>{n}</li>)}
        </ul>
      </header>

      <section className="wrap section">
        <dl className="qa">
          <div className="reveal">
            <dt>Who is Rajab Muzaffarov?</dt>
            <dd>Rajab Muzaffarov is a full-stack web developer from Tashkent, Uzbekistan. He works across the frontend and backend, from the
              interface people click to the APIs, databases and deployments behind it, and has shipped platforms for companies including
              Cresta and Toshkent Sinov Xizmati.</dd>
          </div>
          <div className="reveal">
            <dt>What does he build?</dt>
            <dd>Software that runs real business workflows:{" "}
              {projects.map((p, k) => (
                <span key={p.slug}><Link href={`/work/${p.slug}/`}>{p.name}</Link> ({p.category}){k < projects.length - 1 ? ", " : "."}</span>
              ))}
            </dd>
          </div>
          <div className="reveal">
            <dt>Which technologies?</dt>
            <dd>JavaScript and TypeScript; React, Next.js, Tailwind CSS and shadcn/ui on the frontend; Redux Toolkit, Zustand, TanStack Query,
              React Hook Form and Zod for state and data; Node.js and Express.js for REST APIs; MongoDB, PostgreSQL and Supabase for data;
              Supabase Auth, JWT and HTTP-only cookies for authentication; AI API integrations, n8n and the Telegram Bot API for automation;
              Git, Docker, Vercel, Cloudflare and Linux for shipping.</dd>
          </div>
          <div className="reveal">
            <dt>Where is he based?</dt>
            <dd>Tashkent, Uzbekistan (UTC+5).</dd>
          </div>
          <div className="reveal">
            <dt>How do I contact him?</dt>
            <dd>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, message <a href={TELEGRAM} rel="me noopener" target="_blank">@urgeekboy on Telegram</a>,
              or find him on <a href={GITHUB} rel="me noopener" target="_blank">GitHub (muzaffarovs)</a> and{" "}
              <a href={LINKEDIN} rel="me noopener" target="_blank">LinkedIn</a>. His full résumé is <a href={CV} target="_blank" rel="noopener">here as a PDF</a>.</dd>
          </div>
        </dl>
      </section>

      <Contact heading="p" />
    </main>
  );
}
