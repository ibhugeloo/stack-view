import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const locales = ["fr", "en"];
const defaultLocale = "fr";
const publicRoutes = ["/login", "/signup"];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
  if (preferred && locales.includes(preferred)) return preferred;
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Step 1 — Locale redirect
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Step 2 — Refresh Supabase session
  const { supabaseResponse, user } = await updateSession(request);

  // Step 3 — Derive locale and path without locale prefix
  const locale =
    locales.find((l) => pathname.startsWith(`/${l}`)) ?? defaultLocale;
  const pathWithoutLocale = pathname.slice(`/${locale}`.length) || "/";

  // Step 4 — Determine if public route
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );

  // Step 5 — Redirect unauthenticated users to login
  if (!user && !isPublicRoute) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Step 6 — Redirect authenticated users away from auth pages
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
