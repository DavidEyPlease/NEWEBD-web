"use client";

import { useEffect, useMemo, useRef } from "react";
import { hasLocale } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

import { VEGEMEX_COPY, type VegemexCopy } from "./copy";

/**
 * Resumen "Integración entregada" para Vegemex.
 * Diseño self-contained (CSS scopeado bajo .vgm) que reutiliza las fuentes y la
 * paleta oficial del sitio. Se monta dentro del layout (Header + Footer del sitio),
 * por eso no incluye barra superior ni footer propios.
 *
 * El texto vive en `copy.ts` (es / en); aquí solo la estructura y la animación.
 */

const CSS = `
.vgm{
  --c1:#ff24b8; --c2:#bd41e0; --c3:#6d88ff; --c4:#6cbde7;
  --grad:linear-gradient(100deg,var(--c1),var(--c2) 38%,var(--c3) 72%,var(--c4));
  --grad-soft:linear-gradient(100deg,rgba(255,36,184,.16),rgba(109,136,255,.14) 60%,rgba(108,189,231,.14));
  --bg:#0d0420; --bg-2:#160a2e; --surface:#1b073b; --surface-2:#2a1054;
  --border:rgba(245,243,255,.09); --border-strong:rgba(245,243,255,.16);
  --text:#f5f3ff; --muted:#c4bce0; --faint:#8b82a8;
  --good:#33d69f; --good-bg:rgba(51,214,159,.12); --warn:#f5b042;
  --ring:rgba(189,65,224,.55);
  --shadow:0 24px 60px -28px rgba(0,0,0,.75);
  --fd:var(--font-poppins),system-ui,sans-serif;
  --fm:var(--font-geist-mono),ui-monospace,monospace;
  position:relative; overflow:hidden;
  background:var(--bg); color:var(--text);
  font-family:var(--fd); line-height:1.62; letter-spacing:.005em;
}
.vgm *{box-sizing:border-box;}
.vgm .wrap{max-width:1120px; margin:0 auto; padding:0 24px; position:relative; z-index:1;}
.vgm section{position:relative;}

.vgm .bg-fx{position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;}
.vgm .orb{position:absolute; border-radius:50%; filter:blur(72px); opacity:.42;}
.vgm .orb.a{width:520px;height:520px;top:-160px;left:-120px;background:radial-gradient(circle,var(--c1),transparent 68%);}
.vgm .orb.b{width:560px;height:560px;top:180px;right:-160px;background:radial-gradient(circle,var(--c3),transparent 68%);opacity:.34;}
.vgm .orb.c{width:480px;height:480px;top:1600px;left:26%;background:radial-gradient(circle,var(--c4),transparent 68%);opacity:.26;}
.vgm .grid-lines{position:absolute; inset:0;
  background-image:linear-gradient(rgba(245,243,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(245,243,255,.05) 1px,transparent 1px);
  background-size:64px 64px; -webkit-mask-image:radial-gradient(ellipse 90% 55% at 50% 0%,#000,transparent 72%);
  mask-image:radial-gradient(ellipse 90% 55% at 50% 0%,#000,transparent 72%); opacity:.6;}

.vgm .hero{padding:150px 0 30px;}
.vgm .eyebrow{font-family:var(--fm); font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); display:inline-flex; align-items:center; gap:10px; margin-bottom:22px;}
.vgm .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--good);box-shadow:0 0 0 4px var(--good-bg);}
.vgm h1{font-family:var(--fd); font-weight:700; font-size:clamp(2.4rem,6.2vw,4.1rem); line-height:1.04; letter-spacing:-.02em; margin:0 0 22px; text-wrap:balance; max-width:16ch;}
.vgm h1 .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.vgm .lede{font-size:clamp(1.05rem,2vw,1.28rem); color:var(--muted); max-width:60ch; line-height:1.6; margin:0 0 30px;}
.vgm .lede strong{color:var(--text); font-weight:600;}
.vgm .cta-row{display:flex; flex-wrap:wrap; gap:14px; align-items:center;}
.vgm .btn{font-family:var(--fd); font-weight:600; font-size:15px; text-decoration:none; padding:14px 24px; border-radius:12px; display:inline-flex; align-items:center; gap:9px; transition:.2s; border:1px solid transparent; cursor:pointer;}
.vgm .btn-primary{background:var(--grad); color:#fff; box-shadow:0 14px 34px -14px var(--c2);}
.vgm .btn-primary:hover{transform:translateY(-2px); box-shadow:0 20px 40px -14px var(--c2);}
.vgm .btn-ghost{color:var(--text); border-color:var(--border-strong); background:rgba(245,243,255,.03);}
.vgm .btn-ghost:hover{border-color:var(--ring);}
.vgm .hero-chips{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
.vgm .chip{font-family:var(--fm); font-size:12px; color:var(--muted); border:1px solid var(--border); padding:7px 12px; border-radius:999px; background:var(--surface); display:inline-flex; align-items:center; gap:7px;}
.vgm .chip .tick{color:var(--good); font-weight:700;}

.vgm .sec{padding:64px 0;}
.vgm .kicker{font-family:var(--fm); font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:#c66ae8; margin:0 0 14px; font-weight:500;}
.vgm h2{font-family:var(--fd); font-weight:600; font-size:clamp(1.55rem,3.4vw,2.3rem); line-height:1.12; letter-spacing:-.015em; margin:0 0 14px; text-wrap:balance; max-width:20ch;}
.vgm .sec-lede{color:var(--muted); max-width:58ch; font-size:1.03rem; margin:0 0 34px;}

.vgm .journey{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.vgm .step{background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px 20px; position:relative; overflow:hidden;}
.vgm .step::before{content:""; position:absolute; left:0; top:0; height:3px; width:100%; background:var(--grad); opacity:.9;}
.vgm .step .num{font-family:var(--fm); font-size:12px; color:var(--faint); letter-spacing:.1em;}
.vgm .step h3{font-family:var(--fd); font-weight:600; font-size:1.06rem; margin:10px 0 8px; letter-spacing:-.01em;}
.vgm .step p{margin:0; font-size:.92rem; color:var(--muted); line-height:1.55;}
.vgm .step.live .num{color:var(--good);}

.vgm .flow-shell{border:1px solid var(--border); background:linear-gradient(180deg,var(--surface),var(--bg-2)); border-radius:20px; padding:26px 22px; box-shadow:var(--shadow);}
.vgm .flow-scroll{overflow-x:auto; padding-bottom:8px; -webkit-overflow-scrolling:touch;}
.vgm .flow{display:flex; align-items:stretch; gap:0; min-width:min-content;}
.vgm .node{flex:none; min-width:118px; max-width:150px; text-align:center; padding:14px 12px; border:1px solid var(--border); border-radius:13px; background:var(--surface-2); display:flex; flex-direction:column; gap:5px; justify-content:center;}
.vgm .node .t{font-family:var(--fd); font-weight:600; font-size:.86rem; line-height:1.2;}
.vgm .node .s{font-family:var(--fm); font-size:10.5px; color:var(--faint); text-transform:uppercase; letter-spacing:.08em;}
.vgm .node.buy{border-color:rgba(189,65,224,.42);}
.vgm .node.core{border-color:rgba(109,136,255,.5); background:linear-gradient(180deg,var(--surface-2),rgba(109,136,255,.12));}
.vgm .node.cash{border-color:rgba(51,214,159,.42);}
.vgm .arrow{flex:none; align-self:center; width:26px; display:flex; align-items:center; justify-content:center; color:var(--faint);}
.vgm .arrow svg{width:16px;height:16px;}
.vgm .flow-legend{display:flex; flex-wrap:wrap; gap:18px; margin-top:20px; font-family:var(--fm); font-size:11.5px; color:var(--muted);}
.vgm .flow-legend span{display:inline-flex; align-items:center; gap:7px;}
.vgm .swatch{width:10px;height:10px;border-radius:3px;}
.vgm .transv{margin-top:22px; padding-top:20px; border-top:1px dashed var(--border-strong); display:flex; flex-wrap:wrap; align-items:center; gap:12px;}
.vgm .transv .lbl{font-family:var(--fm); font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--faint);}
.vgm .tpill{font-size:.85rem; color:var(--text); border:1px solid var(--border); padding:6px 13px; border-radius:999px; background:var(--surface);}
.vgm .flow-note{margin-top:22px; color:var(--muted); font-size:.96rem; max-width:66ch;}

.vgm .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:14px;}
.vgm .stat{background:var(--surface); border:1px solid var(--border); border-radius:15px; padding:20px 18px; transition:.22s;}
.vgm .stat:hover{border-color:var(--border-strong); transform:translateY(-3px); box-shadow:var(--shadow);}
.vgm .stat .v{font-family:var(--fd); font-weight:700; font-size:clamp(1.7rem,3vw,2.15rem); letter-spacing:-.02em; line-height:1; font-variant-numeric:tabular-nums; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent;}
.vgm .stat .l{margin-top:9px; font-size:.86rem; color:var(--muted); line-height:1.35;}

.vgm .fin{border-radius:22px; padding:2px; background:var(--grad); box-shadow:var(--shadow);}
.vgm .fin-inner{background:var(--bg-2); border-radius:20px; padding:34px 30px;}
.vgm .fin-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-bottom:26px;}
.vgm .fin-item .v{font-family:var(--fd); font-weight:700; font-size:clamp(1.9rem,3.5vw,2.7rem); letter-spacing:-.02em; line-height:1; font-variant-numeric:tabular-nums;}
.vgm .fin-item .l{margin-top:8px; font-size:.85rem; color:var(--muted);}
.vgm .fin-item.a .v{color:var(--c1);} .vgm .fin-item.b .v{color:var(--c2);} .vgm .fin-item.c .v{color:var(--c3);} .vgm .fin-item.d .v{color:var(--good);}
.vgm .insight{border-top:1px solid var(--border-strong); padding-top:22px; display:flex; gap:16px; align-items:flex-start;}
.vgm .insight .ico{flex:none; width:38px; height:38px; border-radius:10px; background:var(--grad-soft); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--c2);}
.vgm .insight p{margin:0; color:var(--muted); font-size:.98rem; line-height:1.6; max-width:70ch;}
.vgm .insight strong{color:var(--text); font-weight:600;}

.vgm .mods{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
.vgm .mod{background:var(--surface); border:1px solid var(--border); border-radius:17px; padding:24px 22px; display:flex; flex-direction:column; gap:12px; transition:.22s;}
.vgm .mod:hover{border-color:var(--ring); transform:translateY(-3px); box-shadow:var(--shadow);}
.vgm .mod .badge{align-self:flex-start; font-family:var(--fm); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:#fff; background:var(--grad); padding:4px 10px; border-radius:999px;}
.vgm .mod h3{font-family:var(--fd); font-weight:600; font-size:1.14rem; margin:2px 0 0; letter-spacing:-.01em;}
.vgm .mod .route{font-family:var(--fm); font-size:12px; color:var(--c3);}
.vgm .mod p{margin:0; color:var(--muted); font-size:.93rem; line-height:1.56;}
.vgm .mod .pdf{margin-top:auto; font-family:var(--fm); font-size:11.5px; color:var(--faint); display:inline-flex; align-items:center; gap:6px;}

.vgm .values{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
.vgm .val{display:flex; gap:15px; align-items:flex-start; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:19px 20px;}
.vgm .val .vi{flex:none; width:34px; height:34px; border-radius:9px; background:var(--grad-soft); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--c2);}
.vgm .val h4{font-family:var(--fd); font-weight:600; font-size:1rem; margin:0 0 4px;}
.vgm .val p{margin:0; color:var(--muted); font-size:.9rem; line-height:1.5;}

.vgm .chk{display:grid; gap:10px;}
.vgm .ck{display:flex; gap:14px; align-items:flex-start; background:var(--surface); border:1px solid var(--border); border-radius:13px; padding:16px 18px; transition:.2s;}
.vgm .ck:hover{border-color:var(--ring);}
.vgm .ck .box{flex:none; width:20px; height:20px; margin-top:2px; border-radius:6px; border:1.5px solid var(--border-strong); display:flex; align-items:center; justify-content:center; color:var(--c2); font-size:11px;}
.vgm .ck .txt{min-width:0;}
.vgm .ck h4{font-family:var(--fd); font-weight:600; font-size:1rem; margin:0 0 3px; display:flex; flex-wrap:wrap; align-items:baseline; gap:9px;}
.vgm .ck .rt{font-family:var(--fm); font-size:11.5px; color:var(--c3); font-weight:400;}
.vgm .ck p{margin:0; color:var(--muted); font-size:.91rem; line-height:1.55;}
.vgm .need{display:grid; gap:11px; margin-top:6px;}
.vgm .nd{display:flex; gap:14px; align-items:flex-start; border:1px solid var(--border); border-left:3px solid var(--warn); border-radius:12px; padding:16px 18px; background:var(--bg-2);}
.vgm .nd h4{font-family:var(--fd); font-weight:600; font-size:.99rem; margin:0 0 3px;}
.vgm .nd p{margin:0; color:var(--muted); font-size:.9rem; line-height:1.55;}
.vgm .nd .num{flex:none; font-family:var(--fm); font-size:12px; font-weight:700; color:var(--warn); width:22px;}

.vgm .road{display:flex; flex-wrap:wrap; gap:12px;}
.vgm .rd{border:1px dashed var(--border-strong); border-radius:12px; padding:13px 17px; background:var(--bg-2); font-size:.92rem; color:var(--muted); display:flex; align-items:center; gap:10px;}
.vgm .rd .d{width:8px; height:8px; border-radius:50%; background:var(--warn); flex:none;}

.vgm .close{margin:30px 0 20px; border-radius:24px; overflow:hidden; border:1px solid var(--border); background:linear-gradient(160deg,var(--surface),var(--bg-2)); box-shadow:var(--shadow);}
.vgm .close-inner{padding:48px 34px; text-align:center; position:relative;}
.vgm .close h2{margin:0 auto 12px; max-width:22ch;}
.vgm .close p{color:var(--muted); max-width:52ch; margin:0 auto 26px;}
.vgm .close .btn-primary{font-size:16px; padding:16px 30px;}
.vgm .sign{margin-top:34px; padding-top:26px; border-top:1px solid var(--border); display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:center; font-family:var(--fm); font-size:12px; color:var(--faint);}
.vgm .sign .n{background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; font-weight:700; font-family:var(--fd); letter-spacing:.02em;}
.vgm .cotz{margin:0 0 40px; text-align:center; font-family:var(--fm); font-size:12.5px; color:var(--faint);}
.vgm .cotz a{color:var(--muted); text-decoration:none; border-bottom:1px solid var(--border-strong); padding-bottom:2px; transition:.2s;}
.vgm .cotz a:hover{color:var(--text);}

.vgm .reveal{opacity:0; transform:translateY(18px); transition:opacity .7s ease, transform .7s ease;}
.vgm .reveal.in{opacity:1; transform:none;}

@media (max-width:860px){
  .vgm .journey{grid-template-columns:repeat(2,1fr);}
  .vgm .stats{grid-template-columns:repeat(2,1fr);}
  .vgm .fin-grid{grid-template-columns:repeat(2,1fr);}
  .vgm .mods{grid-template-columns:1fr;}
  .vgm .values{grid-template-columns:1fr;}
}
@media (max-width:520px){
  .vgm .journey{grid-template-columns:1fr;}
  .vgm .hero{padding:120px 0 20px;}
  .vgm .sec{padding:48px 0;}
}
@media (prefers-reduced-motion:reduce){
  .vgm .reveal{opacity:1; transform:none; transition:none;}
  .vgm .btn-primary:hover,.vgm .stat:hover,.vgm .mod:hover{transform:none;}
  .vgm .orb{display:none;}
}

.vgm .hero-top{display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:14px; margin-bottom:22px;}
.vgm .hero-top .eyebrow{margin-bottom:0;}
/* En >=640px el switch ES/EN del Header ya está visible justo arriba; abajo de
   eso vive dentro del menú hamburguesa, así que aquí lo mostramos en el hero. */
.vgm .langsw{display:none; align-items:center; gap:2px; padding:3px; border-radius:999px; border:1px solid var(--border-strong); background:rgba(245,243,255,.04);}
@media (max-width:639px){ .vgm .langsw{display:inline-flex;} }
.vgm .langsw a{font-family:var(--fm); font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); text-decoration:none; padding:5px 11px; border-radius:999px; transition:.2s;}
.vgm .langsw a:hover{color:var(--text);}
.vgm .langsw a.on{background:var(--text); color:var(--bg-2);}
`;

