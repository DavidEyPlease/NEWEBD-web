/**
 * Tipos compartidos entre el frontend del chat y el API route.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  /**
   * Si el mensaje del agente disparó save_lead/handoff, lo marcamos para que
   * el frontend pueda mostrar UI especial.
   */
  toolUsed?: "save_lead" | "request_human_handoff";
};

export type SaveLeadInput = {
  nombre: string;
  email: string;
  telefono?: string;
  empresa: string;
  servicio_interes: string;
  aplicacion_ia: string;
  resumen_proyecto: string;
  calificacion: "caliente" | "tibio" | "frio";
};

export type HandoffInput = {
  razon: string;
  contexto: string;
  urgencia: "alta" | "media" | "baja";
};

/**
 * Eventos que el server emite vía SSE al cliente.
 */
export type ChatStreamEvent =
  | { type: "text_delta"; text: string }
  | { type: "tool_use"; name: "save_lead" | "request_human_handoff" }
  | { type: "lead_saved"; success: boolean; message: string }
  | { type: "handoff_requested"; success: boolean; message: string }
  | { type: "done" }
  | { type: "error"; message: string };
