"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, RotateCcw, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Isotipo } from "@/components/brand/isotipo";
import { useChat } from "@/components/chat/use-chat";
import { ChatMessageBubble } from "@/components/chat/chat-message";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Widget de chat flotante. Burbuja derecha-abajo en todas las páginas excepto
 * /contacto (donde el formulario completo es la vía principal de captura).
 */
export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { messages, status, error, sendMessage, reset } = useChat({
    welcomeText: t("welcome"),
    locale,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al final cuando llegan mensajes nuevos
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Auto-focus input cuando abre
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // No mostrar en /contacto (ya tienen el formulario completo ahí)
  if (pathname === "/contacto") return null;

  const handleSend = () => {
    if (!draft.trim() || status === "streaming") return;
    sendMessage(draft);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Burbuja flotante */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label={t("openLabel")}
            className="group fixed bottom-6 right-6 z-40 inline-flex h-14 items-center gap-2 rounded-full p-[1px] gradient-brand shadow-[0_20px_60px_-15px_rgba(189,65,224,0.7)] transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
          >
            <div className="flex h-full items-center gap-2.5 rounded-full bg-ink-900 pl-3 pr-5">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full gradient-brand">
                <Isotipo size={22} />
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-brand-cyan ring-2 ring-ink-900 animate-pulse" />
              </span>
              <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:inline">
                {t("openText")}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-allow-native-scroll
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-50 flex max-h-[88vh] flex-col overflow-hidden rounded-3xl border border-border-strong bg-ink-900/95 shadow-[0_30px_80px_-20px_rgba(13,4,32,0.8)] backdrop-blur-xl sm:bottom-8 sm:right-8 sm:left-auto sm:h-[640px] sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-foreground/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full gradient-brand">
                  <Isotipo size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-none">
                    {t("agentName")}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
                    {t("online")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  title={t("reset")}
                  aria-label={t("reset")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("close")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m) => (
                <ChatMessageBubble key={m.id} message={m} />
              ))}
              {status === "streaming" && (
                <p className="ml-9 text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  {t("writing")}
                </p>
              )}
              {status === "error" && error && (
                <div className="rounded-xl border border-brand-magenta/40 bg-brand-magenta/10 px-3 py-2 text-xs text-foreground-muted">
                  {t("errorPrefix")} {error}. {t("errorRetry")}
                </div>
              )}
            </div>

            {/* Hint sutil */}
            <div className="border-t border-border bg-foreground/[0.02] px-4 py-2">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground-subtle">
                <Sparkles size={10} className="text-brand-cyan" />
                {t("hint")}
              </p>
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background/60 p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-border-strong bg-foreground/[0.02] p-2">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none"
                  style={{ maxHeight: "120px" }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!draft.trim() || status === "streaming"}
                  aria-label={t("send")}
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                    draft.trim() && status !== "streaming"
                      ? "gradient-brand text-white hover:scale-105"
                      : "bg-foreground/[0.04] text-foreground-subtle cursor-not-allowed",
                  )}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