const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const arrowBtn = (size: number) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

/* ---------- Estructura: cifras, clases e iconos (iguales en todo idioma) ---------- */

/** Clase de color de cada eslabón de la cadena, en el orden de `chain.nodes`. */
const NODE_KINDS = [
  "buy",
  "buy",
  "core",
  "buy",
  "core",
  "core",
  "core",
  "core",
  "cash",
  "cash",
  "cash",
];

/** Color de cada entrada de la leyenda, en el orden de `chain.legend`. */
const LEGEND_COLORS = ["var(--c2)", "var(--c3)", "var(--good)"];

/** Valores del contador, en el orden de `executed.statLabels`. */
const STAT_VALUES = [
  379, 272697, 324, 186, 408, 114, 40, 379, 57, 15, 23, 12,
];

/** Cifras financieras, en el orden de `finance.labels`. */
const FIN_VALUES = [
  { cls: "a", prefix: "$", to: "3.3", dec: "1", suffix: "M", zero: "$0" },
  { cls: "b", prefix: "", to: "25.6", dec: "1", suffix: "%", zero: "0" },
  { cls: "c", prefix: "$", to: "953.5", dec: "1", suffix: "K", zero: "$0" },
  { cls: "d", prefix: "$", to: "2.34", dec: "2", suffix: "M", zero: "$0" },
];

