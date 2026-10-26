import type { Metadata } from "next";
import Lead from "@/components/Lead";

export const metadata: Metadata = { title: "Page not found", alternates: { canonical: null }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="page-head lost">
      <div className="wrap"><h1 className="display display-page">404</h1></div>
      <Lead label="Not found" links={[{ href: "/", label: "Index" }, { href: "/work/", label: "Work" }]}>
        <p>Nothing lives at this address.</p>
      </Lead>
    </main>
  );
}
