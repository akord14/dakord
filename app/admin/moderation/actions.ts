"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(url, service);
}

export async function approvePost(id: string) {
  const supabase = supabaseAdmin();

  await supabase
    .from("posts")
    .update({ status: "approved" })
    .eq("id", id);

  revalidatePath("/admin/moderation");
}

export async function rejectPost(id: string) {
  const supabase = supabaseAdmin();

  await supabase
    .from("posts")
    .update({ status: "refused" })
    .eq("id", id);

  revalidatePath("/admin/moderation");
}
