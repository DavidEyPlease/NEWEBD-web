/**
 * Aviso de la sección Website: su web cumple el estándar de accesibilidad y
 * la analítica es sin cookies. Datos de la auditoría del 10-sep-2026.
 */
const STATEMENT = "https://cloverleafaws.com/accessibility";

export function ComplianceCard() {
  return (
    <section className="cmp" aria-label="Accessibility and privacy">
      <div className="cmp-badge" aria-hidden>AA</div>
      <div className="cmp-b">
        <b>Your website meets accessibility standards for people with disabilities</b>
        <p>
          cloverleafaws.com follows <strong>WCAG 2.1 Level AA</strong>, the standard US courts and the Department of Justice use
          as the reference for the ADA: it works with screen readers and keyboard-only navigation, has readable color
          contrast, labeled form fields and respects reduced motion. Audited on September 10, 2026 —{" "}
          <strong>0 issues across all 18 pages</strong>, in English, Spanish and Portuguese, on desktop and mobile.
        </p>
        <div className="cmp-row">
          <span className="cmp-pill">✓ WCAG 2.1 AA</span>
          <span className="cmp-pill">✓ 0 automated issues</span>
          <span className="cmp-pill">✓ Cookie-free analytics, no personal data</span>
          <a href={STATEMENT} target="_blank" rel="noopener" className="kpi-link">Accessibility statement ↗</a>
        </div>
      </div>
    </section>
  );
}

export function ComplianceStrip() {
  return (
    <a className="cmp-strip" href={STATEMENT} target="_blank" rel="noopener">
      <span className="cmp-badge sm" aria-hidden>AA</span>
      <span><b>Accessible website</b> · meets WCAG 2.1 AA for people with disabilities — 0 issues in the latest audit (Sep 10, 2026)</span>
      <span className="cmp-go">Statement ↗</span>
    </a>
  );
}
