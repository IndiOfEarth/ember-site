import type { Metadata } from "next"; // A Next.js type that lets you strongly type SEO/meta info
import "../styles/globals.css"; // Brings in your global styles (Tailwind setup, dark theme, etc.) so they apply everywhere.
import { Figtree } from "next/font/google";
import localFont from "next/font/local";

// Variable font - Figtree
const figtree = Figtree({
  subsets: ["latin"],
  weight: "variable", // pulls variable wght axis (full range)
  style: ["normal", "italic"], // include the italic variations
  display: "swap",
  variable: "--font-figtree", // exposes a CSS var we can use in Tailwind
});

// Custom brand font - QTFraktur
const brand = localFont({
  src: [
    { path: "../fonts/Brand/QTFraktur.otf", weight: "400", style: "normal" },
  ],
  display: "swap",
  preload: true, // set to false if the file is large and used rarely
  variable: "--font-brand-local",
});

export const metadata: Metadata = {
  title: "ember — Empowering Ideas",
  description:
    "Branding, web/app development, and software solutions that power ambitious ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${brand.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased selection:bg-ember-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

/* UNDERSTANDING STATEMENTS
<html lang="en"> → Declares language (helps accessibility + SEO).
suppressHydrationWarning → Tells React to ignore little mismatches between server-rendered HTML and client-side hydration (common in dark mode setups).
<body className="..."> → Applies global body styling:
antialiased → smoother font rendering.
selection:bg-ember-500/30 → custom highlight color when selecting text.
selection:text-white → selection text color is white.
{children} → The actual page content (this is where Next.js injects your pages).
*/