/** Icono de cada beneficio, en el orden de `values.items`. */
const VALUE_ICONS = [
  `<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>`,
  `<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>`,
  `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 18h4"/>`,
  `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
  `<path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z"/>`,
  `<path d="M20 6L9 17l-5-5"/>`,
];

const QUOTE_URL = "/vegemex/cotizacion";
const QUOTE_PDF = "/vegemex/Cotizacion-NEWEBD-Vegemex.pdf";
const PORTAL_URL = "https://panel.vegemex.com.mx";

/** URL de esta misma página en cada idioma (el locale por defecto va sin prefijo). */
const PAGE_URLS: Record<Locale, string> = { es: "/vegemex", en: "/en/vegemex" };

const mod = (m: {
  badge: string;
  h3: string;
  route: string;
  p: string;
  pdf: string;
}) => `
      <div class="mod reveal">
        <span class="badge">${m.badge}</span>
        <h3>${m.h3}</h3>
        <span class="route">${m.route}</span>
        <p>${m.p}</p>
        <span class="pdf">◆ ${m.pdf}</span>
      </div>`;

function buildHtml(c: VegemexCopy, locale: Locale) {
  const langLinks = routing.locales
    .map(
      (l) =>
        `<a href="${PAGE_URLS[l]}" hreflang="${l}" data-locale="${l}" class="${l === locale ? "on" : ""}"${
          l === locale ? ' aria-current="true"' : ""
        }>${l}</a>`,
    )
    .join("");

  return `
<div class="bg-fx" aria-hidden="true">
  <div class="orb a"></div><div class="orb b"></div><div class="orb c"></div>
  <div class="grid-lines"></div>
</div>
<div class="wrap">

  <section class="hero">
    <div class="hero-top">
      <span class="eyebrow"><span class="dot"></span> ${c.hero.eyebrow}</span>
      <div class="langsw" role="group" aria-label="${c.lang.label}">${langLinks}</div>
    </div>
    <h1>${c.hero.h1}</h1>
    <p class="lede">${c.hero.lede}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="${PORTAL_URL}" target="_blank" rel="noopener">${c.hero.ctaPortal}
        ${arrowBtn(17)}
      </a>
      <a class="btn btn-ghost" href="#entregas">${c.hero.ctaRecent}</a>
      <a class="btn btn-ghost" href="#revision">${c.hero.ctaReview}</a>
      <a class="btn btn-ghost" href="${QUOTE_URL}">${c.hero.ctaQuote}</a>
    </div>
    <div class="hero-chips">
      ${c.hero.chips
        .map((chip) => `<span class="chip"><span class="tick">✓</span> ${chip}</span>`)
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.journey.kicker}</p>
    <h2>${c.journey.h2}</h2>
    <p class="sec-lede">${c.journey.lede}</p>
    <div class="journey">
      ${c.journey.steps
        .map(
          (s, i) =>
            `<div class="step reveal${i === c.journey.steps.length - 1 ? " live" : ""}"><span class="num">${s.num}</span><h3>${s.h3}</h3><p>${s.p}</p></div>`,
        )
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.chain.kicker}</p>
    <h2>${c.chain.h2}</h2>
    <p class="sec-lede">${c.chain.lede}</p>
    <div class="flow-shell reveal">
      <div class="flow-scroll">
        <div class="flow">
          ${c.chain.nodes
            .map(
              (n, i) =>
                `<div class="node ${NODE_KINDS[i]}"><span class="s">${n.s}</span><span class="t">${n.t}</span></div>`,
            )
            .join(`\n          <span class="arrow">${ARROW}</span>\n          `)}
        </div>
      </div>
      <div class="flow-legend">
        ${c.chain.legend
          .map(
            (l, i) =>
              `<span><span class="swatch" style="background:${LEGEND_COLORS[i]}"></span> ${l}</span>`,
          )
          .join("\n        ")}
      </div>
      <div class="transv">
        <span class="lbl">${c.chain.transversalLabel}</span>
        ${c.chain.transversalPills
          .map((p) => `<span class="tpill">${p}</span>`)
          .join("\n        ")}
      </div>
      <p class="flow-note">${c.chain.note}</p>
    </div>
  </section>

  <section class="sec" id="ejecutamos">
    <p class="kicker">${c.executed.kicker}</p>
    <h2>${c.executed.h2}</h2>
    <p class="sec-lede">${c.executed.lede}</p>
    <div class="stats">
      ${c.executed.statLabels
        .map(
          (l, i) =>
            `<div class="stat reveal"><div class="v" data-to="${STAT_VALUES[i]}">0</div><div class="l">${l}</div></div>`,
        )
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <div class="fin reveal">
      <div class="fin-inner">
        <div class="fin-grid">
          ${c.finance.labels
            .map((l, i) => {
              const f = FIN_VALUES[i];
              const prefix = f.prefix ? ` data-prefix="${f.prefix}"` : "";
              return `<div class="fin-item ${f.cls}"><div class="v"${prefix} data-to="${f.to}" data-dec="${f.dec}" data-suffix="${f.suffix}">${f.zero}</div><div class="l">${l}</div></div>`;
            })
            .join("\n          ")}
        </div>
        <div class="insight">
          <span class="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
          <p>${c.finance.insight}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.built.kicker}</p>
    <h2>${c.built.h2}</h2>
    <p class="sec-lede">${c.built.lede}</p>
    <div class="mods">${c.built.mods.map(mod).join("")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.values.kicker}</p>
    <h2>${c.values.h2}</h2>
    <div class="values">
      ${c.values.items
        .map(
          (v, i) =>
            `<div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${VALUE_ICONS[i]}</svg></span><div><h4>${v.h4}</h4><p>${v.p}</p></div></div>`,
        )
        .join("\n      ")}
    </div>
  </section>


  <section class="sec" id="entregas">
    <p class="kicker">${c.recent.kicker}</p>
    <h2>${c.recent.h2}</h2>
    <p class="sec-lede">${c.recent.lede}</p>
    <div class="mods">${c.recent.mods.map(mod).join("")}
    </div>
  </section>

  <section class="sec" id="revision">
    <p class="kicker">${c.review.kicker}</p>
    <h2>${c.review.h2}</h2>
    <p class="sec-lede">${c.review.lede}</p>
    <div class="chk">
      ${c.review.items
        .map(
          (r, i) =>
            `<div class="ck reveal"><span class="box">${i + 1}</span><div class="txt">
        <h4>${r.h4} <span class="rt">${r.route}</span></h4>
        <p>${r.p}</p>
      </div></div>`,
        )
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.needs.kicker}</p>
    <h2>${c.needs.h2}</h2>
    <p class="sec-lede">${c.needs.lede}</p>
    <div class="need">
      ${c.needs.items
        .map(
          (n, i) =>
            `<div class="nd reveal"><span class="num">${String(i + 1).padStart(2, "0")}</span><div>
        <h4>${n.h4}</h4>
        <p>${n.p}</p>
      </div></div>`,
        )
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.quote.kicker}</p>
    <h2>${c.quote.h2}</h2>
    <p class="sec-lede">${c.quote.lede}</p>
    <div class="cta-row" style="margin-top:6px;">
      <a class="btn btn-primary" href="${QUOTE_URL}">${c.quote.ctaFull}
        ${arrowBtn(17)}
      </a>
      <a class="btn btn-ghost" href="${QUOTE_PDF}" target="_blank" rel="noopener">${c.quote.ctaPdf}</a>
    </div>
    <div class="hero-chips" style="margin-top:16px;">
      ${c.quote.chips
        .map((chip) => `<span class="chip"><span class="tick">✓</span> ${chip}</span>`)
        .join("\n      ")}
    </div>
  </section>

  <section class="sec">
    <p class="kicker">${c.next.kicker}</p>
    <h2>${c.next.h2}</h2>
    <p class="sec-lede">${c.next.lede}</p>
    <div class="road">
      ${c.next.items
        .map((i) => `<span class="rd reveal"><span class="d"></span>${i}</span>`)
        .join("\n      ")}
    </div>
  </section>

  <section class="sec" style="padding-top:20px;">
    <div class="close reveal">
      <div class="close-inner">
        <p class="kicker" style="text-align:center;margin-bottom:14px;">${c.close.kicker}</p>
        <h2>${c.close.h2}</h2>
        <p>${c.close.p}</p>
        <a class="btn btn-primary" href="${PORTAL_URL}" target="_blank" rel="noopener">${c.close.cta}
          ${arrowBtn(18)}
        </a>
        <div class="sign">
          <span class="n">NEWEBD</span>
          <span>${c.close.signTagline}</span>
        </div>
      </div>
    </div>
    <p class="cotz">${c.close.cotzQuestion} <a href="${QUOTE_URL}">${c.close.cotzQuote}</a> · <a href="${QUOTE_PDF}" target="_blank" rel="noopener">${c.close.cotzPdf}</a></p>
  </section>

</div>
`;
}

