import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartCount } from "@/components/CartCount";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
});

export const metadata: Metadata = {
  title: "Atelier North — Catalog",
  description: "Furniture and objects for calm rooms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]: "var(--font-display-loaded), Georgia, serif",
            ["--font-sans" as string]: "var(--font-sans-loaded), system-ui, sans-serif",
          } as React.CSSProperties
        }
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="brand" href="/">
            Atelier North
          </Link>
          <nav className="nav" aria-label="Primary">
            <Link href="/catalog">Catalog</Link>
            <Link href="/cart">
              Cart
              <CartCount />
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
