import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Sec from "@/components/Sec";
import { NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs, person } from "@/lib/site";

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
      <header className="page-head wrap">
        <h1 className="display display-page">Rajab<br />Muzaffarov</h1>
        <p className="page-sub" lang="uz-Cyrl">Ражаб Музаффаров</p>
        <p className="lede">
          Full-stack developer in Tashkent. A little over two years of production work, mostly React and Next.js in TypeScript, with
          Node and Postgres or MongoDB behind them.
        </p>
      </header>

      <section className="block" aria-labelledby="now-h">
        <div className="wrap">
          <Sec id="now-h" title="Now" />
          <div className="prose reveal">
            <p>I work at <a href="https://cresta.uz/" target="_blank" rel="noopener">Cresta</a>. I built the company site and its Telegram bot, worked
              on the CRM, and built <Link href="/work/ai-avtojavob-aylo/">AI Avtojavob</Link>, which answers Instagram and Telegram customers in their DMs.
              With Ilyosbek Axmedjanov I built <Link href="/work/frutera/">Frutera</Link>, an ERP for an agricultural exporter.</p>
            <p>For Toshkent Sinov Xizmati I built <a href="https://t-sx.uz/" target="_blank" rel="noopener">t-sx.uz</a> and{" "}
              <Link href="/work/sifat-nazorat/">Sifat Nazorat</Link>, the QR system that lets a buyer check a lab certificate.</p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="stack-h">
        <div className="wrap">
          <Sec id="stack-h" title="Stack" />
          <dl className="rows reveal">
            {stack.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </section>

      <Contact heading="p" />
    </main>
  );
}
