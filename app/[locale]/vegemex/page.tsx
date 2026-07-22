import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes,
  Brain,
  Check,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  HandCoins,
  Receipt,
  Ship,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
  X,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

/**
 * Página de propuesta para Vegemex (cliente). Contenido en español,
 * fuera del nav y sin indexar — se comparte por liga directa.
 */
export const metadata: Metadata = {
  title: "Propuesta para Vegemex — De 15 Excel a una sola plataforma",
  description:
    "Cómo unificamos la operación de Vegemex en un sistema interno con IA: paso a paso, inversión y retorno.",
  robots: { index: false, follow: false },
};

const DEMO_URL = "https://vegemex-erp.vercel.app";

/* ---------- Datos de la página ---------- */

const EXCELES = [
  { icon: ClipboardList, nombre: "Bitácoras", detalle: "Aplicación y fertilización por rancho" },
  { icon: Ship, nombre: "Cargas", detalle: "Embarques de exportación (380+ filas)" },
  { icon: Receipt, nombre: "Facturación", detalle: "BD de compras con 40 columnas" },
  { icon: Truck, nombre: "Fletes", detalle: "Rutas, tabulador y cuentas bancarias" },
  { icon: ShieldCheck, nombre: "Inocuidad", detalle: "Certificados y análisis por agricultor" },
  { icon: HandCoins, nombre: "Liquidaciones", detalle: "Pagos a agricultores, uno por uno" },
  { icon: Boxes, nombre: "Materiales", detalle: "Tarimas, cajas y bins en 14 hojas" },
  { icon: Sprout, nombre: "Programas", detalle: "Cosecha y pronósticos por semana" },
  { icon: FileSpreadsheet, nombre: "Proveedores", detalle: "Una BD suelta por cada proveedor" },
];

const DOLORES = [
  "La misma carga se captura 3+ veces en archivos distintos",
  "Nadie ve el estatus real de un embarque sin preguntar",
  "Los ajustes de calidad y fletes fuera de tabulador se detectan tarde",
  "La información vive en la laptop de cada quien",
];

const PASOS = [
  { sem: "Semanas 1–2", titulo: "Integración base", desc: "Conectamos con tu plataforma actual: accesos, catálogos y primera migración de datos. Nada se detiene." },
  { sem: "Semanas 3–4", titulo: "Embarques en producción", desc: "Tu mayor dolor diario, resuelto primero. El equipo ya trackea cargas reales en el sistema.", hito: true },
  { sem: "Semanas 5–7", titulo: "Administración financiera", desc: "Costeo de compras, liquidaciones a agricultores y facturación CFDI con complementos de pago." },
  { sem: "Semanas 8–9", titulo: "Cadena de frío", desc: "Fletes con tabulador por ruta, maquila y el inventario de materiales multi-bodega." },
  { sem: "Semanas 10–11", titulo: "Calidad e inteligencia", desc: "Inocuidad y trazabilidad, dashboards ejecutivos y el asistente IA con alertas proactivas." },
  { sem: "Semana 12", titulo: "Arranque total", desc: "Migración final, capacitación del equipo y 60 días de soporte incluido." },
];

const FASES = [
  { f: "F0", sem: "Entregada ✓", titulo: "Diseño y prototipo", desc: "Ya está en tus manos — su valor se acredita al confirmar el proyecto.", precio: "$70,000", pct: 37, done: true },
  { f: "F1", sem: "Sem 1–2", titulo: "Integración", desc: "API sobre tu backend, roles y migración inicial. Económica porque reutilizamos tu plataforma actual.", precio: "$90,000", pct: 47 },
  { f: "F2", sem: "Sem 3–4", titulo: "Núcleo operativo", desc: "Embarques a producción + cosecha. Aquí se construye la tubería que todas las fases reaprovechan.", precio: "$180,000", pct: 95 },
  { f: "F3", sem: "Sem 5–7", titulo: "Financiera + CFDI", desc: "La más alta — y debe serlo: timbrado, complementos de pago y pruebas exhaustivas contra el SAT.", precio: "$190,000", pct: 100 },
  { f: "F4", sem: "Sem 8–9", titulo: "Cadena de frío", desc: "Fletes con tabulador, maquila e inventario, montados sobre la tubería ya construida.", precio: "$150,000", pct: 79 },
  { f: "F5", sem: "Sem 10–11", titulo: "Calidad + IA", desc: "El asistente pasa de demo a producción: datos vivos, permisos, acciones y alertas.", precio: "$170,000", pct: 89 },
  { f: "F6", sem: "Sem 12", titulo: "Arranque total", desc: "Migración final y capacitación. Económica: nuestra infraestructura ya existe.", precio: "$60,000", pct: 32 },
];

