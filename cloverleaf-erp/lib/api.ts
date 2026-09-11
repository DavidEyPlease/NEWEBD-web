/**
 * Cliente de la API de la sección Website.
 *
 * Mismo origen: Apache pasa /api al servicio NestJS, así que la cookie de
 * sesión (httpOnly) viaja sola y no hace falta CORS. La cabecera x-clv es la
 * defensa contra CSRF que exige el servidor en toda petición que cambia algo.
 */
export const UNAUTHORIZED_EVENT = "clv:unauthorized";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type Options = { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: unknown };

export async function api<T = unknown>(path: string, { method = "GET", body }: Options = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: { "x-clv": "1", ...(body !== undefined ? { "content-type": "application/json" } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  // Sesión caducada a mitad de trabajo: el shell lo oye y vuelve al acceso.
  if (res.status === 401 && !path.startsWith("/auth/")) window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));

  if (!res.ok) {
    let message = `Something went wrong (${res.status}). Please try again.`;
    try {
      const j = await res.json();
      const m = Array.isArray(j?.message) ? j.message[0] : j?.message;
      if (typeof m === "string" && m) message = m;
    } catch {
      /* respuesta sin JSON */
    }
    if (res.status === 429) message = "Too many attempts. Please wait a minute and try again.";
    if (res.status === 413) message = "That file is too large.";
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
