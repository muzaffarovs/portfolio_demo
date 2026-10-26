import Link from "next/link";
import type { ReactNode } from "react";

export type LeadLink = { href: string; label: string; external?: boolean };

/** The hero's second row, reused everywhere: a small label, one statement, a few links. */
export default function Lead({ label, children, links = [], labelLang }: { label: string; children: ReactNode; links?: LeadLink[]; labelLang?: string }) {
  return (
    <div className="wrap grid hero-foot">
      <p className="label col-label" lang={labelLang}>{label}</p>
      <div className="statement">{children}</div>
      {links.length > 0 && (
        <ul className="hero-links">
          {links.map(l => (
            <li key={l.href}>
              {l.external
                ? <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
                : <Link href={l.href}>{l.label}</Link>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