const REUTILIZADO = [
  {
    que: "Tu plataforma actual ya existe — accesos, cotizador y catálogos son tuyos. Los conectamos y extendemos; no los reconstruimos ni los volvemos a cobrar.",
    valor: "te ahorra ≈ $120 mil",
  },
  {
    que: "NEWEBD ya trabajó por adelantado — el diseño completo, el prototipo de los 14 módulos y el asistente IA de demostración (≈ $250 mil por separado) quedan cubiertos en la Fase 0, que además se acredita.",
    valor: "lo cubre la Fase 0",
  },
];

const AHORROS = [
  {
    titulo: "Horas de captura recuperadas",
    monto: "$25–35 mil/mes",
    desc: "Hoy tu equipo captura y consolida la misma información en varios archivos. El sistema lo hace una sola vez, en un solo lugar.",
  },
  {
    titulo: "Embarques rechazados evitados",
    monto: "$150–250 mil c/u",
    desc: "Una sola carga rechazada en destino cuesta más que dos fases del proyecto. La trazabilidad y las alertas de calidad reducen ese riesgo.",
  },
  {
    titulo: "Fletes dentro de tabulador",
    monto: "$3–8 mil/viaje",
    desc: "El sistema alerta automáticamente cuando un flete cotizado excede tu precio máximo autorizado por ruta.",
  },
  {
    titulo: "Cobranza y pagos a tiempo",
    monto: "Flujo sano",
    desc: "Facturas por vencer, complementos pendientes y liquidaciones en revisión — visibles antes de que sean problema.",
  },
];

const PORQUE = [
  {
    icon: Brain,
    titulo: "Desarrollado con IA, con IA adentro",
    desc: "No solo construimos con inteligencia artificial: tu sistema incluye un asistente que responde sobre toda tu operación y vigila lo que requiere atención.",
  },
  {
    icon: Check,
    titulo: "El prototipo ya existe",
    desc: "No compras una promesa: el diseño de todos los módulos ya está construido, navegable y validado con tu propia operación.",
  },
  {
    icon: Clock,
    titulo: "12 semanas, no 7 meses",
    desc: "Un desarrollo así toma 5–7 meses en una agencia tradicional. Nuestro modelo lo entrega en ~12 semanas, con producción desde la semana 4.",
  },
];

/* ---------- Página ---------- */

type Props = { params: Promise<{ locale: string }> };

