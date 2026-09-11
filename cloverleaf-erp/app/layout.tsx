import type { Metadata } from "next";
import { RingGradient } from "./widgets";
import { EnableAnimations } from "./anim";
import { THEME_SCRIPT } from "./theme";
import { SessionShell } from "./session";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloverLeaf — Admin",
  description:
    "CloverLeaf Animal Welfare Systems admin by NEWEBD: website team and site feedback, plus a preview of the certification platform.",
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
        <SessionShell>{children}</SessionShell>
      </body>
    </html>
  );
}
