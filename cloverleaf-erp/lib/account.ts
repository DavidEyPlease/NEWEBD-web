/**
 * Servicio de hosting de CloverLeaf con NEWEBD. Datos REALES, no de muestra.
 *
 * Pago anual hecho el 10-sep-2026, al quedar el sitio en el servidor de NEWEBD:
 * USD 150 al mes × 12, más el 16% de IVA (México). El siguiente pago es por el
 * mismo monto el 10-sep-2027. Actualizar aquí cada año al registrar el pago.
 */
export const ACCOUNT = {
  site: "cloverleafaws.com",
  admin: "admin.cloverleafaws.com",
  liveSince: "2026-09-10",
  /** Pago anual recibido (confirmado por David el 10-sep-2026). */
  lastPaid: "2026-09-10",
  plan: "Annual hosting",
  monthlyUsd: 150,
  months: 12,
  vatRate: 0.16,
  nextDue: "2027-09-10",
};

export const SUBTOTAL = ACCOUNT.monthlyUsd * ACCOUNT.months; // 1,800
export const VAT = Math.round(SUBTOTAL * ACCOUNT.vatRate * 100) / 100; // 288
export const TOTAL = SUBTOTAL + VAT; // 2,088

export const PAYMENTS = [
  { date: "2026-09-10", concept: "Annual hosting", period: "Sep 10, 2026 – Sep 10, 2027", amount: TOTAL, status: "Paid" },
  { date: "2027-09-10", concept: "Annual hosting", period: "Sep 10, 2027 – Sep 10, 2028", amount: TOTAL, status: "Upcoming" },
];

export const usd = (n: number, cents = true) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });

/** Días que faltan hasta una fecha (hora del centro de México). */
export function daysUntil(isoDate: string) {
  const t = new Date(`${isoDate}T00:00:00-06:00`).getTime();
  return Math.max(0, Math.ceil((t - Date.now()) / 86_400_000));
}
