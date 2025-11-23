import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // ADMIN KEY

  if (!url || !key) {
    throw new Error("Supabase URL ose ADMIN KEY mungon.");
  }

  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("posts").insert([
      {
        type: body.type,
        title: body.title,
        description: body.description,
        contact: body.contact,
        status: "pending",
        age: body.age || null,
        work_time: body.work_time || null,
        city: body.city || null,
        image: body.image || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "DB_INSERT_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}