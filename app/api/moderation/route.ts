// app/api/posts/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Krijo klientin brenda funksionit (jo në top-level)
function getSupabase() {
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  if (!url || !key) return null;

  // në API routes nuk na duhet persistimi i sesionit
  return createClient(url, key, { auth: { persistSession: false } });
}

// (shembull) GET: kthen postimet e miratuara
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase config missing" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data ?? [] }, { status: 200 });
}

// (opsionale) POST: krijon post të ri me anon key, nëse RLS e lejon
export async function POST(req: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase config missing" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { title, description, contact, type } = body ?? {};

  if (!title || !description || !contact || !["seeking", "offering"].includes(type)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      description,
      contact,
      type,
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ post: data }, { status: 201 });
}
