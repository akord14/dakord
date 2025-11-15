"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function updatePostStatus(formData: FormData) {
  const id = formData.get("id") as string | null;
  const status = formData.get("status") as "approved" | "refused" | null;

  if (!id || !status) {
    throw new Error("Mungon id ose status");
  }

  const { error } = await supabaseAdmin
    .from("posts")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Gabim gjatë update:", error);
    throw new Error("S'munda të përditësoj statusin e postimit");
  }

  // Rifresko listën e moderimit dhe faqen e postimit
  revalidatePath("/admin/moderation");
  revalidatePath(`/post/${id}`);

  // Kthehu prapë te lista e posteve në moderim
  redirect("/admin/moderation");
}
