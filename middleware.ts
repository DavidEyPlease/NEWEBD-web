import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except api, _next, _vercel, favicon, images, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