export default async function VegemexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-background pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-purple/25 blur-[160px]" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]"
        />
        <Container className="text-center">
          <Badge variant="brand">
            <Sparkles className="size-3.5" /> Propuesta para Vegemex
          </Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            De 15 Excel a{" "}
            <span className="text-gradient-brand">una sola plataforma</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-muted">
            Tu operación de exportación completa — cosecha, embarques, maquila,
            fletes, costeo, liquidaciones e inocuidad — en un sistema interno
            hecho a tu medida, con inteligencia artificial integrada.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-brand inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-semibold text-white shadow-[0_10px_40px_-12px_rgba(139,92,246,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_56px_-12px_rgba(139,92,246,0.75)]"
            >
              Ver el demo en vivo <ArrowRight className="size-5" />
            </a>
            <a
              href="#inversion"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium text-foreground ring-1 ring-inset ring-border-strong transition-colors hover:bg-foreground/[0.06]"
            >
              Ver la inversión
            </a>
          </div>
          <p className="mt-4 text-sm text-foreground-subtle">
            El demo ya está construido con tu operación real · acceso con contraseña
          </p>
        </Container>
      </section>

      {/* ===== Hoy: la operación en Excel ===== */}
      <section className="border-y border-border bg-foreground/[0.02] py-20 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge>Hoy</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Tu operación vive en <span className="text-gradient-brand">15 archivos</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
              Estudiamos cada uno. Esto es lo que tu equipo mantiene a mano, todos los días:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {EXCELES.map((e) => (
              <div
                key={e.nombre}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <e.icon className="size-5 text-brand-cyan" />
                <p className="mt-2.5 text-sm font-semibold">{e.nombre}</p>
                <p className="mt-0.5 text-xs text-foreground-subtle">{e.detalle}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-2.5">
            {DOLORES.map((d) => (
              <div key={d} className="flex items-start gap-3 text-sm text-foreground-muted">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-magenta/15 text-brand-magenta">
                  <X className="size-3" />
                </span>
                {d}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Paso a paso ===== */}
      <section className="py-20 sm:py-24">
        <Container size="narrow">
          <div className="text-center">
            <Badge>El plan</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Paso a paso, en <span className="text-gradient-brand">12 semanas</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
              No reemplazamos lo que ya te funciona: lo extendemos. Y no esperas
              meses para ver valor — el primer módulo entra a producción en la semana 4.
            </p>
          </div>

          <ol className="relative mt-12 space-y-0 border-l border-border pl-8 sm:pl-10">
            {PASOS.map((p, i) => (
              <li key={p.sem} className="relative pb-10 last:pb-0">
                <span
                  className={
                    p.hito
                      ? "gradient-brand absolute -left-[41px] top-0 grid size-6 place-items-center rounded-full text-[11px] font-bold text-white sm:-left-[49px]"
                      : "absolute -left-[41px] top-0 grid size-6 place-items-center rounded-full bg-foreground/10 text-[11px] font-bold text-foreground-muted ring-1 ring-inset ring-border-strong sm:-left-[49px]"
                  }
                >
                  {i + 1}
                </span>
                <p className="text-xs font-semibold tracking-wide text-brand-cyan uppercase">
                  {p.sem}
                  {p.hito && (
                    <span className="gradient-brand ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white">
                      PRIMER MÓDULO VIVO
                    </span>
                  )}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{p.titulo}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{p.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ===== Inversión ===== */}
      <section id="inversion" className="scroll-mt-24 border-y border-border bg-foreground/[0.02] py-20 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge>La inversión</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Transparente y <span className="text-gradient-brand">por fases</span>
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-brand-purple/40 bg-background/60 p-7 shadow-[0_0_60px_-30px_rgba(189,65,224,0.5)]">
              <Badge variant="brand">Proyecto completo</Badge>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-lg text-foreground-subtle line-through">$910,000</span>
                <span className="text-4xl font-extrabold tracking-tight">$840,000</span>
                <span className="text-sm text-foreground-muted">MXN + IVA</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground-muted">
                {[
                  "El diseño y prototipo (Fase 0) ya está entregado — sus $70,000 se acreditan al confirmar",
                  "Pago por fases: 30% de anticipo, el resto por hito entregado",
                  "El sistema es propiedad de Vegemex al finalizar",
                  "Operación mensual todo incluido: $22,000/mes",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-cyan" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-border bg-background/60 p-7">
                <Badge>Alternativa sin anticipo fuerte</Badge>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight">$45,000</span>
                  <span className="text-sm text-foreground-muted">MXN / mes · 24 meses</span>
                </div>
                <p className="mt-3 text-sm text-foreground-muted">
                  Desarrollo, hosting, IA, soporte y evolutivos incluidos.
                  Permanencia mínima de 12 meses.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background/60 p-7">
                <Badge>Opcional · Correo @vegemex</Badge>
                <p className="mt-3 text-sm text-foreground-muted">
                  <span className="font-semibold text-foreground">$60,000</span> con buzón
                  administrado (recomendado) o{" "}
                  <span className="font-semibold text-foreground">$180,000</span> con webmail
                  100% propio. Ambos con el asistente IA que ya viste en el demo.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background/60 p-7">
                <Badge>¿Y los $22 mil al mes?</Badge>
                <p className="mt-3 text-sm text-foreground-muted">
                  Es todo lo que el sistema necesita para vivir sano, en un pago fijo: los
                  servidores donde vive tu información, respaldos diarios, alguien a quien
                  llamar (con mejoras continuas) y el consumo de la IA.{" "}
                  <span className="text-foreground">Para dimensionar:</span> un técnico de
                  medio tiempo cuesta $25–40 mil al mes — sin servidores, sin respaldos y sin IA.
                </p>
              </div>
            </div>
          </div>

          {/* Por qué no pagas el precio completo */}
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-brand-cyan/25 bg-brand-cyan/[0.05] p-7">
            <h3 className="text-lg font-semibold">
              Por qué no pagas{" "}
              <span className="text-gradient-brand">el precio completo</span>
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Un sistema así, construido desde cero, ronda los{" "}
              <b className="text-foreground">$1.2–1.3 millones</b>. Tu inversión es menor por dos razones:
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {REUTILIZADO.map((r) => (
                <div key={r.valor} className="rounded-2xl border border-border/60 bg-background/40 p-4">
                  <p className="text-sm font-semibold text-brand-cyan">{r.valor}</p>
                  <p className="mt-1.5 text-sm text-foreground-muted">{r.que}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground-muted">
              <b className="text-foreground">En corto:</b> lo que ya es tuyo se respeta, y el
              trabajo adelantado te cuesta $70 mil que luego se descuentan. Resultado:{" "}
              <b className="text-foreground">$840 mil en vez de $1.2–1.3 millones</b>, y 12
              semanas en vez de 7 meses.
            </p>
          </div>

          {/* Desglose fase por fase */}
          <div className="mx-auto mt-10 max-w-4xl">
            <h3 className="text-center text-lg font-semibold">
              ¿Dónde cuesta más y dónde menos?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-muted">
              Cada fase, con su porqué. Lo caro está donde debe estar: dinero fiscal,
              la tubería de producción y la IA. Lo barato, donde reutilizamos.
            </p>
            <div className="mt-6 space-y-2.5">
              {FASES.map((f) => (
                <div
                  key={f.f}
                  className={
                    f.done
                      ? "rounded-2xl border border-brand-cyan/30 bg-brand-cyan/[0.05] p-4 sm:p-5"
                      : "rounded-2xl border border-border bg-background/60 p-4 sm:p-5"
                  }
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm font-semibold">
                      <span className="mr-2 text-xs font-bold tracking-wide text-brand-cyan uppercase">
                        {f.f} · {f.sem}
                      </span>
                      {f.titulo}
                    </p>
                    <p className="text-base font-extrabold tracking-tight tabular-nums">
                      {f.precio}
                      {f.done && (
                        <span className="ml-2 text-xs font-semibold text-brand-cyan">se acredita</span>
                      )}
                    </p>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-foreground/[0.07]">
                    <div
                      className={f.done ? "h-full rounded-full bg-brand-cyan/60" : "gradient-brand h-full rounded-full"}
                      style={{ width: `${f.pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-foreground-subtle">{f.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-foreground-muted">
              Suma de fases <b className="text-foreground">$910,000</b> − crédito de Fase 0 ={" "}
              <b className="text-gradient-brand">$840,000 MXN + IVA</b>
            </p>
          </div>
        </Container>
      </section>

      {/* ===== Lo que se ahorran ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge>El retorno</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Lo que el sistema <span className="text-gradient-brand">te devuelve</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
              Estimaciones conservadoras a partir de tu propia operación — las
              afinamos juntos en la junta:
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {AHORROS.map((a) => (
              <div key={a.titulo} className="rounded-3xl border border-border bg-foreground/[0.03] p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold">{a.titulo}</h3>
                  <span className="text-gradient-brand shrink-0 text-lg font-extrabold">{a.monto}</span>
                </div>
                <p className="mt-2 text-sm text-foreground-muted">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-brand-cyan/30 bg-brand-cyan/[0.06] p-5 text-center text-sm text-foreground-muted">
            Con ahorros conservadores de <b className="text-foreground">$45–70 mil MXN al mes</b> —
            sin contar un solo embarque rechazado evitado — el sistema{" "}
            <b className="text-foreground">se paga solo en 12–18 meses</b>. Todo lo demás es ganancia operativa.
          </div>
        </Container>
      </section>

      {/* ===== Por qué NEWEBD ===== */}
      <section className="border-t border-border bg-foreground/[0.02] py-20 sm:py-24">
        <Container>
          <div className="text-center">
            <Badge>Por qué vale la pena</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Por qué <span className="text-gradient-brand">con NEWEBD</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {PORQUE.map((p) => (
              <div key={p.titulo} className="rounded-3xl border border-border bg-background/60 p-6">
                <span className="gradient-brand-soft grid size-12 place-items-center rounded-2xl">
                  <p.icon className="size-6 text-brand-purple" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{p.titulo}</h3>
                <p className="mt-1.5 text-sm text-foreground-muted">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl border border-border p-10 text-center sm:p-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-20 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-brand-purple/30 blur-[120px]" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Tu operación entera, en un solo lugar, en 12 semanas
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-foreground-muted">
              El prototipo ya existe. El plan ya existe. Solo falta arrancar.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-brand inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-semibold text-white shadow-[0_10px_40px_-12px_rgba(139,92,246,0.55)] transition-all hover:-translate-y-0.5"
              >
                Explorar el demo <ArrowRight className="size-5" />
              </a>
              <a
                href="/contacto"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium text-foreground ring-1 ring-inset ring-border-strong transition-colors hover:bg-foreground/[0.06]"
              >
                Agendar la junta
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
