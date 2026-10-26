import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import { GITHUB, KEYWORDS, LINKEDIN, NAME, OG_IMAGE, SITE, TELEGRAM } from "@/lib/site";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Rajab Muzaffarov is a full-stack developer in Tashkent, Uzbekistan, building production web apps with React, Next.js and TypeScript: AI automation, ERPs and CRMs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rajab Muzaffarov — Full-Stack Developer in Tashkent, Uzbekistan",
    template: "%s · Rajab Muzaffarov",
  },
  description,
  applicationName: NAME,
  authors: [{ name: NAME, url: `${SITE}/` }],
  creator: NAME,
  publisher: NAME,
  keywords: KEYWORDS,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "profile",
    siteName: NAME,
    url: "/",
    title: "Rajab Muzaffarov — Full-Stack Developer in Tashkent",
    description: "I build production web apps with React, Next.js and TypeScript: AI sales automation, ERPs, CRMs, QR-verified lab certificates and admin platforms.",
    locale: "en_US",
    firstName: "Rajab",
    lastName: "Muzaffarov",
    username: "muzaffarovs",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, type: "image/png", alt: "Rajab Muzaffarov, full-stack developer in Tashkent, Uzbekistan. React, Next.js, TypeScript, Node.js." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajab Muzaffarov — Full-Stack Developer in Tashkent",
    description: "I build production web apps with React, Next.js and TypeScript: AI sales automation, ERPs, CRMs, QR-verified lab certificates and admin platforms.",
    images: [{ url: OG_IMAGE, alt: "Rajab Muzaffarov, full-stack developer in Tashkent, Uzbekistan." }],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EFEA" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
  colorScheme: "light dark",
};

// Applies the saved theme before first paint so there is no flash.
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('rm-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="me" href={GITHUB} />
        <link rel="me" href={LINKEDIN} />
        <link rel="me" href={TELEGRAM} />
        <link rel="author" href="/about/" />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
