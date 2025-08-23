import type { Metadata } from "next"; // A Next.js type that lets you strongly type SEO/meta info
import "../styles/globals.css"; // Brings in your global styles (Tailwind setup, dark theme, etc.) so they apply everywhere.

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
    <html lang="en" suppressHydrationWarning>
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
