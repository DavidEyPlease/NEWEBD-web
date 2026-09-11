import type { Metadata } from "next";
import { Nav, MobileNav } from "./nav";
import { RingGradient } from "./widgets";
import { EnableAnimations } from "./anim";
import { THEME_SCRIPT } from "./theme";
import { DemoModal, DemoInfoButton } from "./demo-modal";
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
        <DemoModal />
        <RingGradient />
        <div className="shell">
          <Nav />
          <div className="main">
            {/* Debe quedar claro en todo momento que no son datos reales. */}
            <div className="demobar">
              <span className="pulse" />
              <b>Demo by NEWEBD</b>
              <span>— sample data. Site Feedback and Our Team are yours to edit.</span>
              <DemoInfoButton />
            </div>
            <MobileNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
