export const SITE = "https://muzaffarov.uz";
export const NAME = "Rajab Muzaffarov";
export const EMAIL = "muzaffarovrajab25@gmail.com";
export const PHONE = "+998500049173";
export const PHONE_PRETTY = "+998 50 004 91 73";
export const GITHUB = "https://github.com/muzaffarovs";
export const LINKEDIN = "https://www.linkedin.com/in/muzaffarov/";
export const TELEGRAM = "https://t.me/unnohwn";
export const CV = "/Rajab-Muzaffarov-CV.pdf";
export const OG_IMAGE = "/og-image.png";

// Every spelling people search for: Latin, surname-first, Uzbek Cyrillic, Russian.
export const NAME_VARIANTS = ["Muzaffarov Rajab", "Ражаб Музаффаров", "Раджаб Музаффаров", "Музаффаров Ражаб", "muzaffarovs"];

export const KEYWORDS = [
  "Rajab Muzaffarov",
  "Muzaffarov Rajab",
  "Rajab",
  "Muzaffarov",
  "Ражаб Музаффаров",
  "Раджаб Музаффаров",
  "muzaffarovs",
  "muzaffarov.uz",
  "full-stack developer Tashkent",
  "full-stack developer Uzbekistan",
  "web developer Tashkent",
  "Next.js developer Uzbekistan",
  "React developer Tashkent",
  "TypeScript developer",
  "dasturchi Toshkent",
  "veb dasturchi",
  "разработчик Ташкент",
];

export const sameAs = [GITHUB, LINKEDIN, TELEGRAM];

export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  givenName: "Rajab",
  familyName: "Muzaffarov",
  alternateName: NAME_VARIANTS,
  jobTitle: "Full-Stack Developer",
  description:
    "Full-stack developer in Tashkent, Uzbekistan with 2+ years of experience building production web applications with React, Next.js and TypeScript, including AI-powered customer communication, laboratory quality-control platforms, ERPs, CRMs and corporate websites.",
  url: `${SITE}/`,
  image: {
    "@type": "ImageObject",
    "@id": `${SITE}/#avatar`,
    url: `${SITE}/avatar.webp`,
    width: 820,
    height: 836,
    caption: "Rajab Muzaffarov's avatar",
  },
  email: `mailto:${EMAIL}`,
  telephone: PHONE,
  address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
  homeLocation: { "@type": "City", name: "Tashkent", containedInPlace: { "@type": "Country", name: "Uzbekistan" } },
  nationality: { "@type": "Country", name: "Uzbekistan" },
  worksFor: { "@type": "Organization", name: "Cresta", url: "https://cresta.uz/" },
  sameAs,
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Developer",
    occupationLocation: { "@type": "City", name: "Tashkent" },
    skills:
      "JavaScript, TypeScript, React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, Supabase, Tailwind CSS, REST APIs, Docker",
  },
  knowsAbout: [
    "Full-stack web development", "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "Supabase", "Tailwind CSS", "shadcn/ui", "Redux Toolkit", "Zustand",
    "TanStack Query", "Zod", "JWT authentication", "REST APIs", "AI API integrations", "n8n",
    "Telegram Bot API", "Docker", "Vercel", "Cloudflare",
  ],
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: NAME,
  alternateName: ["muzaffarov.uz", "Ражаб Музаффаров"],
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: NAME, path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}
