import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", alternates: { canonical: null }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="wrap lost">
      <div>
        <h1>4<b>0</b>4</h1>
        <p>This path leads only to the void</p>
        <Link className="btn primary" href="/">Back to muzaffarov.uz</Link>
      </div>
    </main>
  );
}
