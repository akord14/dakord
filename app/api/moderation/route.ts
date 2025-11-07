// app/api/moderation/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin"; // relative import

function isOk(req: Request) {
  const pass = req.headers.get("x-admin-pass");
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected && pass && pass === expected);
}

export async function GET(req: Request) {
  if (!isOk(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
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

  try {
    const { id, action } = (await req.json()) as {
      id: string;
      action: "approve" | "reject";
    };

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    const { data, error } = await supabaseAdmin
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
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
