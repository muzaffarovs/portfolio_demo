import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", alternates: { canonical: null }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="page-head lost">
      <div className="wrap">
        <h1 className="display display-page">404</h1>
      </div>
      <div className="wrap grid">
        <p className="label col-label">Not found</p>
        <p className="statement">There&apos;s nothing at this address. <Link href="/">Back to the index</Link> or see the <Link href="/work/">work</Link>.</p>
      </div>
    </main>
  );
}
