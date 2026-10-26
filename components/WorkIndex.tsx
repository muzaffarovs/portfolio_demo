import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkIndex({ summaries = false }: { summaries?: boolean }) {
  return (
    <ol className="index">
      {projects.map((p, i) => (
        <li key={p.slug} className="reveal">
          <Link href={`/work/${p.slug}/`}>
            <span className="index-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="index-name">{p.name}{p.nameSuffix?.startsWith("/") && <span> {p.nameSuffix}</span>}</span>
            <span className="index-cat">{summaries ? p.summary : p.category}</span>
            <span className="index-client">{p.client.replace(/ ·.*$/, "")}</span>
            <span className="index-arr" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
