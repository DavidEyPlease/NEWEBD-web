"use client";

import { motion } from "framer-motion";

import { Isotipo } from "@/components/brand/isotipo";
import type { ChatMessage } from "@/lib/agent/types";
import { cn } from "@/lib/utils";

type Props = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex items-start gap-2.5", isUser && "flex-row-reverse")}
    >
      {!isUser && (
        <div className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.04] ring-1 ring-inset ring-border-strong">
          <Isotipo size={18} />
        </div>
      )}

      <div
        className={cn(
          "max-w-[78%] min-w-0 rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]",
          isUser
            ? "gradient-brand text-white"
            : "bg-foreground/[0.04] text-foreground ring-1 ring-inset ring-border",
        )}
      >
        {message.content || (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground-muted" />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground-muted"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground-muted"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        )}
      </div>
    </motion.div>
  );
}
