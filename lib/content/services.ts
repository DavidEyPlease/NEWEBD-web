export type ServiceItem = {
  title: string;
  description: string;
  deliverables: string[];
};

export type ServiceCategory = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  isDifferentiator?: boolean;
  items: ServiceItem[];
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: "desarrollo-web",
    number: "01",
    title: "Desarrollo Web",
    tagline: "Tu presencia en internet con la profesionalidad que se merece.",
    description:
      "Sitios y experiencias web para presencia y captación. No plantillas — diseño y código para clientes reales.",
    highlights: [
      "Webs institucionales",
      "Landings de conversión",
      "Tiendas online",
      "Portales y micrositios",
    ],
    items: [
      {
        title: "Páginas web institucionales / corporativas",
        description:
          "Tu negocio en internet con la profesionalidad que se merece. Comunican quién eres, qué haces y por qué deberían elegirte.",
        deliverables: [
          "Diseño visual a medida",
          "Secciones según necesidad",
          "Responsive móvil/tablet/escritorio",
          "Formulario de contacto",
          "SEO base",
          "Panel de administración opcional",
        ],
      },
      {
        title: "Landing pages de alta conversión",
        description:
          "Páginas pensadas para vender un producto, capturar leads o lanzar una campaña. Copy + datos para que el visitante haga lo que quieres que haga.",
        deliverables: [
          "Copywriting orientado a conversión",
          "Diseño visual a medida",
          "Integración con CRM o email",
          "Eventos de medición (GA, Meta Pixel)",
          "Formulario o checkout integrado",
          "Pruebas A/B opcionales",
        ],
      },
      {
        title: "Tiendas online (e-commerce)",
        description:
          "Tu propio canal de venta digital, sin depender de marketplaces ajenos. Catálogo, carrito, pagos y envíos para vender 24/7.",
        deliverables: [
          "Catálogo de productos",
          "Carrito y checkout",
          "Pasarela de pago (Stripe, PayPal, Mercado Pago)",
          "Gestión de inventario",
          "Panel de administración",
          "Integración con paquetería",
          "Facturación electrónica si aplica",
        ],
      },
      {
        title: "Portales y micrositios",
        description:
          "Plataformas web complejas: portales de clientes, áreas membership, micrositios de campaña, plataformas de contenido.",
        deliverables: [
          "Autenticación de usuarios",
          "Áreas privadas",
          "Gestión de contenidos",
          "Integraciones a medida",
          "Paneles personalizados",
        ],
      },
    ],
  },
  {
    slug: "aplicaciones-a-medida",
    number: "02",
    title: "Aplicaciones a Medida",
    tagline: "Software propio para clientes finales o usuarios internos.",
    description:
      "Web apps, PWAs y apps móviles iOS/Android. Software interno que reemplaza Excel y conecta áreas.",
    highlights: [
      "Web apps y PWAs",
      "Apps iOS / Android",
      "Software interno",
      "Dashboards a la medida",
    ],
    items: [
      {
        title: "Aplicaciones web (web apps, PWAs)",
        description:
          "Software accesible desde cualquier navegador. PWAs que se sienten como app nativa pero se actualizan sin pasar por la tienda. Ideal para herramientas internas, SaaS, dashboards.",
        deliverables: [
          "Diseño UX/UI",
          "Frontend a medida",
          "Backend con base de datos",
          "Autenticación de usuarios",
          "Panel de administración",
          "Despliegue en la nube",
          "Documentación técnica",
        ],
      },
      {
        title: "Aplicaciones móviles (iOS / Android)",
        description:
          "Apps nativas o multiplataforma para que tu negocio viva en el bolsillo de tus clientes o equipo. Construidas para rendir, no para parecer una web envuelta.",
        deliverables: [
          "Diseño UX/UI móvil",
          "App multiplataforma iOS + Android",
          "Backend conectado",
          "Publicación en App Store y Google Play",
          "Notificaciones push",
          "Analítica de uso",
        ],
      },
      {
        title: "Aplicaciones internas para equipos",
        description:
          "Software hecho a la medida de cómo opera tu equipo. Reemplaza Excel, automatiza pasos repetitivos, conecta áreas. Hace que la gente haga menos clic y más trabajo real.",
        deliverables: [
          "Mapeo del proceso actual",
          "Diseño funcional",
          "App web con permisos por rol",
          "Integración con sistemas existentes",
          "Capacitación al equipo",
          "Soporte inicial",
        ],
      },
    ],
  },
  {
    slug: "sistemas-empresariales",
    number: "03",
    title: "Sistemas Empresariales",
    tagline: "Software operacional que sostiene tu negocio.",
    description:
      "CRMs, sistemas administrativos, facturación electrónica e integraciones. Lo que centraliza lo que hoy vive en 8 hojas de cálculo.",
    highlights: [
      "CRMs personalizados",
      "Sistemas administrativos",
      "Facturación electrónica",
      "Integraciones a medida",
    ],
    items: [
      {
        title: "CRMs personalizados",
        description:
          "Tu CRM no debería ajustarse a tu negocio — tu negocio merece un CRM hecho para él. Gestión de clientes, oportunidades y pipeline como tú lo trabajas.",
        deliverables: [
          "Módulos a medida (contactos, oportunidades, actividades, reportes)",
          "Integración con email y WhatsApp",
          "Automatizaciones de seguimiento",
          "Dashboards de gestión",
        ],
      },
      {
        title: "Sistemas administrativos",
        description:
          "Inventarios, operaciones internas, control de procesos. Software que centraliza lo que hoy vive en hojas de cálculo y depende de que alguien las actualice.",
        deliverables: [
          "Módulos según operación (inventario, compras, ventas, RH)",
          "Permisos por rol",
          "Reportes operativos",
          "Integración con contabilidad o facturación",
        ],
      },
      {
        title: "Sistemas de facturación",
        description:
          "Facturación electrónica adaptada a tu país, giro y volumen. Conectada al resto de tu operación para que no haya doble captura.",
        deliverables: [
          "Emisión de comprobantes según normativa local",
          "Gestión de clientes y catálogos",
          "Reportes fiscales",
          "Integración con CRM o sistema administrativo",
        ],
      },
      {
        title: "Bases de datos y backend",
        description:
          "La fundación invisible que sostiene todo lo demás. Modelado de datos, APIs, lógica de negocio. Cuando un proyecto necesita pensarse desde abajo bien hecho.",
        deliverables: [
          "Diseño de base de datos",
          "APIs documentadas",
          "Lógica de negocio",
          "Escalabilidad desde el día uno",
          "Despliegue en infraestructura cloud",
        ],
      },
      {
        title: "Integraciones entre sistemas",
        description:
          "Conectar lo que ya tienes para que hablen entre ellos. ERP con CRM, pasarela de pago con facturación, WhatsApp con tu sistema. Que los datos fluyan sin trabajo manual.",
        deliverables: [
          "Análisis de sistemas a integrar",
          "Conectores a medida",
          "Sincronización en tiempo real o por lotes",
          "Manejo de errores",
          "Monitoreo",
        ],
      },
    ],
  },
  {
    slug: "soluciones-de-ia",
    number: "04",
    title: "Soluciones de IA",
    tagline: "La capa que vuelve a tu negocio inteligente.",
    description:
      "La capa que materializa el tagline: integrar IA dentro del negocio. Automatizaciones, análisis y agentes que sí entienden tu operación.",
    highlights: [
      "Automatizaciones inteligentes",
      "Análisis y datos con IA",
      "Agentes personalizados",
      "Integración en tus canales",
    ],
    isDifferentiator: true,
    items: [
      {
        title: "Automatizaciones inteligentes",
        description:
          "Workflows con IA que hacen el trabajo repetitivo por ti. Procesar facturas, generar reportes, responder consultas frecuentes, mover datos entre sistemas.",
        deliverables: [
          "Mapeo de procesos automatizables",
          "Workflow con IA (lectura de documentos, generación, decisiones)",
          "Integración con sistemas actuales",
          "Métricas de tiempo ahorrado",
        ],
      },
      {
        title: "Análisis y datos con IA",
        description:
          "Convertimos tus datos en decisiones. Predicción de ventas, segmentación automática, detección de patrones, dashboards que muestran lo que va a pasar.",
        deliverables: [
          "Auditoría de datos existentes",
          "Modelos predictivos según necesidad",
          "Dashboards interactivos",
          "Alertas automáticas",
          "Capacitación para interpretar resultados",
        ],
      },
      {
        title: "Agentes personalizados",
        description:
          "Agentes de IA entrenados con la información de tu negocio. Atienden a tu cliente, califican leads, asisten a soporte o ventas, ejecutan tareas concretas.",
        deliverables: [
          "Definición de objetivos y alcance",
          "Base de conocimiento entrenada con tu información",
          "Integración en canales (web, WhatsApp, sistema interno)",
          "Revisión continua de calidad",
        ],
      },
    ],
  },
];
