import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

export async function POST(req: Request) {
  const { id } = await req.json();
  const supabase = getSupabase();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
