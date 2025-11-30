// app/api/posts/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  if (!url || !key) return null;

  return createClient(url, key, { auth: { persistSession: false } });
}

// =============================
// GET – posts approved
// =============================
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase config missing" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data ?? [] }, { status: 200 });
}

// =============================
// POST – create new post
// =============================
export async function POST(req: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase config missing" }, { status: 500 });
  }

  const body = await req.json();

  const {
    type,
    visibility,
    title,
    description,
    contact,
    age,
    work_time,
    city,
    image,
    payment_amount,
    payment_currency,
    profession,
  } = body ?? {};

  if (!title || !description || !contact) {
    return NextResponse.json({ error: "Mungojnë të dhëna" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      type,
      visibility,
      title,
      description,
      contact,
      age,
      work_time,
      city,
      image,
      payment_amount,
      payment_currency,
      profession,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
