import type { Locale } from "@/i18n/routing";

/**
 * Copy de la página /vegemex, separado por idioma.
 *
 * La ESTRUCTURA (orden de tarjetas, cifras, clases, iconos, rutas de enlace)
 * vive en `recap.tsx`; aquí solo viven las PALABRAS. Por eso los arreglos de
 * este archivo deben conservar el mismo largo y el mismo orden en `es` y `en`
 * — TypeScript obliga a que ambos cumplan `VegemexCopy`, y `recap.tsx` los
 * empareja por índice con los datos numéricos.
 */

type Mod = {
  badge: string;
  h3: string;
  /** Ruta o ubicación dentro del portal (se muestra bajo el título). */
  route: string;
  p: string;
  /** Nota al pie de la tarjeta, se antepone el diamante. */
  pdf: string;
};

export type VegemexCopy = {
  meta: { title: string; description: string };
  lang: { label: string };
  hero: {
    eyebrow: string;
    /** Admite <span class="g"> para el tramo con gradiente. */
    h1: string;
    lede: string;
    ctaPortal: string;
    ctaRecent: string;
    ctaReview: string;
    ctaQuote: string;
    chips: [string, string, string];
  };
  journey: {
    kicker: string;
    h2: string;
    lede: string;
    steps: { num: string; h3: string; p: string }[];
  };
  chain: {
    kicker: string;
    h2: string;
    lede: string;
    nodes: { s: string; t: string }[];
    legend: [string, string, string];
    transversalLabel: string;
    transversalPills: [string, string, string];
    note: string;
  };
  executed: { kicker: string; h2: string; lede: string; statLabels: string[] };
  finance: { labels: [string, string, string, string]; insight: string };
  built: { kicker: string; h2: string; lede: string; mods: Mod[] };
  values: { kicker: string; h2: string; items: { h4: string; p: string }[] };
  recent: { kicker: string; h2: string; lede: string; mods: Mod[] };
  review: {
    kicker: string;
    h2: string;
    lede: string;
    items: { h4: string; route: string; p: string }[];
  };
  needs: {
    kicker: string;
    h2: string;
    lede: string;
    items: { h4: string; p: string }[];
  };
  quote: {
    kicker: string;
    h2: string;
    lede: string;
    ctaFull: string;
    ctaPdf: string;
    chips: [string, string, string];
  };
  next: { kicker: string; h2: string; lede: string; items: string[] };
  close: {
    kicker: string;
    h2: string;
    p: string;
    cta: string;
    signTagline: string;
    cotzQuestion: string;
    cotzQuote: string;
    cotzPdf: string;
  };
};

