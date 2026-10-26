import type { Metadata } from "next";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Lead from "@/components/Lead";
import { CV, GITHUB, LINKEDIN, NAME, OG_IMAGE, PERSON_ID, SITE, WEBSITE_ID, breadcrumbs, person } from "@/lib/site";

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
      <header className="page-head">
        <div className="wrap">
          <h1 className="display display-page">Rajab<br />Muzaffarov</h1>
        </div>
        <Lead label="Ражаб Музаффаров" labelLang="uz-Cyrl" links={[
          { href: CV, label: "Résumé, PDF", external: true },
          { href: GITHUB, label: "GitHub", external: true },
          { href: LINKEDIN, label: "LinkedIn", external: true },
        ]}>
          <p>
            Full-stack developer in Tashkent, working at <a href="https://cresta.uz/" target="_blank" rel="noopener">Cresta</a>.
            Two years of shipping production apps in React, Next.js and TypeScript, with Node and Postgres or MongoDB behind them.
          </p>
        </Lead>
      </header>

      <Contact />
    </main>
  );
}
