// app/api/moderation/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || // prefero service_role
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!url || !key) return null;

  // persistSession off në route server-side
  return createClient(url, key, { auth: { persistSession: false } });
}

function isOk(req: Request) {
  const pass = req.headers.get("x-admin-pass");
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected && pass && pass === expected);
}

export async function GET(req: Request) {
  if (!isOk(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase config missing" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ items: data }, { status: 200 });
}

export async function PATCH(req: Request) {
  if (!isOk(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase config missing" }, { status: 500 });
  }

  try {
    const { id, action } = (await req.json()) as {
      id: string;
      action: "approve" | "reject";
    };

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    const { data, error } = await supabase
      .from("posts")
      .update({ status: newStatus, approved_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true, post: data }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