const es: VegemexCopy = {
  meta: {
    title: "Vegemex — Integración entregada",
    description:
      "De la propuesta a la operación real: cómo NEWEBD integró toda la operación de Vegemex en el portal y la dejó lista para usarse.",
  },
  lang: { label: "Idioma" },
  hero: {
    eyebrow: "Integración entregada · actualizado agosto 2026",
    h1: 'Tu operación real, ya <span class="g">viva dentro del portal.</span>',
    lede: "Partimos de una propuesta. Luego leímos tus Excel, entendimos toda la cadena de exportación y la <strong>ejecutamos directamente</strong> en el sistema. Ya no es una demo: son <strong>tres temporadas de tu operación</strong> —cargadas, verificadas en vivo y listas para que el equipo las use hoy.",
    ctaPortal: "Abrir el portal",
    ctaRecent: "Ver lo más reciente",
    ctaReview: "Lo que hay que revisar",
    ctaQuote: "Ver la cotización",
    chips: [
      "En producción en panel.vegemex.com.mx",
      "Respaldo tomado antes de cargar",
      "Verificado módulo por módulo",
    ],
  },
  journey: {
    kicker: "Cómo llegamos aquí",
    h2: "De la propuesta a la operación, en cuatro pasos.",
    lede: "No entregamos un plan para que alguien lo capture después. Lo hicimos nosotros, directo sobre tu sistema.",
    steps: [
      {
        num: "PASO 01",
        h3: "La propuesta",
        p: "Te mostramos un portal con la forma de tu operación de exportación: el molde correcto.",
      },
      {
        num: "PASO 02",
        h3: "Leímos tus Excel",
        p: "Nos mandaste la operación completa —15+ hojas que hoy corren a mano, más miles de PDFs y CFDIs. La estudiamos entera.",
      },
      {
        num: "PASO 03",
        h3: "Integramos y ejecutamos",
        p: "Convertimos esos Excel en datos reales dentro del portal. Un respaldo antes; carga y verificación uno por uno.",
      },
      {
        num: "PASO 04 · LISTO",
        h3: "Listo para usarse",
        p: "El equipo entra y encuentra su operación real: buscable, conectada y con PDFs con el formato oficial.",
      },
    ],
  },
  chain: {
    kicker: "Lo que vimos en tus Excel",
    h2: "Toda tu cadena, de la semilla a la liquidación.",
    lede: 'Vegemex no maneja "una web": corre una cadena de suministro y exportación completa. La mapeamos entera para que el portal la refleje tal cual.',
    nodes: [
      { s: "Compra", t: "Semilla" },
      { s: "Compra", t: "Invernadero" },
      { s: "Campo", t: "Agricultor" },
      { s: "Compra", t: "Material" },
      { s: "Proceso", t: "Maquila" },
      { s: "Salida", t: "Embarque" },
      { s: "Carta porte", t: "Flete" },
      { s: "Destino", t: "QC / calidad" },
      { s: "Costo", t: "Costeo" },
      { s: "Cobranza", t: "Facturación" },
      { s: "Pago", t: "Liquidación" },
    ],
    legend: [
      "Compras / procurement",
      "Operación de exportación",
      "Dinero",
    ],
    transversalLabel: "Transversal a todo",
    transversalPills: [
      "Inocuidad · Primus GFS",
      "Inventario y almacén",
      "Servicios: aduana e inspección",
    ],
    note: "Cada eslabón vivía en su propio Excel, aparte del sistema. El portal ahora los conecta en un solo flujo.",
  },
  executed: {
    kicker: "Lo que ejecutamos directamente",
    h2: "Tu historia, cargada y verificada en vivo.",
    lede: "Invierno 2025–26 y verano 2026, ya adentro. Estos no son datos de ejemplo: son tus registros reales, ya funcionando en el portal.",
    statLabels: [
      "Embarques reales cargados",
      "Cajas entregadas registradas",
      "Liquidaciones históricas",
      "Manifiestos (maquila + proveedor)",
      "Pagos de flete, con banco y CLABE",
      "Agricultores en el catálogo",
      "Transportistas · 50 tarifas por ruta",
      "Cotizaciones / costeo por carga",
      "Productos · 9 clientes de exportación",
      "Órdenes de compra reales",
      "Registros de inocuidad y vigencias",
      "Programa de cosecha · 8 contratos",
    ],
  },
  finance: {
    labels: [
      "Ventas registradas",
      "Margen NETO promedio",
      "Utilidad neta",
      "Liquidado a la cadena",
    ],
    insight:
      "Tu operación se veía con <strong>~68% de margen</strong> mirando solo el costo logístico. Al sumar el <strong>costo del vegetal por carga</strong>, el portal muestra el margen NETO real: <strong>25.6%</strong>. Salieron a la luz incluso cargas que perdieron dinero (una hasta −1.64 USD por caja). Eso ahora se ve de un vistazo, no hasta el cierre del año.",
  },
  built: {
    kicker: "Lo nuevo que construimos",
    h2: "Dos módulos que te faltaban, ya en vivo.",
    lede: "Los huecos que revelaron tus Excel —compras y logística— ahora tienen su lugar en el portal, calcados de tus formatos reales.",
    mods: [
      {
        badge: "Nuevo",
        h3: "Compras y órdenes de compra",
        route: "/compras",
        p: 'Calcado de tu machote "Orden de compra VGM". Semilla, plántula, material y servicios, con flujo Solicitada → Enviada → Recibida → Facturada → Pagada.',
        pdf: "PDF imprimible con membrete oficial",
      },
      {
        badge: "Nuevo",
        h3: "Logística y manifiestos",
        route: "/logistica",
        p: "Orden de salida de maquila con supervisores, chofer y distribución de producto. Tres versiones —maquila, proveedor y cliente— cada una con su documento.",
        pdf: "PDF por tipo de manifiesto",
      },
      {
        badge: "Ampliado",
        h3: "Formularios de alta reales",
        route: "Embarques · Clientes",
        p: 'El alta de embarque ganó un "modo Completo" con los ~15 campos reales (agricultor, maquila, transportista, precio USD, PO, fechas). Los clientes ahora guardan términos de exportación: moneda, incoterm, puerto y crédito.',
        pdf: "Captura fiel a tu operación",
      },
    ],
  },
  values: {
    kicker: "Cómo mejora tu sistema",
    h2: "Lo que cambia para el equipo, en concreto.",
    items: [
      {
        h4: "Una sola fuente de verdad",
        p: "Lo que vivía en 15+ Excel sueltos ahora está en un solo lugar, conectado y buscable.",
      },
      {
        h4: "El margen real, no el aparente",
        p: "El costo del vegetal ya entra al cálculo. Ves utilidad neta por carga, no una cifra inflada.",
      },
      {
        h4: "PDFs con un clic",
        p: "Órdenes de compra, manifiestos y liquidaciones se imprimen con tu formato oficial.",
      },
      {
        h4: "Tu historia, ya cargada",
        p: "Invierno 25–26 y verano 26 adentro. El equipo consulta el pasado y da de alta lo nuevo.",
      },
      {
        h4: "Listo para la capa de IA",
        p: "Con la operación estructurada, el siguiente paso es un asistente que lea y registre por ti.",
      },
      {
        h4: "Sin riesgo en la carga",
        p: "Tomamos un respaldo completo antes de reemplazar el demo, y verificamos cada módulo en vivo.",
      },
    ],
  },
  recent: {
    kicker: "Lo más reciente · agosto 2026",
    h2: "Lo que entregamos después de la carga.",
    lede: "Con tu operación ya dentro, seguimos construyendo sobre ella. Esto es lo que se sumó al portal en las últimas semanas — todo en vivo.",
    mods: [
      {
        badge: "Nuevo",
        h3: "Torre de control",
        route: "/dashboard",
        p: "El tablero de inicio ahora gira alrededor del programa de cargas: qué se mueve hoy, qué expediente está incompleto, qué llega tarde y el retorno real de la temporada — todo en vivo, sin abrir un módulo.",
        pdf: "Alertas de lo que requiere tu atención",
      },
      {
        badge: "Nuevo",
        h3: "Roles y permisos por área",
        route: "/permisos",
        p: "Cada persona entra solo a lo suyo. Dirección y administración ven todo y deciden, con interruptores, qué área toca a cada rol operativo — con excepciones por persona cuando hace falta.",
        pdf: "Finanzas y expedientes legales, protegidos",
      },
      {
        badge: "Nuevo",
        h3: "Expediente de la carga",
        route: "/embarques",
        p: "La carga es el centro de todo: una línea de tiempo de siembra a entrega, el porcentaje de llenado del expediente y los días que faltan para entregar. Lo que falta se llena ahí mismo.",
        pdf: "Cosecha, manifiestos y costeo en un solo lugar",
      },
      {
        badge: "Unificado",
        h3: "Materiales, inventario y compras",
        route: "/materiales",
        p: "Un solo lugar: existencias, movimientos y órdenes de compra. La orden de compra entra sola al inventario y la carga descuenta sola lo que consume.",
        pdf: "Automático de punta a punta",
      },
      {
        badge: "Ampliado",
        h3: "Manifiestos, los cuatro tipos",
        route: "Desde el expediente",
        p: "Maquila, proveedor, cliente y embarque. Se crean desde la carga, se rellenan solos con lo que ya capturaste y heredan supervisores y transporte del manifiesto hermano.",
        pdf: "PDF con el formato oficial de cada tipo",
      },
      {
        badge: "Nuevo",
        h3: "Área jurídica con firma digital",
        route: "/contratos",
        p: "Contratos por agricultor con sus anexos reales —calidad, programa de cargas y plan de pagos— y firma por liga: el agricultor firma desde su celular y queda registrada.",
        pdf: "Expediente de documentos por proveedor",
      },
      {
        badge: "Ampliado",
        h3: "El expediente, completo",
        route: "/embarques → abrir una carga",
        p: "Servicio de empaque, costo del flete con su tabulador, aduana de cruce y los dos despachos, carga consolidada de varios productos, y la cita en destino con los días de retraso que se recalculan solos.",
        pdf: "Inocuidad del agricultor, dentro de la carga",
      },
      {
        badge: "Ampliado",
        h3: "Concentrado de gastos",
        route: "Expediente → flujo de dinero",
        p: "Los 18 conceptos de sus hojas de costeo, editables, más el pago al agricultor. Suma todo, calcula el retorno y les dice qué concepto falta capturar.",
        pdf: "Avisa cuando el retorno guardado no cuadra",
      },
      {
        badge: "Fiel al formato",
        h3: "Manifiestos con su machote real",
        route: "Expediente → manifiestos",
        p: "La orden de salida de empaque con sus dos listas de verificación y sus tablas de entrada y desglose; el manifiesto de embarque con origen, cliente, factura, registro FDA, sello, termógrafo y los dos despachos aduanales.",
        pdf: "Cada documento dice para qué sirve",
      },
      {
        badge: "Nuevo",
        h3: "Termógrafos Copeland",
        route: "Expediente → ruta y traslado",
        p: "El número GO del termógrafo vive en la carga. Desde ahí se abre el rastreo del portal de Copeland y el sistema arma los datos del envío listos para pegar: el folio de la carga ya es el nombre del viaje.",
        pdf: "Falta que Copeland comparta su API",
      },
      {
        badge: "Nuevo",
        h3: "Programa de cosecha en tres capas",
        route: "/cosecha",
        p: "Lo comprometido con el cliente por producto y mes; quién surte cada semana con el semáforo contra las cargas reales; y la postura completa de campo, de la semilla al lote.",
        pdf: "Las fechas se calculan con la ficha del cultivo",
      },
    ],
  },
  review: {
    kicker: "Para su equipo",
    h2: "Lo que necesitamos que revisen.",
    lede: "Todo lo de arriba ya está en línea y verificado técnicamente. Lo que falta es el visto bueno de quien lo usa todos los días. Esta es la lista, en el orden en que conviene recorrerla.",
    items: [
      {
        h4: "Los nombres",
        route: "todo el portal",
        p: "Maquila ahora se lee <strong>Empaque</strong> en todas partes, y a la empresa le pusimos <strong>empacadora</strong>. «Flete y transporte» quedó como <strong>Flete</strong> y «fletero» como <strong>proveedor</strong>. Si prefieren otra palabra, se cambia en minutos.",
      },
      {
        h4: "El expediente de una carga",
        route: "/embarques → abrir cualquiera",
        p: "Recorran los grupos: empaque, flete, cliente y destino, fechas, flujo de dinero, ruta, manifiestos e inocuidad. ¿Falta algún campo que usan a diario? ¿Sobra alguno?",
      },
      {
        h4: "Los cuatro manifiestos y sus PDF",
        route: "expediente → manifiestos",
        p: "Generen uno de cada tipo y compárenlo contra su formato en papel. Los de <strong>empaque</strong> y <strong>embarque</strong> los hicimos con sus machotes reales; los de <strong>proveedor</strong> y <strong>cliente</strong> todavía no.",
      },
      {
        h4: "El concentrado de gastos",
        route: "expediente → flujo de dinero",
        p: "Abran una carga con costeo y revisen si los 18 conceptos son los correctos. <strong>Ojo aquí:</strong> el retorno guardado no cuadra en 131 de 246 cargas porque el pago al agricultor viene capturado por caja, no completo. El sistema lo señala y ofrece el cálculo, pero no pisa su cifra sin que ustedes lo decidan.",
      },
      {
        h4: "El porcentaje del expediente",
        route: "/embarques y torre de control",
        p: "Bajó a 44 % en promedio a propósito: ahora exige cuatro datos nuevos (servicio de empaque, costo de flete, aduana y agente aduanal). No es que se haya perdido información — es que ahora mide lo que de verdad falta.",
      },
      {
        h4: "El programa de cosecha",
        route: "/cosecha",
        p: "Tres pestañas nuevas. Revisen si la rejilla del compromiso refleja cómo lo manejan, si el semáforo semanal les sirve, y si la ficha del cultivo de la iceberg quedó bien cargada.",
      },
      {
        h4: "La contraseña de Copeland",
        route: "acción de seguridad",
        p: "El documento interno de termógrafos trae usuario y contraseña en texto plano y circula por correo. <strong>Recomendamos cambiarla</strong> y capturarla en el portal, donde queda protegida y nadie la ve completa.",
      },
    ],
  },
  needs: {
    kicker: "Lo que falta",
    h2: "Depende de ustedes, no de nosotros.",
    lede: "Cuatro cosas están detenidas esperando información que solo Vegemex tiene. En cuanto llegue, se construyen.",
    items: [
      {
        h4: "La API de Copeland",
        p: "Para que la temperatura y la posición se vean dentro del expediente hace falta que Copeland comparta su documentación: cómo autentica y cuál es el endpoint de lecturas por número GO. El conector ya está escrito esperándola.",
      },
      {
        h4: "Los machotes de manifiesto de proveedor y de cliente",
        p: "Con los de empaque y embarque quedaron idénticos a su formato. Faltan esos dos ejemplos reales para dejarlos igual de fieles.",
      },
      {
        h4: "Los programas de siembra de los otros seis cultivos",
        p: "Tenemos el de lechuga iceberg. Con los de apio, brócoli, coliflor, romaine, green leaf y red leaf se carga la temporada completa y cada cultivo tiene su ficha.",
      },
      {
        h4: "Su visto bueno de la lista de arriba",
        p: "Sobre esa revisión salen los ajustes finos. Nada de lo entregado se toca sin que ustedes lo pidan.",
      },
    ],
  },
  quote: {
    kicker: "La propuesta",
    h2: "La cotización, siempre a la mano.",
    lede: "El acuerdo completo: alcance, fases, inversión y el despliegue de pagos a 24 meses.",
    ctaFull: "Ver la cotización completa",
    ctaPdf: "Descargar en PDF",
    chips: [
      "Inversión acordada · $1,015,000 MXN + IVA",
      "24 mensualidades de $49,058.33 con IVA",
      "Sin intereses ni costo financiero",
    ],
  },
  next: {
    kicker: "Lo que sigue (opcional)",
    h2: "Sobre esta base, los próximos pasos.",
    lede: "La operación ya está adentro. Lo demás es enriquecerla cuando lo decidas.",
    items: [
      "Activar el asistente de IA del portal",
      "Correo automático de recordatorio para firmar contratos",
      "Alertas del programa de cosecha en la torre de control",
      "Enriquecer clientes con contactos y datos fiscales",
      "Notas de remisión y evidencias de temperatura",
      "WhatsApp IA — disponible cuando lo decidan",
    ],
  },
  close: {
    kicker: "Ya está en línea",
    h2: "Tu operación te está esperando en el portal.",
    p: "Entra con tu equipo y recórrela: los 379 embarques, las liquidaciones, los manifiestos y las compras, tal como los viven todos los días.",
    cta: "Abrir panel.vegemex.com.mx",
    signTagline: "El nuevo desarrollo es con IA — integrada en tu operación.",
    cotzQuestion: "¿Buscas la propuesta?",
    cotzQuote: "Ver la cotización completa →",
    cotzPdf: "Descargar PDF →",
  },
};

