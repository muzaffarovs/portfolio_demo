import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-22");
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: "monthly", priority: 1, images: [`${SITE}/avatar.webp`, `${SITE}/og-image.png`] },
    { url: `${SITE}/about/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/work/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map(p => ({ url: `${SITE}/work/${p.slug}/`, lastModified, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${SITE}/Rajab-Muzaffarov-CV.pdf`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