export function VegemexRecap({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const html = useMemo(
    () => buildHtml(VEGEMEX_COPY[locale], locale),
    [locale],
  );

  // El switch de idioma del hero son <a> reales (funcionan sin JS), pero el
  // middleware de next-intl redirige /vegemex → /en/vegemex si la cookie o el
  // navegador dicen inglés. Enrutamos el click por el router de next-intl, que
  // además sincroniza esa cookie: así "ES" sí regresa al español.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        ".langsw a[data-locale]",
      );
      const next = link?.dataset.locale;
      if (!next || !hasLocale(routing.locales, next)) return;
      event.preventDefault();
      if (next !== locale) router.replace("/vegemex", { locale: next });
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [locale, router, html]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observers: IntersectionObserver[] = [];

    // Reveal on scroll
    const revs = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      revs.forEach((el) => el.classList.add("in"));
    } else {
      const ro = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              ro.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14 },
      );
      revs.forEach((el) => ro.observe(el));
      observers.push(ro);
    }

    // Count-up
    const numberLocale = locale === "en" ? "en-US" : "es-MX";
    const fmt = (n: number, dec: number) =>
      n.toLocaleString(numberLocale, {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      });

    const run = (el: HTMLElement) => {
      const to = parseFloat(el.getAttribute("data-to") || "0");
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      const pre = el.getAttribute("data-prefix") || "";
      const suf = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = pre + fmt(to, dec) + suf;
        return;
      }
      const dur = 1300;
      let start: number | null = null;
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + fmt(to * eased, dec) + suf;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = pre + fmt(to, dec) + suf;
      };
      requestAnimationFrame(frame);
    };

    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-to]"));
    if (reduce || !("IntersectionObserver" in window)) {
      nums.forEach(run);
    } else {
      const no = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run(e.target as HTMLElement);
              no.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      nums.forEach((el) => no.observe(el));
      observers.push(no);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [locale, html]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="vgm"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
