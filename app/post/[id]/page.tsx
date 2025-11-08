// app/post/[id]/page.tsx
import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PostDetailsPage({ params }: any) {
  const id = params?.id ?? "";
  if (!id) return notFound();

  const supabase = await supabaseServer();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id,title,description,contact,type,status,created_at")
    .eq("id", id)
    .single();

  if (error || !post) return notFound();

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <p className="font-medium">Kontakt: {post.contact}</p>
      <p className="text-sm opacity-70">
        {post.type === "seeking" ? "Kërkoj punë" : "Ofroj punë"} ·{" "}
        {post.status === "approved" ? "✅ Miratuar" : "⏳ Në pritje"}
      </p>
    </main>
  );
}
