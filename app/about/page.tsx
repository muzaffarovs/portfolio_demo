import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { CV, NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs, person } from "@/lib/site";

const title = "About";
const description =
  "Rajab Muzaffarov, full-stack developer in Tashkent. Two years of production work in React, Next.js and TypeScript, currently at Cresta.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about/" },
  openGraph: { type: "profile", url: "/about/", title: `${title} · ${NAME}`, description, images: [OG_IMAGE], firstName: "Rajab", lastName: "Muzaffarov", username: "muzaffarovs" },
  twitter: { title: `${title} · ${NAME}`, description },
};

const stack: [string, string][] = [
  ["Frontend", "React, Next.js, TypeScript, Tailwind CSS, shadcn/ui"],
  ["State & forms", "Redux Toolkit, Zustand, TanStack Query, React Hook Form, Zod"],
  ["Backend", "Node.js, Express, REST APIs"],
  ["Data", "PostgreSQL, MongoDB, Supabase"],
  ["Auth", "Supabase Auth, JWT, HTTP-only cookies"],
  ["Automation", "AI APIs, n8n, Telegram Bot API"],
  ["Shipping", "Git, Docker, Vercel, Cloudflare, Linux"],
];

export default function About() {
  return (
    <main>
      <JsonLd graph={[
        {
          "@type": ["AboutPage", "ProfilePage"],
          "@id": `${SITE}/about/#page`,
          url: `${SITE}/about/`,
          name: `${title} · ${NAME}`,
          description,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: { "@id": PERSON_ID },
          dateModified: "2026-10-26",
        },
        person,
        breadcrumbs([{ name: "About", path: "/about/" }]),
      ]} />
      <header className="wrap page-head">
        <ol className="crumbs"><li><Link href="/">Home</Link></li><li>About</li></ol>
        <h1 className="page-title">Rajab <span>Muzaffarov</span></h1>
        <p className="gloss" lang="uz-Cyrl">Ражаб Музаффаров</p>
        <p className="page-lede">
          Full-stack developer in Tashkent. I&apos;ve been shipping production web apps for a little over two years, mostly React and
          Next.js in TypeScript, with Node and Postgres or MongoDB behind them.
        </p>
      </header>

      <section className="wrap case-body">
        <h2 className="reveal">Now</h2>
        <div className="prose reveal">
          <p>I work at <a href="https://cresta.uz/" target="_blank" rel="noopener">Cresta</a>. I built the company site and its Telegram bot, worked
            on the CRM, and built <Link href="/work/ai-avtojavob-aylo/">AI Avtojavob</Link>, which answers Instagram and Telegram customers in their DMs.
            With Ilyosbek Axmedjanov I built <Link href="/work/frutera/">Frutera</Link>, an ERP for an agricultural exporter.</p>
          <p>For Toshkent Sinov Xizmati I built <a href="https://t-sx.uz/" target="_blank" rel="noopener">t-sx.uz</a> and{" "}
            <Link href="/work/sifat-nazorat/">Sifat Nazorat</Link>, the QR system that lets a buyer check a lab certificate.</p>
        </div>
      </section>

      <section className="wrap case-body">
        <h2 className="reveal">Projects</h2>
        <ul className="points reveal">
          {projects.map(p => <li key={p.slug}><Link href={`/work/${p.slug}/`}>{p.name}</Link>: {p.summary}</li>)}
        </ul>
      </section>

      <section className="wrap case-body">
        <h2 className="reveal">Stack</h2>
        <dl className="rows reveal">
          {stack.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>

      <section className="wrap case-body">
        <h2 className="reveal">CV</h2>
        <div className="prose reveal"><p>Everything above, on paper: <a href={CV} target="_blank" rel="noopener">download the PDF</a>.</p></div>
      </section>

      <Contact heading="p" />
    </main>
  );
}
