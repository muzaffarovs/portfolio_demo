import Link from "next/link";
import { projects } from "@/lib/projects";
import { CV, GITHUB, LINKEDIN, TELEGRAM } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap grid">
        <div className="foot-id">
          <p>© 2026 Rajab Muzaffarov</p>
          <p lang="uz-Cyrl">Ражаб Музаффаров</p>
        </div>
        <nav className="foot-col" aria-label="Projects">
          <p className="label">Work</p>
          {projects.map(p => <Link key={p.slug} href={`/work/${p.slug}/`}>{p.name}</Link>)}
        </nav>
        <nav className="foot-col" aria-label="Elsewhere">
          <p className="label">Elsewhere</p>
          <a href={GITHUB} rel="me noopener" target="_blank">GitHub</a>
          <a href={LINKEDIN} rel="me noopener" target="_blank">LinkedIn</a>
          <a href={TELEGRAM} rel="me noopener" target="_blank">Telegram</a>
          <a href={CV} rel="noopener" target="_blank">Résumé</a>
        </nav>
        <div className="foot-col">
          <p className="label">Site</p>
          <Link href="/about/">About</Link>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
