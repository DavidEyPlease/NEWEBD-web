/**
 * Root layout requerido por Next.js, intencionalmente vacío.
 * El layout real con <html>, <body>, Header, Footer y ChatWidget vive en
 * app/[locale]/layout.tsx para que sea consciente del idioma.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
