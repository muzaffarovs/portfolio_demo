import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkIndex() {
  return (
    <div className="wrap grid">
      <p className="label col-label">Work</p>
      <ul className="names">
        {projects.map(p => <li key={p.slug}><Link href={`/work/${p.slug}/`}>{p.name}</Link></li>)}
      </ul>
    </div>
  );
}
