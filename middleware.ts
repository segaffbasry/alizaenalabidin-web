import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookieOptions } from "@/lib/supabase/cookie-options";

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const pathname = req.nextUrl.pathname;

  let response = NextResponse.next({ request: req });

  // Refresh Supabase session on every request (skip if env vars missing)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookieOptions,
        cookies: {
          getAll() { return req.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
            response = NextResponse.next({ request: req });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });
      await supabase.auth.getUser();
    } catch {
      // silently continue if Supabase fails
    }
  }

  // Rewrite tanya.alizaenalabidin.com/* → /tanya/*
  const isTanyaSubdomain =
    hostname.startsWith("tanya.") ||
    hostname === "tanya.alizaenalabidin.com" ||
    hostname === "tanya.localhost";

  if (isTanyaSubdomain && !pathname.startsWith("/tanya")) {
    const targetPath = pathname === "/" ? "/tanya" : `/tanya${pathname}`;
    return NextResponse.rewrite(new URL(targetPath, req.url));
  }

  return response;
}

export const config = {
  // Run on all paths except static files and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
