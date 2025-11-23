// app/api/posts/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key);
}

// ===========================
//      POST  (krijo post)
// ===========================
export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase config error" },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const contact = formData.get("contact") as string;
    const payment = formData.get("payment") as string;
    const payment_currency = formData.get("payment_currency") as string;
    const profession = formData.get("profession") as string;
    const age = formData.get("age") as string;
    const work_time = formData.get("work_time") as string;

    // default status
    const status = "pending";

    const { error } = await supabase.from("posts").insert({
      type,
      title,
      description,
      contact,
      payment,
      payment_currency,
      profession,
      age,
      work_time,
      status,
      image: null, // për momentin pa foto
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Gabim gjatë ruajtjes." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gabim i paparitur në server." },
      { status: 500 }
    );
  }
}

// ===========================
//          GET
// ===========================
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase config error" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data }, { status: 200 });
}
