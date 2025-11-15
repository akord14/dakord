"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function updatePostStatus(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  const status = formData.get("status")?.toString() || "";

  if (!id || !status) {
    console.error("updatePostStatus: Mungon id ose status", { id, status });
    // thjesht kthehu te lista, mos hidh error
    revalidatePath("/admin/moderation");
    redirect("/admin/moderation");
  }

  const { error } = await supabaseAdmin
    .from("posts")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("updatePostStatus: Gabim gjatë update:", error);
    // mos bjerë faqja – thjesht rifresko listën
    revalidatePath("/admin/moderation");
    redirect("/admin/moderation");
  }

  // rifresko faqet ku shfaqen postet
  revalidatePath("/admin/moderation");
  revalidatePath("/");

  redirect("/admin/moderation");
}
