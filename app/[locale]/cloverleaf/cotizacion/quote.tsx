"use client";

import { ClvPage, PORTAL, PROPOSAL } from "../proposal";

/**
 * Cotización de CloverleafAWS, con el mismo molde y paleta que la propuesta.
 *
 * Criterios acordados con David (10-sep-2026): los precios de referencia
 * suben un 20% por ser cliente de EE.UU. (sin llegar a tarifa de agencia de
 * allá), la migración del sitio va incluida sin costo, el prototipo se
 * acredita completo y la aprobación de Meta se aclara como ajena a nosotros.
 */

const ARROW = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

type Row = {
  phase: string;
  name: string;
  covers: string;
  when: string;
  usd: number;
  /** included: no se cobra · credited: se descuenta · module: se cobra */
  kind: "included" | "credited" | "module";
  live?: boolean;
};

const ROWS: Row[] = [
  { phase: "&mdash;", name: "Website migration", covers: "cloverleafaws.com rebuilt on new infrastructure: HTTPS, security headers, every page verified in three languages", when: "Delivered", usd: 0, kind: "included" },
  { phase: "F0", name: "Design &amp; prototype", covers: "The navigable admin you are already using &mdash; every screen in the preview", when: "Delivered", usd: 5600, kind: "credited" },
  { phase: "F1", name: "Foundation &amp; lead capture", covers: "Accounts, roles and permissions &middot; website contact form into Leads, with campaign attribution and instant notification", when: "Weeks 1&ndash;2", usd: 6400, kind: "module" },
  { phase: "WEB", name: "Website control", covers: "Site Feedback &middot; Our Team &mdash; connected to cloverleafaws.com", when: "Live now", usd: 5600, kind: "module", live: true },
  { phase: "F2", name: "Commercial", covers: "Leads &amp; CRM &middot; Clients &amp; Facilities", when: "Weeks 2&ndash;4", usd: 7800, kind: "module" },
  { phase: "F3", name: "Operations &mdash; the core of the system", covers: "Audit scheduling &middot; audit execution against versioned standards, with evidence &middot; Findings &amp; CAPA", when: "Weeks 3&ndash;6", usd: 12700, kind: "module" },
  { phase: "F4", name: "Certification", covers: "Certificates, lifecycle and renewals &middot; public verification registry", when: "Weeks 5&ndash;7", usd: 8500, kind: "module" },
  { phase: "F5", name: "Team &amp; compliance", covers: "Dashboard &middot; Auditor Competence &middot; Directory &middot; Roles &amp; Access &middot; Workload", when: "Weeks 5&ndash;7", usd: 9900, kind: "module" },
  { phase: "SOCIAL", name: "Social media with AI", covers: "Facebook and Instagram in one calendar &middot; AI assistant that drafts each post in English, Spanish and Portuguese for your approval", when: "Weeks 4&ndash;7<span class=\"ast\">*</span>", usd: 8500, kind: "module" },
  { phase: "F6", name: "Launch", covers: "Your existing data migrated &middot; team training &middot; go-live &middot; 60 days of close support", when: "Weeks 7&ndash;8", usd: 4200, kind: "module" },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const PROTOTYPE = ROWS.find((r) => r.kind === "credited")!.usd;
const TOTAL = ROWS.filter((r) => r.kind === "module").reduce((a, r) => a + r.usd, 0);
const DEPOSIT = Math.round(TOTAL * 0.3);
const MONTHLY_OPERATION = 1500;
const SUBSCRIPTION = 3400;

const price = (r: Row) => {
  if (r.kind === "included") return `<span class="st">Included</span>`;
  if (r.kind === "credited") return `${usd(r.usd)}<div class="cv" style="text-align:right">credited below</div>`;
  return usd(r.usd);
};

const rows = ROWS.map(
  (r) => `
        <tr class="${r.kind !== "module" || r.live ? "done" : ""}">
          <td class="ph">${r.phase}</td>
          <td><div class="mn">${r.name}${r.live ? ` <span class="st">Live</span>` : ""}</div><div class="cv">${r.covers}</div></td>
          <td class="wk">${r.when}</td>
          <td class="usd">${price(r)}</td>
        </tr>`,
).join("");

const HTML = `
<div class="bg-fx" aria-hidden="true">
  <div class="orb a"></div><div class="orb b"></div><div class="orb c"></div>
  <div class="grid-lines"></div>
</div>
<div class="wrap">

  <section class="hero">
    <span class="eyebrow"><span class="dot"></span> Quote for CloverLeaf &middot; NEWEBD &middot; September 2026</span>
    <h1>The full system, priced <span class="g">module by module.</span></h1>
    <p class="lede">Everything in the <a href="${PROPOSAL}" style="color:inherit">proposal</a>, with what each part covers, when it arrives and what it costs, in US dollars. <strong>The website migration is included at no cost, and the prototype you are already using is credited in full.</strong></p>
    <div class="cta-row">
      <a class="btn btn-primary" href="${PORTAL}" target="_blank" rel="noopener">Open your admin ${ARROW}</a>
      <a class="btn btn-ghost" href="#modules">Module by module</a>
      <a class="btn btn-ghost" href="#payment">Ways to pay</a>
      <a class="btn btn-ghost" href="${PROPOSAL}">Back to the proposal</a>
    </div>
    <div class="hero-chips">
      <span class="chip"><span class="tick">&#10003;</span> Website migration included</span>
      <span class="chip"><span class="tick">&#10003;</span> Prototype credited</span>
      <span class="chip"><span class="tick">&#10003;</span> Website control already live</span>
    </div>
  </section>

  <section class="sec reveal" id="summary">
    <div class="stats">
      <div class="stat"><div class="v" data-to="${TOTAL}" data-prefix="$">${usd(TOTAL)}</div><div class="l">Full project, every module</div></div>
      <div class="stat"><div class="v">1&ndash;2</div><div class="l">Weeks to have the base platform running</div></div>
      <div class="stat"><div class="v">6&ndash;8</div><div class="l">Weeks from kickoff to launch</div></div>
      <div class="stat"><div class="v" data-to="${MONTHLY_OPERATION}" data-prefix="$" data-suffix="/mo">${usd(MONTHLY_OPERATION)}/mo</div><div class="l">Operation from launch: hosting, AI, support</div></div>
    </div>
  </section>

  <section class="sec reveal" id="modules">
    <p class="kicker">Module by module</p>
    <h2>What you get, when, and what it costs.</h2>
    <p class="sec-lede">Priced by module rather than by page: the screens in a module share the same backend. Each one lists the admin screens it covers &mdash; the same ones you can already open in the preview.</p>
    <div class="qt-shell">
      <div class="qt-scroll">
        <table class="qt">
          <thead><tr><th style="width:84px">Phase</th><th>Module and what it covers</th><th style="width:120px">When</th><th class="r" style="width:130px">USD</th></tr></thead>
          <tbody>${rows}
          </tbody>
          <tfoot>
            <tr><td></td><td class="lbl" colspan="2">All modules, including the prototype</td><td class="usd">${usd(TOTAL + PROTOTYPE)}</td></tr>
            <tr><td></td><td class="lbl" colspan="2">Prototype, credited in full</td><td class="usd" style="color:var(--good)">&minus;${usd(PROTOTYPE)}</td></tr>
            <tr class="total"><td></td><td class="lbl" colspan="2">Full project</td><td class="usd">${usd(TOTAL)}</td></tr>
          </tfoot>
        </table>
      </div>
      <div class="qt-foot"><span class="ast">*</span> Publishing to Facebook and Instagram depends on Meta approving the app &mdash; see below. Weeks are counted from kickoff; modules run in parallel tracks.</div>
    </div>
  </section>

  <section class="sec reveal" id="timeline">
    <p class="kicker">How the time is spent</p>
    <h2>Fast to stand up. The time goes into fitting it to you.</h2>
    <p class="sec-lede">Standing the platform up is quick. Understanding how CloverLeaf really works, connecting it with the tools you already use and adapting each module is where most of the value is &mdash; and most of the calendar.</p>
    <div class="tl-track" aria-hidden="true"><span class="a"></span><span class="b"></span><span class="c"></span></div>
    <div class="tl-scale" aria-hidden="true"><span>Week 1</span><span>Week 2</span><span>Week 6</span><span>Week 8</span></div>
    <div class="tl">
      <div class="tl-step" style="--c:var(--gold)"><span class="wk">Weeks 1&ndash;2</span><h3>Up and running</h3><p>The base platform live, with your accounts and roles, and the contact form feeding Leads again.</p>
        <ul><li>Foundation and lead capture</li><li>Website control, refined</li></ul></div>
      <div class="tl-step" style="--c:var(--leaf)"><span class="wk">Weeks 2&ndash;6</span><h3>Understand, connect, adapt</h3><p>Working sessions with your coordinators and auditors, then each module built to match what we learned.</p>
        <ul><li>Commercial, operations and certification</li><li>Social media with AI, and the Meta review</li><li>Your tools connected</li></ul></div>
      <div class="tl-step" style="--c:var(--sage)"><span class="wk">Weeks 6&ndash;8</span><h3>Refine and launch</h3><p>Your existing data moved in, your team trained, and the system in daily use.</p>
        <ul><li>Team &amp; compliance, dashboards</li><li>Launch, then 60 days of close support</li></ul></div>
    </div>
  </section>

  <section class="sec reveal" id="custom">
    <p class="kicker">Made to fit</p>
    <h2>Every module is a starting point, not a package.</h2>
    <p class="sec-lede">What you see in the preview is how we would start. Everything in it can be adjusted to how CloverLeaf works: that is what the weeks after the first two are for.</p>
    <div class="ctrls">
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Your process, not a template</h3><p>We map how your coordinators and auditors actually work before adapting a single screen.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Your programs and your words</h3><p>Checklists follow Certified Care, Prop 12 and your third-party audits, with your own terminology in three languages.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Your tools, connected</h3><p>Microsoft 365, your website, Meta and whatever else you rely on &mdash; connected, not replaced.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Your reports</h3><p>Dashboards built around the questions you ask every week, not a generic set of charts.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Changes agreed before they are built</h3><p>If discovery shows a module should grow, shrink or change, we agree the change and its price first. No surprises on an invoice.</p></div></div>
      <div class="ctrl"><div class="ci">&#9679;</div><div><h3>Priced after discovery</h3><p>Two items depend on answers we don&rsquo;t have yet: invoicing connected to your accounting software, and offline capture for auditors without signal.</p></div></div>
    </div>
  </section>

  <section class="sec reveal" id="payment">
    <p class="kicker">Ways to pay</p>
    <h2>Buy it, or spread it out.</h2>
    <p class="sec-lede">Same system either way. The difference is when you pay for it and who owns it at the end.</p>
    <div class="pays">
      <div class="pay main"><div class="pay-in">
        <span class="opt">Option A &middot; Purchase</span>
        <h3>The system is yours when it is finished</h3>
        <p class="sub">Paid by milestone, as each module is delivered.</p>
        <div class="big">${usd(TOTAL)} <small>full project</small></div>
        <ul>
          <li><span><b>30% to start: ${usd(DEPOSIT)}</b></span></li>
          <li><span>The balance <b>by milestone</b>, as each module goes live</span></li>
          <li><span><b>${usd(MONTHLY_OPERATION)} per month</b> from launch for operation: hosting, backups, security certificates, AI usage, support and monitoring</span></li>
        </ul>
      </div></div>
      <div class="pay"><div class="pay-in">
        <span class="opt">Option B &middot; Subscription</span>
        <h3>No large payment upfront</h3>
        <p class="sub">One monthly fee that covers everything.</p>
        <div class="big">${usd(SUBSCRIPTION)} <small>per month &times; 24 months</small></div>
        <ul>
          <li><span><b>Development, hosting, AI, support and improvements</b> all included</span></li>
          <li><span><b>Minimum commitment of 12 months</b></span></li>
          <li><span>Same scope, same timeline, same team</span></li>
        </ul>
      </div></div>
    </div>
  </section>

  <section class="sec reveal" id="notes">
    <p class="kicker">Good to know</p>
    <h2>Before you decide.</h2>
    <div class="needs">
      <div class="need"><h3>Meta&rsquo;s approval is not in our hands</h3><p>Publishing to Facebook and Instagram from the system requires Meta to review and approve the app. That review is run by Meta and its timing does not depend on us. The rest of the module &mdash; calendar, AI drafting, approvals &mdash; moves ahead in parallel, and publishing switches on the day Meta approves.</p></div>
      <div class="need"><h3>What is already yours</h3><p>The website migration is included at no cost. The prototype &mdash; the admin you can already sign in to &mdash; is worth ${usd(PROTOTYPE)} and is credited in full against the project.</p></div>
      <div class="need"><h3>Live before you sign</h3><p>Our Team and Site Feedback already work: edit your team and it shows on cloverleafaws.com; mark any part of your site and the note reaches us.</p></div>
      <div class="need"><h3>Prices in US dollars</h3><p>Fixed per module for the scope described here. Anything that changes after discovery is agreed with you, with its price, before it is built.</p></div>
    </div>
  </section>

  <section class="sec reveal" style="padding-top:20px;">
    <div class="final">
      <div class="final-in">
        <h2>Ready when you are.</h2>
        <p>Approve the quote and week one starts with the base platform. Or talk to us first &mdash; we would rather adjust the scope now than later.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="https://newebd.com/contacto">Talk to NEWEBD ${ARROW}</a>
          <a class="btn btn-ghost" href="${PORTAL}" target="_blank" rel="noopener">Open your admin</a>
          <a class="btn btn-ghost" href="${PROPOSAL}">Back to the proposal</a>
        </div>
      </div>
    </div>
  </section>

  <div class="foot">Prepared by NEWEBD for CloverLeaf Animal Welfare Systems &middot; September 2026 &middot; Shared by direct link</div>
</div>
`;

export function CloverleafQuote() {
  return <ClvPage html={HTML} />;
}
