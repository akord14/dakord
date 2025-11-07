// app/post/[id]/page.tsx
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function PostDetailsPage(props: any) {
  const id =
    typeof props?.params?.id === "string"
      ? props.params.id
      : String(props?.params?.id ?? "");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return notFound();

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        {post.type === "seeking" ? "Kërkoj punë" : "Ofroj punë"} —{" "}
        {post.status === "approved" ? "✅ Miratuar" : "⏳ Në pritje"}
      </p>
    </main>
  );
}
