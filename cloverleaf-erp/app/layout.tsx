import type { Metadata } from "next";
import { Nav, MobileNav } from "./nav";
import { RingGradient } from "./widgets";
import { EnableAnimations } from "./anim";
import { THEME_SCRIPT } from "./theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloverLeaf — Certification ERP (Demo)",
  description:
    "Navigable demo of the certification management system proposed by NEWEBD for CloverLeaf Animal Welfare Systems. Sample data only.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <EnableAnimations />
        <RingGradient />
        <div className="shell">
          <Nav />
          <div className="main">
            {/* Debe quedar claro en todo momento que no son datos reales. */}
            <div className="demobar">
              <span className="pulse" />
              <b>Demo environment</b>
              <span>— sample data, for evaluation. Nothing here is real client information.</span>
            </div>
            <MobileNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
