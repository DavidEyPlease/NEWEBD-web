"use client";

import { useEffect, useRef } from "react";

/**
 * Propuesta de ERP para CloverleafAWS.
 * Mismo molde que la página de Vegemex: CSS scopeado (aquí bajo .clv), HTML
 * self-contained y contadores animados. Se monta dentro del layout del sitio
 * (Header + Footer), por eso no lleva barra propia.
 *
 * La paleta es la de CloverLeaf (verde profundo + oro), no la de NEWEBD: es la
 * propuesta del cliente y debe hablar en su lenguaje visual.
 * Contenido en inglés — el cliente está en Missouri, EE.UU.
 */

const CSS = `
.clv{
  --gold:#B89847; --gold-2:#D4BC7A; --leaf:#6E9A6A; --sage:#9DBE8A;
  --grad:linear-gradient(100deg,var(--gold),var(--gold-2) 38%,var(--leaf) 74%,var(--sage));
  --grad-soft:linear-gradient(100deg,rgba(184,152,71,.16),rgba(110,154,106,.14) 60%,rgba(157,190,138,.12));
  --bg:#0F1F13; --bg-2:#14291A; --surface:#193020; --surface-2:#204028;
  --border:rgba(242,246,239,.09); --border-strong:rgba(242,246,239,.17);
  --text:#F2F6EF; --muted:#B9C9B4; --faint:#7E8F7C;
  --good:#7FBF6A; --good-bg:rgba(127,191,106,.13); --warn:#E0A93C;
  --ring:rgba(184,152,71,.55);
  --shadow:0 24px 60px -28px rgba(0,0,0,.75);
  --fd:var(--font-poppins),system-ui,sans-serif;
  --fm:var(--font-geist-mono),ui-monospace,monospace;
  position:relative; overflow:hidden;
  background:var(--bg); color:var(--text);
  font-family:var(--fd); line-height:1.62; letter-spacing:.005em;
}
.clv *{box-sizing:border-box;}
.clv .wrap{max-width:1120px; margin:0 auto; padding:0 24px; position:relative; z-index:1;}
.clv section{position:relative;}

.clv .bg-fx{position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;}
.clv .orb{position:absolute; border-radius:50%; filter:blur(72px); opacity:.34;}
.clv .orb.a{width:520px;height:520px;top:-160px;left:-120px;background:radial-gradient(circle,var(--gold),transparent 68%);}
.clv .orb.b{width:560px;height:560px;top:220px;right:-170px;background:radial-gradient(circle,var(--leaf),transparent 68%);opacity:.3;}
.clv .orb.c{width:480px;height:480px;top:1800px;left:24%;background:radial-gradient(circle,var(--sage),transparent 68%);opacity:.2;}
.clv .grid-lines{position:absolute; inset:0;
  background-image:linear-gradient(rgba(242,246,239,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(242,246,239,.05) 1px,transparent 1px);
  background-size:64px 64px; -webkit-mask-image:radial-gradient(ellipse 90% 55% at 50% 0%,#000,transparent 72%);
  mask-image:radial-gradient(ellipse 90% 55% at 50% 0%,#000,transparent 72%); opacity:.6;}

.clv .hero{padding:150px 0 30px;}
.clv .eyebrow{font-family:var(--fm); font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); display:inline-flex; align-items:center; gap:10px; margin-bottom:22px;}
.clv .eyebrow .dot{width:7px;height:7px;border-radius:50%;background:var(--good);box-shadow:0 0 0 4px var(--good-bg);}
.clv h1{font-weight:700; font-size:clamp(2.4rem,6.2vw,4rem); line-height:1.05; letter-spacing:-.02em; margin:0 0 22px; text-wrap:balance; max-width:17ch;}
.clv h1 .g{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.clv .lede{font-size:clamp(1.05rem,2vw,1.26rem); color:var(--muted); max-width:62ch; line-height:1.6; margin:0 0 30px;}
.clv .lede strong{color:var(--text); font-weight:600;}
.clv .cta-row{display:flex; flex-wrap:wrap; gap:14px; align-items:center;}
.clv .btn{font-weight:600; font-size:15px; text-decoration:none; padding:14px 24px; border-radius:12px; display:inline-flex; align-items:center; gap:9px; transition:.2s; border:1px solid transparent; cursor:pointer;}
.clv .btn-primary{background:var(--grad); color:#10210F; box-shadow:0 14px 34px -14px var(--gold);}
.clv .btn-primary:hover{transform:translateY(-2px); box-shadow:0 20px 40px -14px var(--gold);}
.clv .btn-ghost{color:var(--text); border-color:var(--border-strong); background:rgba(242,246,239,.03);}
.clv .btn-ghost:hover{border-color:var(--ring);}
.clv .hero-chips{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
.clv .chip{font-family:var(--fm); font-size:12px; color:var(--muted); border:1px solid var(--border); padding:7px 12px; border-radius:999px; background:var(--surface); display:inline-flex; align-items:center; gap:7px;}
.clv .chip .tick{color:var(--good); font-weight:700;}

.clv .sec{padding:64px 0;}
.clv .kicker{font-family:var(--fm); font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--gold-2); margin:0 0 14px; font-weight:500;}
.clv h2{font-weight:600; font-size:clamp(1.55rem,3.4vw,2.25rem); line-height:1.14; letter-spacing:-.015em; margin:0 0 14px; text-wrap:balance; max-width:22ch;}
.clv .sec-lede{color:var(--muted); max-width:62ch; font-size:1.03rem; margin:0 0 34px;}

.clv .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:14px;}
.clv .stat{background:var(--surface); border:1px solid var(--border); border-radius:15px; padding:20px 18px; transition:.22s;}
.clv .stat:hover{border-color:var(--border-strong); transform:translateY(-3px); box-shadow:var(--shadow);}
.clv .stat .v{font-weight:700; font-size:clamp(1.7rem,3vw,2.1rem); letter-spacing:-.02em; line-height:1; font-variant-numeric:tabular-nums; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent;}
.clv .stat .l{margin-top:9px; font-size:.86rem; color:var(--muted); line-height:1.35;}

.clv .findings{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
.clv .find{display:flex; gap:15px; align-items:flex-start; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:19px 20px;}
.clv .find .fi{flex:none; width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-family:var(--fm); font-size:13px; font-weight:700;}
.clv .find.crit .fi{background:rgba(224,169,60,.14); border:1px solid rgba(224,169,60,.3); color:var(--warn);}
.clv .find.ok .fi{background:var(--good-bg); border:1px solid rgba(127,191,106,.3); color:var(--good);}
.clv .find h3{font-weight:600; font-size:1rem; margin:0 0 5px;}
.clv .find p{margin:0; color:var(--muted); font-size:.91rem; line-height:1.55;}

.clv .flow-shell{border:1px solid var(--border); background:linear-gradient(180deg,var(--surface),var(--bg-2)); border-radius:20px; padding:26px 22px; box-shadow:var(--shadow);}
.clv .flow-scroll{overflow-x:auto; padding-bottom:8px; -webkit-overflow-scrolling:touch;}
.clv .flow{display:flex; align-items:stretch; gap:0; min-width:min-content;}
.clv .node{flex:none; min-width:120px; max-width:154px; text-align:center; padding:14px 12px; border:1px solid var(--border); border-radius:13px; background:var(--surface-2); display:flex; flex-direction:column; gap:5px; justify-content:center;}
.clv .node .t{font-weight:600; font-size:.86rem; line-height:1.2;}
.clv .node .s{font-family:var(--fm); font-size:10.5px; color:var(--faint); text-transform:uppercase; letter-spacing:.08em;}
.clv .node.sell{border-color:rgba(184,152,71,.45);}
.clv .node.core{border-color:rgba(110,154,106,.5); background:linear-gradient(180deg,var(--surface-2),rgba(110,154,106,.12));}
.clv .node.out{border-color:rgba(127,191,106,.45);}
.clv .arrow{flex:none; align-self:center; width:26px; display:flex; align-items:center; justify-content:center; color:var(--faint);}
.clv .arrow svg{width:16px;height:16px;}
.clv .flow-legend{display:flex; flex-wrap:wrap; gap:18px; margin-top:20px; font-family:var(--fm); font-size:11.5px; color:var(--muted);}
.clv .flow-legend span{display:inline-flex; align-items:center; gap:7px;}
.clv .swatch{width:10px;height:10px;border-radius:3px;}
.clv .transv{margin-top:22px; padding-top:20px; border-top:1px dashed var(--border-strong); display:flex; flex-wrap:wrap; align-items:center; gap:12px;}
.clv .transv .lbl{font-family:var(--fm); font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--faint);}
.clv .tpill{font-size:.85rem; color:var(--text); border:1px solid var(--border); padding:6px 13px; border-radius:999px; background:var(--surface);}

.clv .mods{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
.clv .mod{background:var(--surface); border:1px solid var(--border); border-radius:17px; padding:24px 22px; display:flex; flex-direction:column; gap:11px; transition:.22s;}
.clv .mod:hover{border-color:var(--ring); transform:translateY(-3px); box-shadow:var(--shadow);}
.clv .mod .badge{align-self:flex-start; font-family:var(--fm); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:#10210F; background:var(--grad); padding:4px 10px; border-radius:999px; font-weight:600;}
.clv .mod h3{font-weight:600; font-size:1.12rem; margin:2px 0 0; letter-spacing:-.01em;}
.clv .mod .route{font-family:var(--fm); font-size:12px; color:var(--sage);}
.clv .mod p{margin:0; color:var(--muted); font-size:.92rem; line-height:1.56;}

.clv .doors{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
.clv .door{border-radius:18px; padding:1px; background:var(--grad); box-shadow:var(--shadow);}
.clv .door-in{background:var(--bg-2); border-radius:17px; padding:24px 22px; height:100%;}
.clv .door .who{font-family:var(--fm); font-size:11px; letter-spacing:.13em; text-transform:uppercase; color:var(--gold-2); margin-bottom:10px;}
.clv .door h3{font-weight:600; font-size:1.1rem; margin:0 0 10px;}
.clv .door ul{margin:0; padding-left:18px; color:var(--muted); font-size:.91rem; line-height:1.62;}
.clv .door li{margin-bottom:5px;}

.clv .ctrls{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
.clv .ctrl{background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:20px; display:flex; gap:14px; align-items:flex-start;}
.clv .ctrl .ci{flex:none; width:34px; height:34px; border-radius:9px; background:var(--grad-soft); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--gold-2);}
.clv .ctrl h3{font-weight:600; font-size:1rem; margin:0 0 5px;}
.clv .ctrl p{margin:0; color:var(--muted); font-size:.91rem; line-height:1.55;}

.clv .phases{display:flex; flex-direction:column; gap:12px;}
.clv .phase{background:var(--surface); border:1px solid var(--border); border-radius:15px; padding:22px 24px; display:grid; grid-template-columns:auto 1fr auto; gap:20px; align-items:center; transition:.22s;}
.clv .phase:hover{border-color:var(--border-strong);}
.clv .phase .pn{font-family:var(--fm); font-size:12px; color:var(--faint); letter-spacing:.1em; white-space:nowrap;}
.clv .phase h3{font-weight:600; font-size:1.06rem; margin:0 0 6px;}
.clv .phase p{margin:0; color:var(--muted); font-size:.92rem; line-height:1.55;}
.clv .phase .tag{font-family:var(--fm); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; padding:5px 11px; border-radius:999px; white-space:nowrap; border:1px solid var(--border-strong); color:var(--faint);}
.clv .phase.now{border-color:rgba(127,191,106,.4);}
.clv .phase.now .tag{background:var(--good-bg); border-color:rgba(127,191,106,.35); color:var(--good);}
.clv .phase.done{border-color:rgba(127,191,106,.3);}
.clv .phase.done .pn{color:var(--good);}
.clv .phase.done .tag{background:var(--good-bg); border-color:rgba(127,191,106,.35); color:var(--good);}

.clv .needs{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
.clv .need{background:var(--surface); border:1px solid var(--border); border-left:3px solid var(--gold); border-radius:12px; padding:18px 20px;}
.clv .need h3{font-weight:600; font-size:.99rem; margin:0 0 5px;}
.clv .need p{margin:0; color:var(--muted); font-size:.9rem; line-height:1.55;}

.clv .final{border-radius:22px; padding:2px; background:var(--grad); box-shadow:var(--shadow);}
.clv .final-in{background:var(--bg-2); border-radius:20px; padding:44px 38px; text-align:center;}
.clv .final h2{margin:0 auto 14px; max-width:24ch;}
.clv .final p{color:var(--muted); max-width:58ch; margin:0 auto 26px; font-size:1.03rem;}
.clv .final .cta-row{justify-content:center;}

.clv .foot{padding:30px 0 70px; color:var(--faint); font-family:var(--fm); font-size:11.5px; text-align:center;}

/* Visible por defecto: si el JS no corre, la propuesta se lee igual.
   La animacion solo existe cuando el componente marca el contenedor. */
.clv.js-reveal .reveal{opacity:0; transform:translateY(16px); transition:opacity .6s ease,transform .6s ease;}
.clv.js-reveal .reveal.in{opacity:1; transform:none;}

@media (max-width:980px){
  .clv .stats,.clv .mods,.clv .doors{grid-template-columns:repeat(2,1fr);}
  .clv .findings,.clv .ctrls,.clv .needs{grid-template-columns:1fr;}
  .clv .phase{grid-template-columns:1fr; gap:10px;}
}
@media (max-width:640px){
  .clv .hero{padding:110px 0 20px;}
  .clv .stats,.clv .mods,.clv .doors{grid-template-columns:1fr;}
  .clv .final-in{padding:32px 22px;}
}
@media (prefers-reduced-motion:reduce){
  .clv.js-reveal .reveal{opacity:1; transform:none; transition:none;}
  .clv .btn:hover,.clv .stat:hover,.clv .mod:hover{transform:none;}
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
    <span class="eyebrow"><span class="dot"></span> Proposal for CloverLeaf &middot; NEWEBD &middot; September 2026</span>
    <h1>Your website is back. Now the <span class="g">system behind it.</span></h1>
    <p class="lede">The server your site lived on is gone. We rebuilt the site on new infrastructure and <strong>it is live today</strong>. Along the way we found things worth telling you about. This page is both: what we already delivered, and what we propose building next &mdash; <strong>one system that runs certification end to end</strong>, from the first inquiry to the certificate and its renewal.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="https://cloverleaf-erp.newebd.com" target="_blank" rel="noopener">Open the ERP portal
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a class="btn btn-ghost" href="#system">The system</a>
      <a class="btn btn-ghost" href="#findings">What we found</a>
      <a class="btn btn-ghost" href="https://cloverleaf.newebd.com" target="_blank" rel="noopener">See the site live</a>
    </div>
    <div class="hero-chips">
      <span class="chip"><span class="tick">&#10003;</span> ERP portal open to explore</span>
      <span class="chip"><span class="tick">&#10003;</span> HTTPS with automatic renewal</span>
      <span class="chip"><span class="tick">&#10003;</span> English, Spanish and Portuguese verified</span>
    </div>
  </section>

  <section class="sec reveal" id="delivered">
    <p class="kicker">Already delivered</p>
    <h2>The site is rebuilt, verified and online.</h2>
    <p class="sec-lede">Not a copy that mostly works. Every page, in all three languages, was rebuilt from your repository and checked one by one on the new server.</p>
    <div class="stats">
      <div class="stat"><div class="v" data-to="20">20</div><div class="l">Pages rebuilt and verified individually</div></div>
      <div class="stat"><div class="v" data-to="3">3</div><div class="l">Languages live: English, Spanish, Portuguese</div></div>
      <div class="stat"><div class="v" data-to="100" data-suffix="%">100%</div><div class="l">Assets loading, with no broken references</div></div>
      <div class="stat"><div class="v" data-to="90" data-suffix="ms">90ms</div><div class="l">Average response time from the new server</div></div>
    </div>
  </section>

  <section class="sec reveal" id="findings">
    <p class="kicker">What we found</p>
    <h2>The migration surfaced more than a move.</h2>
    <p class="sec-lede">These are facts we verified directly, not assumptions. Some of them are costing you business right now.</p>
    <div class="findings">
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>The previous server is gone</h3><p>Not slow &mdash; unreachable. Every port we tested is closed. Whatever was still running there stopped running.</p></div>
      </div>
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>The backend source is not in version control</h3><p>The API repository is empty and was never pushed to. That code appears to have existed only on the machine that is now offline. Worth confirming whether a backup exists before it is written off.</p></div>
      </div>
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>Your contact form was failing silently</h3><p>It depended on that backend. Visitors filled it in, saw an error, and their inquiry never reached anyone. Every lead that arrives today is lost.</p></div>
      </div>
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>Your API subdomain still points to the old machine</h3><p>api.cloverleafaws.com resolves to the decommissioned server. Anything pointed at it fails.</p></div>
      </div>
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>No analytics, and no lead attribution</h3><p>There is no way to answer the question that matters: which channel actually produces certifications, not just visits.</p></div>
      </div>
      <div class="find crit">
        <div class="fi">!</div>
        <div><h3>No privacy or cookie notice</h3><p>You operate across four continents, which means European traffic. This needs to be in place before analytics goes on, not after.</p></div>
      </div>
      <div class="find ok">
        <div class="fi">&#10003;</div>
        <div><h3>Your email was never affected</h3><p>It runs on Microsoft 365, independent of the old server. Mail to your team kept working throughout.</p></div>
      </div>
      <div class="find ok">
        <div class="fi">&#10003;</div>
        <div><h3>Your admin panel survived</h3><p>The internal panel is still in version control. It tells us exactly what the lost backend did, which makes rebuilding it a matter of days rather than months.</p></div>
      </div>
    </div>
  </section>

  <section class="sec reveal" id="operation">
    <p class="kicker">Your operation</p>
    <h2>From first inquiry to certificate, in one chain.</h2>
    <p class="sec-lede">You are a certification body. That is a specific kind of operation, and generic business software fits it badly. This is the chain the system would follow.</p>
    <div class="flow-shell">
      <div class="flow-scroll">
        <div class="flow">
          <div class="node sell"><span class="s">Step 1</span><span class="t">Inquiry</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node sell"><span class="s">Step 2</span><span class="t">Client</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node core"><span class="s">Step 3</span><span class="t">Facility</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node core"><span class="s">Step 4</span><span class="t">Audit</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node core"><span class="s">Step 5</span><span class="t">Findings &amp; CAPA</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node out"><span class="s">Step 6</span><span class="t">Certificate</span></div>
          <div class="arrow">${ARROW}</div>
          <div class="node out"><span class="s">Step 7</span><span class="t">Renewal</span></div>
        </div>
      </div>
      <div class="flow-legend">
        <span><span class="swatch" style="background:#B89847"></span> Commercial</span>
        <span><span class="swatch" style="background:#6E9A6A"></span> Operations</span>
        <span><span class="swatch" style="background:#7FBF6A"></span> Output</span>
      </div>
      <div class="transv">
        <span class="lbl">Across every species you certify</span>
        <span class="tpill">Swine</span>
        <span class="tpill">Beef &amp; Dairy Cattle</span>
        <span class="tpill">Poultry</span>
        <span class="tpill">Sheep &amp; Goats</span>
        <span class="tpill">Aquaculture</span>
      </div>
      <div class="transv">
        <span class="lbl">And every program you run</span>
        <span class="tpill">CloverLeaf Certified Care</span>
        <span class="tpill">California Prop 12</span>
        <span class="tpill">Third-Party Auditing</span>
        <span class="tpill">Remote Video Auditing</span>
        <span class="tpill">Training</span>
      </div>
    </div>
  </section>

  <section class="sec reveal" id="system">
    <p class="kicker">The system</p>
    <h2>Eleven modules, one operation.</h2>
    <p class="sec-lede">Nothing here is generic ERP furniture. Each module exists because your certification work needs it, and each one feeds the next.</p>
    <div class="mods">
      <div class="mod"><span class="badge">Commercial</span><h3>Leads &amp; CRM</h3><span class="route">/crm</span><p>Every inquiry from the website lands here, already segmented by the service it asks about, with the campaign that produced it attached. Moves through a pipeline instead of sitting in an inbox.</p></div>
      <div class="mod"><span class="badge">Core</span><h3>Clients &amp; Facilities</h3><span class="route">/clients</span><p>A client is a company; what you actually audit is their facilities. Each one with its species, location, capacity and its own certification history.</p></div>
      <div class="mod"><span class="badge">Operations</span><h3>Audit Scheduling</h3><span class="route">/audits/schedule</span><p>Calendar of planned audits, assignment by auditor and qualification, travel grouped by region so nobody crosses a state twice in a week.</p></div>
      <div class="mod"><span class="badge">Operations</span><h3>Audit Execution</h3><span class="route">/audits/:id</span><p>Checklists tied to a specific version of the standard, with photo evidence, scoring and sign-off. On site or by remote video, same record.</p></div>
      <div class="mod"><span class="badge">Operations</span><h3>Findings &amp; Corrective Actions</h3><span class="route">/findings</span><p>Non-conformities with severity, corrective action plans, deadlines and verification. The part that decides whether a certificate is issued, held or withdrawn.</p></div>
      <div class="mod"><span class="badge">Output</span><h3>Certificates &amp; Renewals</h3><span class="route">/certificates</span><p>Issue, scope, validity, suspension and withdrawal, with renewals that warn you before they lapse rather than after a client calls.</p></div>
      <div class="mod"><span class="badge">Public</span><h3>Verification Registry</h3><span class="route">cloverleafaws.com/verify</span><p>A buyer types a certificate number and confirms it is real, current and what it claims to cover. Public, instant, and a genuine sales argument.</p></div>
      <div class="mod"><span class="badge">Compliance</span><h3>Auditor Competence</h3><span class="route">/auditors</span><p>Credentials, qualifications by species and program, training records and expiry dates. The first thing an accreditation body asks to see.</p></div>
      <div class="mod"><span class="badge">Compliance</span><h3>Standards &amp; Documents</h3><span class="route">/standards</span><p>Versioned standards and controlled documents, so every past audit stays tied to the version of the standard in force on the day it happened.</p></div>
      <div class="mod"><span class="badge">Finance</span><h3>Invoicing</h3><span class="route">/invoicing</span><p>Billing tied to the audit and the certificate that produced it, so revenue is traceable back to the work rather than reconstructed later.</p></div>
      <div class="mod"><span class="badge">Insight</span><h3>Dashboards</h3><span class="route">/dashboard</span><p>Audits by period and species, findings by type, certificates approaching expiry, and which channel produced the clients you actually certified.</p></div>
    </div>
  </section>

  <section class="sec reveal" id="controls">
    <p class="kicker">Controls</p>
    <h2>Built for a body that gets audited itself.</h2>
    <p class="sec-lede">You certify others, which means someone certifies you. These controls are not extras bolted on at the end &mdash; they are the reason to build rather than buy something generic.</p>
    <div class="ctrls">
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Roles and permissions</h3><p>A coordinator, an auditor and a client see different systems. Access is granted by role, and by the specific client or facility involved.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Complete audit trail</h3><p>Who changed what, when, and what the value was before. Immutable, on every record that affects a certification decision.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Impartiality and conflicts of interest</h3><p>Declared relationships between auditors and clients, with the system refusing assignments that would compromise independence.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Version control on standards</h3><p>Standards change. An audit from two years ago stays bound to the version that applied then, and remains defensible.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Certificate lifecycle</h3><p>Draft, issued, active, suspended, withdrawn, expired. Every transition recorded, with a reason and an author.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Evidence integrity</h3><p>Photos, video and signatures stored with timestamp and origin, attached to the finding they support and not editable afterwards.</p></div></div>
    </div>
  </section>

  <section class="sec reveal" id="portal">
    <p class="kicker">The portal</p>
    <h2>Three doors into the same system.</h2>
    <p class="sec-lede">One system, but nobody sees more than their job requires. The client door is the one that quietly saves your team the most time. <strong>The internal portal is already built and open below</strong> &mdash; go in and use it.</p>
    <div class="cta-row" style="margin:-14px 0 30px;">
      <a class="btn btn-primary" href="https://cloverleaf-erp.newebd.com" target="_blank" rel="noopener">Open the ERP portal
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <span class="chip">Navigable, with sample data</span>
    </div>
    <div class="doors">
      <div class="door"><div class="door-in">
        <div class="who">Internal team</div>
        <h3>Coordination</h3>
        <ul><li>Pipeline of inquiries and clients</li><li>Audit planning and assignment</li><li>Review of findings and corrective actions</li><li>Issuing and renewing certificates</li><li>Invoicing and reporting</li></ul>
      </div></div>
      <div class="door"><div class="door-in">
        <div class="who">Field</div>
        <h3>Auditors</h3>
        <ul><li>Their own assignments and calendar</li><li>Checklists for the applicable standard</li><li>Photo and video evidence capture</li><li>Findings recorded on site</li><li>Sign-off before leaving the facility</li></ul>
      </div></div>
      <div class="door"><div class="door-in">
        <div class="who">External</div>
        <h3>Clients and producers</h3>
        <ul><li>Their certificates and validity dates</li><li>Findings awaiting their response</li><li>Uploading corrective action evidence</li><li>Audit history by facility</li><li>Documents and downloadable certificates</li></ul>
      </div></div>
    </div>
  </section>

  <section class="sec reveal" id="phases">
    <p class="kicker">How we get there</p>
    <h2>In phases, each one useful on its own.</h2>
    <p class="sec-lede">No phase depends on the next one existing to be worth having. If you stop after any of them, what is built keeps working.</p>
    <div class="phases">
      <div class="phase done"><span class="pn">PHASE 0</span><div><h3>Website migration</h3><p>Site rebuilt on new infrastructure, HTTPS in place, all pages verified in three languages.</p></div><span class="tag">Delivered</span></div>
      <div class="phase now"><span class="pn">PHASE 1</span><div><h3>Lead capture and attribution</h3><p>The contact form works again, every inquiry is stored with the campaign that produced it, and your team is notified the moment one arrives. This is also the first brick of the CRM.</p></div><span class="tag">In progress</span></div>
      <div class="phase"><span class="pn">PHASE 2</span><div><h3>Clients, facilities and pipeline</h3><p>Inquiries become clients, clients get their facilities, and the commercial pipeline replaces the inbox.</p></div><span class="tag">Next</span></div>
      <div class="phase"><span class="pn">PHASE 3</span><div><h3>Audits, findings and corrective actions</h3><p>Scheduling, execution against versioned standards, evidence capture and the full corrective action cycle.</p></div><span class="tag">Planned</span></div>
      <div class="phase"><span class="pn">PHASE 4</span><div><h3>Certificates and public registry</h3><p>Certificate lifecycle, renewal alerts, and the public verification page on your own domain.</p></div><span class="tag">Planned</span></div>
      <div class="phase"><span class="pn">PHASE 5</span><div><h3>Competence, invoicing and dashboards</h3><p>Auditor competence records, billing tied to the work, and the reporting layer on top of everything already captured.</p></div><span class="tag">Planned</span></div>
    </div>
  </section>

  <section class="sec reveal" id="needs">
    <p class="kicker">What we need from you</p>
    <h2>Six things, and we keep moving.</h2>
    <p class="sec-lede">Some of these unblock work already underway. Others shape how the system gets built, so the earlier we know, the better the result.</p>
    <div class="needs">
      <div class="need"><h3>DNS access</h3><p>To point cloverleafaws.com at the new server. Until then the site runs on a temporary address, deliberately hidden from search engines.</p></div>
      <div class="need"><h3>A Google Analytics property</h3><p>Yours, or we create it. The site is already prepared to use it without touching the code again.</p></div>
      <div class="need"><h3>A decision on privacy and cookies</h3><p>Your site has no privacy or cookie notice today. It should be in place before analytics is switched on.</p></div>
      <div class="need"><h3>Do auditors work without signal?</h3><p>Farms often have none. If audits are captured on site, the system has to work offline and sync later &mdash; that decision shapes the architecture more than any other.</p></div>
      <div class="need"><h3>Your accreditation scope</h3><p>Whether you hold or are pursuing ISO/IEC 17065 or equivalent. It determines how strict the traceability and document control need to be.</p></div>
      <div class="need"><h3>Whether a backend backup exists</h3><p>Before we treat the lost API as unrecoverable, it is worth checking with whoever hosted that server for a snapshot.</p></div>
    </div>
  </section>

  <section class="sec reveal" style="padding-top:20px;">
    <div class="final">
      <div class="final-in">
        <h2>The website is back. The operation is the next step.</h2>
        <p>What we propose is not software for its own sake. It is the difference between certification work that lives in spreadsheets and inboxes, and an operation you can prove, audit and scale across four continents.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="https://cloverleaf-erp.newebd.com" target="_blank" rel="noopener">Open the ERP portal
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="btn btn-ghost" href="https://newebd.com/contacto">Talk to NEWEBD</a>
        </div>
      </div>
    </div>
  </section>

  <div class="foot">Prepared by NEWEBD for CloverLeaf Animal Welfare Systems &middot; September 2026 &middot; Shared by direct link</div>
</div>
`;

export function CloverleafProposal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    // A partir de aqui el JS esta vivo, asi que puede ocultar para animar.
    root.classList.add("js-reveal");

    // Red de seguridad: si el observador no llega a disparar (pestana en
    // segundo plano, navegador raro), el contenido aparece igual.
    const failsafe = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("in"));
    }, 2500);

    // Apariciones al entrar en pantalla.
    const reveals = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
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
        { threshold: 0.12 },
      );
      reveals.forEach((el) => ro.observe(el));
      observers.push(ro);
    }

    // Contadores: cuentan una sola vez, al ser visibles.
    const run = (el: HTMLElement) => {
      const to = Number(el.dataset.to ?? 0);
      const suffix = el.dataset.suffix ?? "";
      const dur = 1100;

      if (reduce) {
        el.textContent = String(to) + suffix;
        return;
      }

      el.textContent = "0" + suffix;
      let start: number | null = null;
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(to * eased)) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = String(to) + suffix;
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

    return () => {
      window.clearTimeout(failsafe);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="clv" ref={ref} dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
