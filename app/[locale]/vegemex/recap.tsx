"use client";

import { useEffect, useRef } from "react";

/**
 * Resumen "Integración entregada" para Vegemex.
 * Diseño self-contained (CSS scopeado bajo .vgm) que reutiliza las fuentes y la
 * paleta oficial del sitio. Se monta dentro del layout (Header + Footer del sitio),
 * por eso no incluye barra superior ni footer propios.
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
`;

const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const HTML = `
<div class="bg-fx" aria-hidden="true">
  <div class="orb a"></div><div class="orb b"></div><div class="orb c"></div>
  <div class="grid-lines"></div>
</div>
<div class="wrap">

  <section class="hero">
    <span class="eyebrow"><span class="dot"></span> Integración entregada · actualizado agosto 2026</span>
    <h1>Tu operación real, ya <span class="g">viva dentro del portal.</span></h1>
    <p class="lede">Partimos de una propuesta. Luego leímos tus Excel, entendimos toda la cadena de exportación y la <strong>ejecutamos directamente</strong> en el sistema. Ya no es una demo: son <strong>tres temporadas de tu operación</strong> —cargadas, verificadas en vivo y listas para que el equipo las use hoy.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="https://panel.vegemex.com.mx" target="_blank" rel="noopener">Abrir el portal
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a class="btn btn-ghost" href="#entregas">Ver lo más reciente</a>
      <a class="btn btn-ghost" href="/vegemex/cotizacion">Ver la cotización</a>
    </div>
    <div class="hero-chips">
      <span class="chip"><span class="tick">✓</span> En producción en panel.vegemex.com.mx</span>
      <span class="chip"><span class="tick">✓</span> Respaldo tomado antes de cargar</span>
      <span class="chip"><span class="tick">✓</span> Verificado módulo por módulo</span>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">Cómo llegamos aquí</p>
    <h2>De la propuesta a la operación, en cuatro pasos.</h2>
    <p class="sec-lede">No entregamos un plan para que alguien lo capture después. Lo hicimos nosotros, directo sobre tu sistema.</p>
    <div class="journey">
      <div class="step reveal"><span class="num">PASO 01</span><h3>La propuesta</h3><p>Te mostramos un portal con la forma de tu operación de exportación: el molde correcto.</p></div>
      <div class="step reveal"><span class="num">PASO 02</span><h3>Leímos tus Excel</h3><p>Nos mandaste la operación completa —15+ hojas que hoy corren a mano, más miles de PDFs y CFDIs. La estudiamos entera.</p></div>
      <div class="step reveal"><span class="num">PASO 03</span><h3>Integramos y ejecutamos</h3><p>Convertimos esos Excel en datos reales dentro del portal. Un respaldo antes; carga y verificación uno por uno.</p></div>
      <div class="step reveal live"><span class="num">PASO 04 · LISTO</span><h3>Listo para usarse</h3><p>El equipo entra y encuentra su operación real: buscable, conectada y con PDFs con el formato oficial.</p></div>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">Lo que vimos en tus Excel</p>
    <h2>Toda tu cadena, de la semilla a la liquidación.</h2>
    <p class="sec-lede">Vegemex no maneja "una web": corre una cadena de suministro y exportación completa. La mapeamos entera para que el portal la refleje tal cual.</p>
    <div class="flow-shell reveal">
      <div class="flow-scroll">
        <div class="flow">
          <div class="node buy"><span class="s">Compra</span><span class="t">Semilla</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node buy"><span class="s">Compra</span><span class="t">Invernadero</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node core"><span class="s">Campo</span><span class="t">Agricultor</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node buy"><span class="s">Compra</span><span class="t">Material</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node core"><span class="s">Proceso</span><span class="t">Maquila</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node core"><span class="s">Salida</span><span class="t">Embarque</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node core"><span class="s">Carta porte</span><span class="t">Flete</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node core"><span class="s">Destino</span><span class="t">QC / calidad</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node cash"><span class="s">Costo</span><span class="t">Costeo</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node cash"><span class="s">Cobranza</span><span class="t">Facturación</span></div>
          <span class="arrow">${ARROW}</span>
          <div class="node cash"><span class="s">Pago</span><span class="t">Liquidación</span></div>
        </div>
      </div>
      <div class="flow-legend">
        <span><span class="swatch" style="background:var(--c2)"></span> Compras / procurement</span>
        <span><span class="swatch" style="background:var(--c3)"></span> Operación de exportación</span>
        <span><span class="swatch" style="background:var(--good)"></span> Dinero</span>
      </div>
      <div class="transv">
        <span class="lbl">Transversal a todo</span>
        <span class="tpill">Inocuidad · Primus GFS</span>
        <span class="tpill">Inventario y almacén</span>
        <span class="tpill">Servicios: aduana e inspección</span>
      </div>
      <p class="flow-note">Cada eslabón vivía en su propio Excel, aparte del sistema. El portal ahora los conecta en un solo flujo.</p>
    </div>
  </section>

  <section class="sec" id="ejecutamos">
    <p class="kicker">Lo que ejecutamos directamente</p>
    <h2>Tu historia, cargada y verificada en vivo.</h2>
    <p class="sec-lede">Invierno 2025–26 y verano 2026, ya adentro. Estos no son datos de ejemplo: son tus registros reales, ya funcionando en el portal.</p>
    <div class="stats">
      <div class="stat reveal"><div class="v" data-to="379">0</div><div class="l">Embarques reales cargados</div></div>
      <div class="stat reveal"><div class="v" data-to="272697">0</div><div class="l">Cajas entregadas registradas</div></div>
      <div class="stat reveal"><div class="v" data-to="324">0</div><div class="l">Liquidaciones históricas</div></div>
      <div class="stat reveal"><div class="v" data-to="186">0</div><div class="l">Manifiestos (maquila + proveedor)</div></div>
      <div class="stat reveal"><div class="v" data-to="408">0</div><div class="l">Pagos de flete, con banco y CLABE</div></div>
      <div class="stat reveal"><div class="v" data-to="114">0</div><div class="l">Agricultores en el catálogo</div></div>
      <div class="stat reveal"><div class="v" data-to="40">0</div><div class="l">Transportistas · 50 tarifas por ruta</div></div>
      <div class="stat reveal"><div class="v" data-to="379">0</div><div class="l">Cotizaciones / costeo por carga</div></div>
      <div class="stat reveal"><div class="v" data-to="57">0</div><div class="l">Productos · 9 clientes de exportación</div></div>
      <div class="stat reveal"><div class="v" data-to="15">0</div><div class="l">Órdenes de compra reales</div></div>
      <div class="stat reveal"><div class="v" data-to="23">0</div><div class="l">Registros de inocuidad y vigencias</div></div>
      <div class="stat reveal"><div class="v" data-to="12">0</div><div class="l">Programa de cosecha · 8 contratos</div></div>
    </div>
  </section>

  <section class="sec">
    <div class="fin reveal">
      <div class="fin-inner">
        <div class="fin-grid">
          <div class="fin-item a"><div class="v" data-prefix="$" data-to="3.3" data-dec="1" data-suffix="M">$0</div><div class="l">Ventas registradas</div></div>
          <div class="fin-item b"><div class="v" data-to="25.6" data-dec="1" data-suffix="%">0</div><div class="l">Margen NETO promedio</div></div>
          <div class="fin-item c"><div class="v" data-prefix="$" data-to="953.5" data-dec="1" data-suffix="K">$0</div><div class="l">Utilidad neta</div></div>
          <div class="fin-item d"><div class="v" data-prefix="$" data-to="2.34" data-dec="2" data-suffix="M">$0</div><div class="l">Liquidado a la cadena</div></div>
        </div>
        <div class="insight">
          <span class="ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
          <p>Tu operación se veía con <strong>~68% de margen</strong> mirando solo el costo logístico. Al sumar el <strong>costo del vegetal por carga</strong>, el portal muestra el margen NETO real: <strong>25.6%</strong>. Salieron a la luz incluso cargas que perdieron dinero (una hasta −1.64 USD por caja). Eso ahora se ve de un vistazo, no hasta el cierre del año.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">Lo nuevo que construimos</p>
    <h2>Dos módulos que te faltaban, ya en vivo.</h2>
    <p class="sec-lede">Los huecos que revelaron tus Excel —compras y logística— ahora tienen su lugar en el portal, calcados de tus formatos reales.</p>
    <div class="mods">
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Compras y órdenes de compra</h3>
        <span class="route">/compras</span>
        <p>Calcado de tu machote "Orden de compra VGM". Semilla, plántula, material y servicios, con flujo Solicitada → Enviada → Recibida → Facturada → Pagada.</p>
        <span class="pdf">◆ PDF imprimible con membrete oficial</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Logística y manifiestos</h3>
        <span class="route">/logistica</span>
        <p>Orden de salida de maquila con supervisores, chofer y distribución de producto. Tres versiones —maquila, proveedor y cliente— cada una con su documento.</p>
        <span class="pdf">◆ PDF por tipo de manifiesto</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Ampliado</span>
        <h3>Formularios de alta reales</h3>
        <span class="route">Embarques · Clientes</span>
        <p>El alta de embarque ganó un "modo Completo" con los ~15 campos reales (agricultor, maquila, transportista, precio USD, PO, fechas). Los clientes ahora guardan términos de exportación: moneda, incoterm, puerto y crédito.</p>
        <span class="pdf">◆ Captura fiel a tu operación</span>
      </div>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">Cómo mejora tu sistema</p>
    <h2>Lo que cambia para el equipo, en concreto.</h2>
    <div class="values">
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg></span><div><h4>Una sola fuente de verdad</h4><p>Lo que vivía en 15+ Excel sueltos ahora está en un solo lugar, conectado y buscable.</p></div></div>
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg></span><div><h4>El margen real, no el aparente</h4><p>El costo del vegetal ya entra al cálculo. Ves utilidad neta por carga, no una cifra inflada.</p></div></div>
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 18h4"/></svg></span><div><h4>PDFs con un clic</h4><p>Órdenes de compra, manifiestos y liquidaciones se imprimen con tu formato oficial.</p></div></div>
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span><div><h4>Tu historia, ya cargada</h4><p>Invierno 25–26 y verano 26 adentro. El equipo consulta el pasado y da de alta lo nuevo.</p></div></div>
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6 7 18.2l1.9-5.8L4 8.8h6.1z"/></svg></span><div><h4>Listo para la capa de IA</h4><p>Con la operación estructurada, el siguiente paso es un asistente que lea y registre por ti.</p></div></div>
      <div class="val reveal"><span class="vi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><div><h4>Sin riesgo en la carga</h4><p>Tomamos un respaldo completo antes de reemplazar el demo, y verificamos cada módulo en vivo.</p></div></div>
    </div>
  </section>


  <section class="sec" id="entregas">
    <p class="kicker">Lo más reciente · agosto 2026</p>
    <h2>Lo que entregamos después de la carga.</h2>
    <p class="sec-lede">Con tu operación ya dentro, seguimos construyendo sobre ella. Esto es lo que se sumó al portal en las últimas semanas — todo en vivo.</p>
    <div class="mods">
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Torre de control</h3>
        <span class="route">/dashboard</span>
        <p>El tablero de inicio ahora gira alrededor del programa de cargas: qué se mueve hoy, qué expediente está incompleto, qué llega tarde y el retorno real de la temporada — todo en vivo, sin abrir un módulo.</p>
        <span class="pdf">◆ Alertas de lo que requiere tu atención</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Roles y permisos por área</h3>
        <span class="route">/permisos</span>
        <p>Cada persona entra solo a lo suyo. Dirección y administración ven todo y deciden, con interruptores, qué área toca a cada rol operativo — con excepciones por persona cuando hace falta.</p>
        <span class="pdf">◆ Finanzas y expedientes legales, protegidos</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Expediente de la carga</h3>
        <span class="route">/embarques</span>
        <p>La carga es el centro de todo: una línea de tiempo de siembra a entrega, el porcentaje de llenado del expediente y los días que faltan para entregar. Lo que falta se llena ahí mismo.</p>
        <span class="pdf">◆ Cosecha, manifiestos y costeo en un solo lugar</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Unificado</span>
        <h3>Materiales, inventario y compras</h3>
        <span class="route">/materiales</span>
        <p>Un solo lugar: existencias, movimientos y órdenes de compra. La orden de compra entra sola al inventario y la carga descuenta sola lo que consume.</p>
        <span class="pdf">◆ Automático de punta a punta</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Ampliado</span>
        <h3>Manifiestos, los cuatro tipos</h3>
        <span class="route">Desde el expediente</span>
        <p>Maquila, proveedor, cliente y embarque. Se crean desde la carga, se rellenan solos con lo que ya capturaste y heredan supervisores y transporte del manifiesto hermano.</p>
        <span class="pdf">◆ PDF con el formato oficial de cada tipo</span>
      </div>
      <div class="mod reveal">
        <span class="badge">Nuevo</span>
        <h3>Área jurídica con firma digital</h3>
        <span class="route">/contratos</span>
        <p>Contratos por agricultor con sus anexos reales —calidad, programa de cargas y plan de pagos— y firma por liga: el agricultor firma desde su celular y queda registrada.</p>
        <span class="pdf">◆ Expediente de documentos por proveedor</span>
      </div>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">La propuesta</p>
    <h2>La cotización, siempre a la mano.</h2>
    <p class="sec-lede">El acuerdo completo: alcance, fases, inversión y el despliegue de pagos a 24 meses.</p>
    <div class="cta-row" style="margin-top:6px;">
      <a class="btn btn-primary" href="/vegemex/cotizacion">Ver la cotización completa
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a class="btn btn-ghost" href="/vegemex/Cotizacion-NEWEBD-Vegemex.pdf" target="_blank" rel="noopener">Descargar en PDF</a>
    </div>
    <div class="hero-chips" style="margin-top:16px;">
      <span class="chip"><span class="tick">✓</span> Inversión acordada · $1,015,000 MXN + IVA</span>
      <span class="chip"><span class="tick">✓</span> 24 mensualidades de $49,058.33 con IVA</span>
      <span class="chip"><span class="tick">✓</span> Sin intereses ni costo financiero</span>
    </div>
  </section>

  <section class="sec">
    <p class="kicker">Lo que sigue (opcional)</p>
    <h2>Sobre esta base, los próximos pasos.</h2>
    <p class="sec-lede">La operación ya está adentro. Lo demás es enriquecerla cuando lo decidas.</p>
    <div class="road">
      <span class="rd reveal"><span class="d"></span>Activar el asistente de IA del portal</span>
      <span class="rd reveal"><span class="d"></span>Correo automático de recordatorio para firmar contratos</span>
      <span class="rd reveal"><span class="d"></span>Notas de remisión y evidencias de temperatura</span>
      <span class="rd reveal"><span class="d"></span>Enriquecer clientes con contactos y datos fiscales</span>
      <span class="rd reveal"><span class="d"></span>WhatsApp IA — disponible cuando lo decidan</span>
    </div>
  </section>

  <section class="sec" style="padding-top:20px;">
    <div class="close reveal">
      <div class="close-inner">
        <p class="kicker" style="text-align:center;margin-bottom:14px;">Ya está en línea</p>
        <h2>Tu operación te está esperando en el portal.</h2>
        <p>Entra con tu equipo y recórrela: los 379 embarques, las liquidaciones, los manifiestos y las compras, tal como los viven todos los días.</p>
        <a class="btn btn-primary" href="https://panel.vegemex.com.mx" target="_blank" rel="noopener">Abrir panel.vegemex.com.mx
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <div class="sign">
          <span class="n">NEWEBD</span>
          <span>El nuevo desarrollo es con IA — integrada en tu operación.</span>
        </div>
      </div>
    </div>
    <p class="cotz">¿Buscas la propuesta? <a href="/vegemex/cotizacion">Ver la cotización completa →</a> · <a href="/vegemex/Cotizacion-NEWEBD-Vegemex.pdf" target="_blank" rel="noopener">Descargar PDF →</a></p>
  </section>

</div>
`;

export function VegemexRecap() {
  const ref = useRef<HTMLDivElement>(null);

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
    const fmt = (n: number, dec: number) =>
      n.toLocaleString("es-MX", {
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
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        className="vgm"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: HTML }}
      />
    </>
  );
}
