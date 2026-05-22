import type Anthropic from "@anthropic-ai/sdk";

/**
 * Tools que el agente puede llamar durante la conversación.
 * El orden es estable para no invalidar el prompt cache.
 */
export const TOOLS: Anthropic.Tool[] = [
  {
    name: "save_lead",
    description:
      "Guarda un lead calificado en la base de datos y notifica al equipo NEWEBD. Llama esta función SOLO cuando tengas: nombre, email, descripción del proyecto y dónde aplicaría IA. El visitante debe mostrar intención clara de cotizar.",
    input_schema: {
      type: "object" as const,
      properties: {
        nombre: {
          type: "string",
          description: "Nombre completo del visitante",
        },
        email: {
          type: "string",
          description: "Email de contacto del visitante",
        },
        telefono: {
          type: "string",
          description:
            "Teléfono o WhatsApp (opcional, déjalo vacío si no lo dio)",
        },
        empresa: {
          type: "string",
          description: "Nombre de la empresa o negocio del visitante",
        },
        servicio_interes: {
          type: "string",
          enum: [
            "Desarrollo Web",
            "Aplicaciones a Medida",
            "Sistemas Empresariales",
            "Soluciones de IA",
            "Mixto",
            "Aún no estoy seguro",
          ],
          description:
            "Qué categoría de servicio le interesa más, según la conversación",
        },
        aplicacion_ia: {
          type: "string",
          description:
            "Dónde aplicaría IA en su negocio (atención a cliente, procesos repetitivos, análisis, generación de contenido, etc.)",
        },
        resumen_proyecto: {
          type: "string",
          description:
            "Resumen ejecutivo del proyecto en 2-3 frases: qué tiene hoy, qué necesita, urgencia si la mencionó",
        },
        calificacion: {
          type: "string",
          enum: ["caliente", "tibio", "frio"],
          description:
            "Tu evaluación del lead: 'caliente' (listo para cotizar pronto), 'tibio' (interesado pero en exploración), 'frio' (solo curiosidad o no encaja)",
        },
      },
      required: [
        "nombre",
        "email",
        "empresa",
        "servicio_interes",
        "aplicacion_ia",
        "resumen_proyecto",
        "calificacion",
      ],
    },
  },
  {
    name: "request_human_handoff",
    description:
      "Solicita que un humano del equipo NEWEBD tome el control de la conversación. Úsala cuando el visitante pida explícitamente hablar con un humano, la negociación se complique, o el chat no avance después de varios turnos.",
    input_schema: {
      type: "object" as const,
      properties: {
        razon: {
          type: "string",
          description:
            "Por qué necesitas handoff (visitante lo pidió, problema complejo, frustración, etc.)",
        },
        contexto: {
          type: "string",
          description:
            "Resumen breve de la conversación para que el humano se ponga al día rápido",
        },
        urgencia: {
          type: "string",
          enum: ["alta", "media", "baja"],
          description: "Qué tan urgente es el handoff",
        },
      },
      required: ["razon", "contexto", "urgencia"],
    },
  },
];
