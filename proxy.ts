import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect everything under /admin
  if (pathname.startsWith("/admin")) {
    const adminAuthed = req.cookies.get("akord_admin")?.value === "1";
    if (adminAuthed) return NextResponse.next();

    // Allow login page itself
    if (pathname === "/admin/login") return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
