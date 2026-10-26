import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", alternates: { canonical: null }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="page-head wrap lost">
      <h1 className="display display-page">404</h1>
      <p className="lede">Nothing here. <Link href="/">Back to the index</Link>.</p>
    </main>
  );
}