const en: VegemexCopy = {
  meta: {
    title: "Vegemex — Integration delivered",
    description:
      "From proposal to live operation: how NEWEBD moved all of Vegemex's operation into the portal and left it ready to use.",
  },
  lang: { label: "Language" },
  hero: {
    eyebrow: "Integration delivered · updated August 2026",
    h1: 'Your real operation, already <span class="g">live inside the portal.</span>',
    lede: "We started from a proposal. Then we read your spreadsheets, mapped your entire export chain and <strong>ran it straight into the system</strong>. This is no longer a demo: it is <strong>three seasons of your operation</strong> — loaded, verified live and ready for your team to use today.",
    ctaPortal: "Open the portal",
    ctaRecent: "See the latest",
    ctaReview: "What needs your review",
    ctaQuote: "See the quote",
    chips: [
      "In production at panel.vegemex.com.mx",
      "Full backup taken before loading",
      "Verified module by module",
    ],
  },
  journey: {
    kicker: "How we got here",
    h2: "From proposal to live operation, in four steps.",
    lede: "We did not hand over a plan for someone else to key in later. We did it ourselves, straight into your system.",
    steps: [
      {
        num: "STEP 01",
        h3: "The proposal",
        p: "We showed you a portal shaped like your export operation: the right frame to build on.",
      },
      {
        num: "STEP 02",
        h3: "We read your spreadsheets",
        p: "You sent us the whole operation — 15+ workbooks still run by hand, plus thousands of PDFs and CFDI invoices. We studied all of it.",
      },
      {
        num: "STEP 03",
        h3: "We integrated and executed",
        p: "We turned those spreadsheets into real records inside the portal. A backup first; then loading and verification, one by one.",
      },
      {
        num: "STEP 04 · DONE",
        h3: "Ready to use",
        p: "Your team logs in and finds its real operation: searchable, connected, with PDFs in your official format.",
      },
    ],
  },
  chain: {
    kicker: "What we found in your spreadsheets",
    h2: "Your whole chain, from seed to settlement.",
    lede: 'Vegemex does not run "a website": it runs a complete supply and export chain. We mapped all of it so the portal mirrors it exactly.',
    nodes: [
      { s: "Purchase", t: "Seed" },
      { s: "Purchase", t: "Greenhouse" },
      { s: "Field", t: "Grower" },
      { s: "Purchase", t: "Materials" },
      { s: "Process", t: "Packing" },
      { s: "Dispatch", t: "Shipment" },
      { s: "Carta Porte", t: "Freight" },
      { s: "Destination", t: "QC / quality" },
      { s: "Cost", t: "Costing" },
      { s: "Receivables", t: "Invoicing" },
      { s: "Payment", t: "Settlement" },
    ],
    legend: ["Purchasing / procurement", "Export operation", "Money"],
    transversalLabel: "Cuts across everything",
    transversalPills: [
      "Food safety · Primus GFS",
      "Inventory and warehouse",
      "Services: customs and inspection",
    ],
    note: "Every link lived in its own spreadsheet, outside the system. The portal now connects them into a single flow.",
  },
  executed: {
    kicker: "What we executed directly",
    h2: "Your history, loaded and verified live.",
    lede: "Winter 2025–26 and summer 2026 are already in. These are not sample records: they are your real data, already working in the portal.",
    statLabels: [
      "Real shipments loaded",
      "Boxes delivered, on record",
      "Historical settlements",
      "Manifests (packing + supplier)",
      "Freight payments, with bank and CLABE",
      "Growers in the catalog",
      "Carriers · 50 rates by route",
      "Quotes / costing per load",
      "Products · 9 export customers",
      "Real purchase orders",
      "Food-safety records and expiry dates",
      "Harvest program · 8 contracts",
    ],
  },
  finance: {
    labels: [
      "Sales on record",
      "Average NET margin",
      "Net profit",
      "Settled to the chain",
    ],
    insight:
      "Looking only at logistics cost, your operation appeared to run at a <strong>~68% margin</strong>. Once the <strong>produce cost per load</strong> is added in, the portal shows the real NET margin: <strong>25.6%</strong>. It even surfaced loads that lost money (one down to −1.64 USD per box). You now see that at a glance, not at year-end close.",
  },
  built: {
    kicker: "What we built new",
    h2: "Two modules you were missing, already live.",
    lede: "The gaps your spreadsheets revealed — purchasing and logistics — now have their place in the portal, modeled on your real forms.",
    mods: [
      {
        badge: "New",
        h3: "Purchasing and purchase orders",
        route: "/compras",
        p: 'Modeled on your "Orden de compra VGM" template. Seed, seedlings, materials and services, with a Requested → Sent → Received → Invoiced → Paid flow.',
        pdf: "Printable PDF on your official letterhead",
      },
      {
        badge: "New",
        h3: "Logistics and manifests",
        route: "/logistica",
        p: "Packinghouse release order with supervisors, driver and product breakdown. Three versions — packing, supplier and customer — each with its own document.",
        pdf: "A PDF for each manifest type",
      },
      {
        badge: "Extended",
        h3: "Real intake forms",
        route: "Shipments · Customers",
        p: 'Shipment intake gained a "Full" mode with the ~15 real fields (grower, packinghouse, carrier, USD price, PO, dates). Customers now store export terms: currency, incoterm, port and credit.',
        pdf: "Data entry true to your operation",
      },
    ],
  },
  values: {
    kicker: "How your system gets better",
    h2: "What changes for the team, concretely.",
    items: [
      {
        h4: "A single source of truth",
        p: "What lived in 15+ loose spreadsheets is now in one place, connected and searchable.",
      },
      {
        h4: "The real margin, not the apparent one",
        p: "Produce cost is now part of the math. You see net profit per load, not an inflated figure.",
      },
      {
        h4: "PDFs in one click",
        p: "Purchase orders, manifests and settlements print in your official format.",
      },
      {
        h4: "Your history, already loaded",
        p: "Winter 25–26 and summer 26 are in. The team looks up the past and enters what is new.",
      },
      {
        h4: "Ready for the AI layer",
        p: "With the operation structured, the next step is an assistant that reads and records for you.",
      },
      {
        h4: "No risk in the load",
        p: "We took a full backup before replacing the demo, and verified every module live.",
      },
    ],
  },
  recent: {
    kicker: "Latest · August 2026",
    h2: "What we delivered after the load.",
    lede: "With your operation already in, we kept building on top of it. This is what was added to the portal over the last weeks — all live.",
    mods: [
      {
        badge: "New",
        h3: "Control tower",
        route: "/dashboard",
        p: "The home dashboard now revolves around the load schedule: what is moving today, which file is incomplete, what is running late and the season's real return — all live, without opening a single module.",
        pdf: "Alerts for whatever needs your attention",
      },
      {
        badge: "New",
        h3: "Roles and permissions by area",
        route: "/permisos",
        p: "Each person only gets into their own area. Management and admin see everything and decide, with switches, which area each operating role can touch — with per-person exceptions when needed.",
        pdf: "Finance and legal files, protected",
      },
      {
        badge: "New",
        h3: "The load file",
        route: "/embarques",
        p: "The load is the center of everything: a timeline from planting to delivery, how complete the file is, and the days left to deliver. Whatever is missing gets filled in right there.",
        pdf: "Harvest, manifests and costing in one place",
      },
      {
        badge: "Unified",
        h3: "Materials, inventory and purchasing",
        route: "/materiales",
        p: "One single place: stock, movements and purchase orders. The purchase order posts itself into inventory, and the load draws down what it consumes on its own.",
        pdf: "Automatic end to end",
      },
      {
        badge: "Extended",
        h3: "Manifests, all four types",
        route: "From the load file",
        p: "Packing, supplier, customer and shipment. They are created from the load, fill themselves in with what you already entered, and inherit supervisors and transport from their sibling manifest.",
        pdf: "A PDF in the official format for each type",
      },
      {
        badge: "New",
        h3: "Legal area with digital signature",
        route: "/contratos",
        p: "Contracts per grower with their real annexes — quality, load schedule and payment plan — and signing by link: the grower signs from their phone and it is on record.",
        pdf: "A document file for every supplier",
      },
      {
        badge: "Extended",
        h3: "The complete file",
        route: "/embarques → open a load",
        p: "Packing service, freight cost against its rate table, border crossing and both customs clearances, consolidated loads with several products, and the destination appointment with delay days that recalculate themselves.",
        pdf: "Grower food-safety records, inside the load",
      },
      {
        badge: "Extended",
        h3: "Expense summary",
        route: "Load file → cash flow",
        p: "The 18 line items from your costing sheets, editable, plus the grower payment. It adds everything up, calculates the return and tells you which item is still missing.",
        pdf: "Flags when the saved return does not add up",
      },
      {
        badge: "True to your format",
        h3: "Manifests on your real template",
        route: "Load file → manifests",
        p: "The packinghouse release order with its two checklists and its intake and breakdown tables; the shipment manifest with origin, customer, invoice, FDA registration, seal, temperature recorder and both customs clearances.",
        pdf: "Every document states what it is for",
      },
      {
        badge: "New",
        h3: "Copeland temperature recorders",
        route: "Load file → route and transit",
        p: "The recorder's GO number lives on the load. From there you open tracking in Copeland's portal, and the system assembles the shipment data ready to paste: the load number is already the trip name.",
        pdf: "Pending: Copeland sharing their API",
      },
      {
        badge: "New",
        h3: "Harvest program in three layers",
        route: "/cosecha",
        p: "What is committed to the customer by product and month; who supplies each week, with a traffic light against actual loads; and the full field planting, from seed to lot.",
        pdf: "Dates are calculated from the crop profile",
      },
    ],
  },
  review: {
    kicker: "For your team",
    h2: "What we need you to review.",
    lede: "Everything above is online and technically verified. What is left is sign-off from the people who use it every day. Here is the list, in the order worth going through it.",
    items: [
      {
        h4: "The wording",
        route: "across the portal",
        p: "Maquila now reads <strong>Empaque</strong> (packing) everywhere, and the company is called <strong>empacadora</strong> (packinghouse). «Flete y transporte» became <strong>Flete</strong> (freight) and «fletero» became <strong>proveedor</strong> (supplier). If you prefer other words, it is a change of minutes.",
      },
      {
        h4: "A load's file",
        route: "/embarques → open any load",
        p: "Walk through the groups: packing, freight, customer and destination, dates, cash flow, route, manifests and food safety. Is any field you use daily missing? Is any one of them unnecessary?",
      },
      {
        h4: "The four manifests and their PDFs",
        route: "load file → manifests",
        p: "Generate one of each type and compare it against your paper form. We built the <strong>packing</strong> and <strong>shipment</strong> ones from your real templates; the <strong>supplier</strong> and <strong>customer</strong> ones not yet.",
      },
      {
        h4: "The expense summary",
        route: "load file → cash flow",
        p: "Open a load with costing and check whether the 18 line items are the right ones. <strong>Careful here:</strong> the saved return does not add up on 131 of 246 loads, because the grower payment was entered per box instead of in full. The system flags it and offers the calculation, but it will not overwrite your figure unless you decide to.",
      },
      {
        h4: "The file-completeness percentage",
        route: "/embarques and control tower",
        p: "It dropped to 44% on average on purpose: it now requires four new fields (packing service, freight cost, customs and customs broker). No information was lost — it simply measures what is genuinely missing now.",
      },
      {
        h4: "The harvest program",
        route: "/cosecha",
        p: "Three new tabs. Check whether the commitment grid reflects how you actually manage it, whether the weekly traffic light is useful, and whether the iceberg crop profile was loaded correctly.",
      },
      {
        h4: "The Copeland password",
        route: "security action",
        p: "Your internal temperature-recorder document carries the username and password in plain text and circulates by email. <strong>We recommend changing it</strong> and storing it in the portal, where it is protected and nobody sees it in full.",
      },
    ],
  },
  needs: {
    kicker: "What is still pending",
    h2: "It depends on you, not on us.",
    lede: "Four things are on hold waiting for information only Vegemex has. The moment it arrives, we build them.",
    items: [
      {
        h4: "Copeland's API",
        p: "For temperature and position to show inside the load file, Copeland needs to share their documentation: how it authenticates and which endpoint returns readings by GO number. The connector is already written, waiting for it.",
      },
      {
        h4: "The supplier and customer manifest templates",
        p: "The packing and shipment ones came out identical to your format. We need those two real samples to make them just as faithful.",
      },
      {
        h4: "The planting programs for the other six crops",
        p: "We have iceberg lettuce. With celery, broccoli, cauliflower, romaine, green leaf and red leaf, the full season loads and every crop gets its own profile.",
      },
      {
        h4: "Your sign-off on the list above",
        p: "The fine-tuning comes out of that review. Nothing already delivered gets touched unless you ask for it.",
      },
    ],
  },
  quote: {
    kicker: "The proposal",
    h2: "The quote, always at hand.",
    lede: "The full agreement: scope, phases, investment and the 24-month payment schedule.",
    ctaFull: "See the full quote (Spanish)",
    ctaPdf: "Download the PDF (Spanish)",
    chips: [
      "Agreed investment · $1,015,000 MXN + VAT",
      "24 monthly payments of $49,058.33, VAT included",
      "No interest, no financing cost",
    ],
  },
  next: {
    kicker: "What comes next (optional)",
    h2: "On this base, the next steps.",
    lede: "The operation is already in. Everything else is enriching it, whenever you decide.",
    items: [
      "Turn on the portal's AI assistant",
      "Automatic reminder email to sign contracts",
      "Harvest-program alerts in the control tower",
      "Enrich customers with contacts and tax data",
      "Delivery notes and temperature evidence",
      "WhatsApp AI — available whenever you decide",
    ],
  },
  close: {
    kicker: "It is already online",
    h2: "Your operation is waiting for you in the portal.",
    p: "Log in with your team and walk through it: the 379 shipments, the settlements, the manifests and the purchase orders, exactly as you live them every day.",
    cta: "Open panel.vegemex.com.mx",
    signTagline: "The new way to build is with AI — integrated into your operation.",
    cotzQuestion: "Looking for the proposal (in Spanish)?",
    cotzQuote: "See the full quote →",
    cotzPdf: "Download the PDF →",
  },
};

export const VEGEMEX_COPY: Record<Locale, VegemexCopy> = { es, en };
