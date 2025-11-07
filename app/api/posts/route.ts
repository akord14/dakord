// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin"; // relative import

export async function POST(req: Request) {
  try {
    const { type, title, description, contact } = await req.json();

    if (!type || !title || !description || !contact) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!["seeking", "offering"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("posts")
      .insert([
        {
          type,
          title,
          description,
          contact,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, post: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
