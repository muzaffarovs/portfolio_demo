import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkIndex() {
  return (
    <ol className="index">
      {projects.map((p, i) => (
        <li key={p.slug} className="reveal">
          <Link href={`/work/${p.slug}/`}>
            <span className="index-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="index-name">{p.name}</span>
            <span className="index-cat">{p.category}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
