// app/api/delete-post/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

export async function POST(req: Request) {
  const { id } = await req.json();
  const supabase = getSupabase();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Gabim gjatë fshirjes së postit:", error.message);
    return NextResponse.json({ success: false });
  }

  // Rifreskojmë faqet kryesore që përdorin listën e postimeve
  revalidatePath("/");               // faqja kryesore
  revalidatePath("/post");           // nëse ke listë tek /post
  revalidatePath("/post/seeking");   // nëse ke faqe të ndarë
  revalidatePath("/post/offering");  // nëse ke faqe të ndarë

  return NextResponse.json({ success: true });
}
