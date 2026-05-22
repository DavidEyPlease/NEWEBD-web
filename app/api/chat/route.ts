import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";

import { SYSTEM_PROMPT } from "@/lib/agent/system-prompt";
import { TOOLS } from "@/lib/agent/tools";
import type {
  ChatMessage,
  ChatStreamEvent,
  HandoffInput,
  SaveLeadInput,
} from "@/lib/agent/types";
import { getSupabaseAdmin, type LeadRow } from "@/lib/supabase/client";

export const runtime = "nodejs"; // Anthropic SDK necesita Node runtime
export const dynamic = "force-dynamic";
export const maxDuration = 60; // streaming puede tardar

const MODEL =
  process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";
const MAX_TOKENS = 1500;

/**
 * POST /api/chat
 *
 * Body: { messages: ChatMessage[], sessionId: string }
 * Response: SSE stream con eventos ChatStreamEvent
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { messages: ChatMessage[]; sessionId: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages: clientMessages, sessionId } = body;

  if (!Array.isArray(clientMessages) || clientMessages.length === 0) {
    return new Response("Missing messages", { status: 400 });
  }

  // Modo demo si no hay API key — útil para desarrollar la UI sin gastar tokens
  if (!apiKey) {
    return streamDemoResponse();
  }

  const client = new Anthropic({ apiKey });

  // Convertir mensajes del cliente al formato de la API
  const anthMessages: Anthropic.MessageParam[] = clientMessages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: ChatStreamEvent) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      try {
        const response = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: TOOLS,
          messages: anthMessages,
        });

        // Stream deltas de texto
        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            send({ type: "text_delta", text: event.delta.text });
          }
        }

        // Mensaje final con toda la información (incluyendo tool_use)
        const finalMessage = await response.finalMessage();

        // Procesar tool calls si los hay
        for (const block of finalMessage.content) {
          if (block.type === "tool_use") {
            send({
              type: "tool_use",
              name: block.name as "save_lead" | "request_human_handoff",
            });

            if (block.name === "save_lead") {
              const input = block.input as SaveLeadInput;
              const result = await persistLead(
                input,
                sessionId,
                clientMessages,
                req,
              );
              send({
                type: "lead_saved",
                success: result.ok,
                message: result.message,
              });
            } else if (block.name === "request_human_handoff") {
              const input = block.input as HandoffInput;
              const result = await persistHandoff(
                input,
                sessionId,
                clientMessages,
              );
              send({
                type: "handoff_requested",
                success: result.ok,
                message: result.message,
              });
            }
          }
        }

        send({ type: "done" });
      } catch (err) {
        const message =
          err instanceof Anthropic.APIError
            ? `${err.status} ${err.message}`
            : err instanceof Error
              ? err.message
              : "Error desconocido";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

/**
 * Modo demo: simula respuestas mientras no haya API key configurada.
 */
function streamDemoResponse(): Response {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: ChatStreamEvent) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      const demoText =
        "Hola, soy NEWEBD AI (modo demo — sin API key conectada todavía). Cuando me conectes a Claude API, voy a poder conversar de verdad, calificar leads y guardar contactos. Por mientras, esto es solo un placeholder visual para que veas cómo se siente el chat.";

      // Simular streaming carácter por carácter
      for (const char of demoText) {
        send({ type: "text_delta", text: char });
        await new Promise((r) => setTimeout(r, 18));
      }
      send({ type: "done" });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

async function persistLead(
  input: SaveLeadInput,
  sessionId: string,
  conversation: ChatMessage[],
  req: NextRequest,
): Promise<{ ok: boolean; message: string }> {
  const supa = getSupabaseAdmin();
  if (!supa) {
    // Sin Supabase configurado — al menos guardamos en consola del server
    console.warn("[lead recibido — Supabase no configurado]", input);
    return {
      ok: true,
      message:
        "Lead capturado (modo dev). Cuando conectes Supabase, se guardará en la DB.",
    };
  }

  const row: LeadRow = {
    nombre: input.nombre,
    email: input.email,
    telefono: input.telefono ?? null,
    empresa: input.empresa,
    servicio_interes: input.servicio_interes,
    aplicacion_ia: input.aplicacion_ia,
    resumen_proyecto: input.resumen_proyecto,
    calificacion: input.calificacion,
    canal: "chat_web",
    conversacion: conversation,
    user_agent: req.headers.get("user-agent") ?? null,
  };

  const { error } = await supa.from("leads").insert(row);
  if (error) {
    console.error("[supabase insert error]", error);
    return { ok: false, message: error.message };
  }

  // Bind a la conversación si existía
  await supa
    .from("conversations")
    .update({
      estado: "finalizada_lead",
      mensajes: conversation,
      total_mensajes: conversation.length,
    })
    .eq("session_id", sessionId);

  return {
    ok: true,
    message:
      "¡Listo! Guardé tu información. El equipo de NEWEBD te contacta directo en las próximas horas.",
  };
}

async function persistHandoff(
  input: HandoffInput,
  sessionId: string,
  conversation: ChatMessage[],
): Promise<{ ok: boolean; message: string }> {
  const supa = getSupabaseAdmin();
  if (!supa) {
    console.warn("[handoff solicitado — Supabase no configurado]", input);
    return {
      ok: true,
      message: "Listo, te paso con el equipo humano (modo dev).",
    };
  }

  await supa
    .from("conversations")
    .update({
      estado: "handoff_humano",
      razon_finalizacion: input.razon,
      mensajes: conversation,
      total_mensajes: conversation.length,
    })
    .eq("session_id", sessionId);

  return {
    ok: true,
    message:
      "Listo, te paso con un humano del equipo. Te van a contactar lo antes posible.",
  };
}
