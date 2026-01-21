import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body.password ?? "");

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD mungon në env" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Password gabim" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // Cookie admin (7 ditë)
  res.cookies.set("akord_admin", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
