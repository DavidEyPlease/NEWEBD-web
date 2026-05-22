"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ChatMessage, ChatStreamEvent } from "@/lib/agent/types";

const SESSION_STORAGE_KEY = "newebd-chat-session";
const HISTORY_STORAGE_KEY = "newebd-chat-history";

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage lleno o deshabilitado */
  }
}

export type ChatStatus = "idle" | "streaming" | "error";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hola, soy el agente IA de NEWEBD. Cuéntame del proyecto que tienes en mente — qué negocio, qué necesitas y dónde te gustaría aprovechar IA. Te ayudo a aterrizar la idea.",
  createdAt: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);

  // Inicializar sessionId + restaurar historial al montar
  useEffect(() => {
    let session = loadFromStorage<string>(SESSION_STORAGE_KEY, "");
    if (!session) {
      session = makeId("sess");
      saveToStorage(SESSION_STORAGE_KEY, session);
    }
    sessionIdRef.current = session;

    const saved = loadFromStorage<ChatMessage[]>(HISTORY_STORAGE_KEY, []);
    if (saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  // Persistir historial cuando cambie
  useEffect(() => {
    if (messages.length > 1) {
      saveToStorage(HISTORY_STORAGE_KEY, messages);
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming") return;

      const userMsg: ChatMessage = {
        id: makeId("u"),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      const assistantMsg: ChatMessage = {
        id: makeId("a"),
        role: "assistant",
        content: "",
        createdAt: Date.now(),
      };

      // Conversación que enviamos al servidor (sin el assistant vacío)
      const conversationForServer = [...messages, userMsg];

      setMessages([...conversationForServer, assistantMsg]);
      setStatus("streaming");
      setError(null);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: conversationForServer.filter(
              (m) => m.id !== "welcome",
            ),
            sessionId: sessionIdRef.current,
          }),
          signal: ctrl.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload) continue;

            try {
              const event = JSON.parse(payload) as ChatStreamEvent;
              handleEvent(event, assistantMsg.id);
            } catch {
              /* línea SSE incompleta */
            }
          }
        }

        setStatus("idle");
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setStatus("idle");
          return;
        }
        const msg = err instanceof Error ? err.message : "Error desconocido";
        setError(msg);
        setStatus("error");
        // Quitar el mensaje vacío del assistant si quedó sin texto
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && last.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        abortRef.current = null;
      }
    },
    [messages, status],
  );

  function handleEvent(event: ChatStreamEvent, assistantId: string) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== assistantId) return m;
        switch (event.type) {
          case "text_delta":
            return { ...m, content: m.content + event.text };
          case "tool_use":
            return { ...m, toolUsed: event.name };
          case "lead_saved":
            return {
              ...m,
              content:
                m.content +
                (m.content ? "\n\n" : "") +
                (event.success
                  ? `✓ ${event.message}`
                  : `✗ Hubo un problema guardando los datos: ${event.message}`),
            };
          case "handoff_requested":
            return {
              ...m,
              content:
                m.content +
                (m.content ? "\n\n" : "") +
                (event.success ? `→ ${event.message}` : event.message),
            };
          default:
            return m;
        }
      }),
    );
  }

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setStatus("idle");
    setError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  return { messages, status, error, sendMessage, cancel, reset };
}
