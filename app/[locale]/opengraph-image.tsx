import { ImageResponse } from "next/og";

import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NEWEBD — El nuevo desarrollo web es con IA";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Open Graph image dinámica por locale.
 * Se genera al hacer build y se sirve como:
 *   https://newebd.com/opengraph-image
 *   https://newebd.com/en/opengraph-image
 *
 * Es la imagen que aparece cuando alguien comparte un link de la página
 * en WhatsApp, Twitter, LinkedIn, Facebook, etc.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "The new web development is with AI"
      : "El nuevo desarrollo web es con IA";

  const tagline =
    locale === "en"
      ? "Websites, apps, systems and custom agents · From Mexico"
      : "Webs, apps, sistemas y agentes a la medida · Desde México";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0420",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#f5f3ff",
        }}
      >
        {/* Aurora gradients */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(255,36,184,0.55) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -100,
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(108,189,231,0.45) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(189,65,224,0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Brand label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.16em",
            zIndex: 10,
          }}
        >
          NEWEBD
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
              backgroundImage:
                "linear-gradient(120deg, #ff24b8 0%, #bd41e0 40%, #6cbde7 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "#c4bce0",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#8b82a8",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex" }}>newebd.com</div>
          <div style={{ display: "flex" }}>
            {locale === "en" ? "AI · Web · Apps · Systems" : "IA · Web · Apps · Sistemas"}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(120deg, #ff24b8 0%, #bd41e0 35%, #6d88ff 70%, #6cbde7 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
