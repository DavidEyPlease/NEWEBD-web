"use client";

import { useEffect, useRef, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { useSession } from "../session";

type Step = "user" | "password" | "setup";
const MIN = 10;

/**
 * Acceso en dos pasos: primero el usuario; después, o la contraseña, o, si es
 * la primera vez, el código de configuración y una contraseña nueva que solo
 * conoce esa persona.
 */
export default function LoginPage() {
  const { refresh } = useSession();
  const [step, setStep] = useState<Step>("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  // Enlace de invitación: /login/#u=jason&c=ABCD-EFGH. Va en el fragmento, que
  // el navegador nunca envía al servidor, y se borra de la barra al leerlo.
  useEffect(() => {
    const h = new URLSearchParams(window.location.hash.slice(1));
    const u = h.get("u");
    const c = h.get("c");
    if (u) {
      setUsername(u);
      setStep(c ? "setup" : "password");
    }
    if (c) setCode(c);
    if (u || c) history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    firstField.current?.focus();
  }, [step]);

  const u = username.trim().toLowerCase();

  const go = (next: Step) => {
    setError(null);
    setPassword("");
    setConfirm("");
    setShow(false);
    setStep(next);
  };

  const rules = [
    { ok: password.length >= MIN, text: `At least ${MIN} characters` },
    { ok: password.length > 0 && !password.toLowerCase().includes(u), text: "Doesn't contain your username" },
    { ok: password.length > 0 && password === confirm, text: "Both passwords match" },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (step === "setup" && !rules.every((r) => r.ok)) {
      setError("Please check the password requirements below.");
      return;
    }
    setBusy(true);
    try {
      if (step === "user") {
        const r = await api<{ next: "password" | "setup" }>("/auth/start", { method: "POST", body: { username: u } });
        go(r.next);
      } else if (step === "password") {
        await api("/auth/login", { method: "POST", body: { username: u, password } });
        await refresh();
      } else {
        await api("/auth/setup", { method: "POST", body: { username: u, code: code.trim(), password } });
        await refresh();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const eye = (
    <button type="button" className="lg-eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
      {show ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="lg">
      <aside className="lg-art">
        <img className="lg-logo" src="/brand/main-logo-white.svg" alt="CloverLeaf Animal Welfare Systems" />
        <div className="lg-copy">
          <h1>
            Your CloverLeaf <span className="lg-g">admin.</span>
          </h1>
          <p>
            Keep the team on your website up to date and tell us what to change on any page — straight from here.
          </p>
        </div>
        <div className="lg-by">
          <span>Built by</span>
          <img src="/brand/newebd-negativo.svg" alt="NEWEBD" />
        </div>
      </aside>

      <main className="lg-panel">
        <form className="lg-card" onSubmit={submit} noValidate>
          {step === "user" && (
            <>
              <h2>Sign in</h2>
              <p className="lg-sub">Enter your username to continue.</p>
              {error && <div className="lg-err" role="alert">{error}</div>}
              <label className="lg-field">
                <span>Username</span>
                <input
                  ref={firstField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="e.g. jason"
                />
              </label>
              <button className="lg-btn" disabled={u.length < 2 || busy}>
                {busy ? "Checking…" : "Continue →"}
              </button>
            </>
          )}

          {step !== "user" && (
            <div className="lg-who">
              <span>{u}</span>
              <button type="button" onClick={() => go("user")}>Change</button>
            </div>
          )}

          {step === "password" && (
            <>
              <h2>Welcome back</h2>
              <p className="lg-sub">Enter your password.</p>
              {error && <div className="lg-err" role="alert">{error}</div>}
              <input type="text" name="username" autoComplete="username" value={u} readOnly hidden />
              <label className="lg-field">
                <span>Password</span>
                <div className="lg-input">
                  <input
                    ref={firstField}
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  {eye}
                </div>
              </label>
              <button className="lg-btn" disabled={!password || busy}>
                {busy ? "Signing in…" : "Sign in"}
              </button>
              <div className="lg-links">
                <button type="button" onClick={() => go("setup")}>First time here? Use your setup code</button>
                <span>Forgot your password? Ask NEWEBD for a new setup code.</span>
              </div>
            </>
          )}

          {step === "setup" && (
            <>
              <h2>Create your password</h2>
              <p className="lg-sub">
                Enter the setup code NEWEBD sent you, then choose a password only you will know.
              </p>
              {error && <div className="lg-err" role="alert">{error}</div>}
              <input type="text" name="username" autoComplete="username" value={u} readOnly hidden />
              <label className="lg-field">
                <span>Setup code</span>
                <input
                  ref={code ? undefined : firstField}
                  className="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  autoComplete="one-time-code"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="XXXX-XXXX"
                  maxLength={12}
                />
              </label>
              <label className="lg-field">
                <span>New password</span>
                <div className="lg-input">
                  <input
                    ref={code ? firstField : undefined}
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  {eye}
                </div>
              </label>
              <label className="lg-field">
                <span>Confirm password</span>
                <input
                  type={show ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
              <ul className="lg-rules">
                {rules.map((r) => (
                  <li key={r.text} className={r.ok ? "ok" : undefined}>{r.text}</li>
                ))}
              </ul>
              <button className="lg-btn" disabled={busy || code.replace(/[^A-Za-z0-9]/g, "").length < 8}>
                {busy ? "Setting up…" : "Create password & sign in"}
              </button>
              <div className="lg-links">
                <button type="button" onClick={() => go("password")}>I already have a password</button>
              </div>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
