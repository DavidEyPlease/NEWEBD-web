"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api, UNAUTHORIZED_EVENT } from "@/lib/api";
import { Nav, MobileNav } from "./nav";
import { DemoModal, DemoInfoButton } from "./demo-modal";

export type SessionUser = { username: string; displayName: string };
type Status = "loading" | "in" | "out";

const SessionContext = createContext<{
  user: SessionUser | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}>({ user: null, refresh: async () => {}, signOut: async () => {} });

export const useSession = () => useContext(SessionContext);

/**
 * Puerta de entrada del portal. Sin sesión solo existe /login; con sesión,
 * el shell completo (menú, barra de demo y aviso de NEWEBD).
 *
 * El export es estático, así que la comprobación ocurre en el navegador: la
 * protección real está en la API, que no entrega nada editable sin cookie.
 */
export function SessionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const onLogin = pathname.startsWith("/login");
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<SessionUser | null>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await api<{ user: SessionUser }>("/auth/me");
      setUser(r.user);
      setStatus("in");
    } catch {
      setUser(null);
      setStatus("out");
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      /* si falla, la cookie caduca sola; salimos igualmente */
    }
    setUser(null);
    setStatus("out");
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onExpired = () => {
      setUser(null);
      setStatus("out");
    };
    window.addEventListener(UNAUTHORIZED_EVENT, onExpired);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onExpired);
  }, []);

  useEffect(() => {
    if (status === "out" && !onLogin) router.replace("/login/");
    if (status === "in" && onLogin) router.replace("/");
  }, [status, onLogin, router]);

  let body: ReactNode;
  if (onLogin) {
    body = status === "out" ? children : <Boot />;
  } else if (status !== "in") {
    body = <Boot />;
  } else {
    body = (
      <>
        <DemoModal />
        <div className="shell">
          <Nav />
          <div className="main">
            {/* Debe quedar claro en todo momento qué es real y qué es muestra. */}
            <div className="demobar">
              <span className="pulse" />
              <b>Demo by NEWEBD</b>
              <span>— sample data, except the Website section and Hosting &amp; Billing, which are real.</span>
              <DemoInfoButton />
            </div>
            <MobileNav />
            {children}
          </div>
        </div>
      </>
    );
  }

  return <SessionContext.Provider value={{ user, refresh, signOut }}>{body}</SessionContext.Provider>;
}

function Boot() {
  return (
    <div className="boot" aria-busy="true" aria-label="Loading">
      <span className="boot-ring" />
    </div>
  );
}

/** Usuario conectado y salida, en la cabecera de cada pantalla. */
export function WhoAmI() {
  const { user, signOut } = useSession();
  if (!user) return null;
  const initials = user.displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <div className="who">
      <span className="who-n">{user.displayName}</span>
      <span className="av">{initials}</span>
      <button className="signout" onClick={() => void signOut()}>
        Sign out
      </button>
    </div>
  );
}
