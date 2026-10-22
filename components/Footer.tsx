import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Footer() {
  return (
    <footer>
      <div className="selvage" aria-hidden="true"><canvas id="selvage"></canvas></div>
      <div className="wrap">
        <span>© 2026 Rajab Muzaffarov · <span lang="uz-Cyrl">Ражаб Музаффаров</span></span>
        <span>Forged in Tashkent · <span data-clock>--:--</span> · type <span className="hint-key">metal</span></span>
        <a href="#top">Back to top ↑</a>
      </div>
      <nav className="wrap foot-nav" aria-label="Case studies">
        {projects.map(p => <Link key={p.slug} href={`/work/${p.slug}/`}>{p.name}</Link>)}
        <Link href="/about/">About Rajab Muzaffarov</Link>
      </nav>
    </footer>
  );
}
