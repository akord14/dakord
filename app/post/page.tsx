// app/post/page.tsx
import Link from "next/link";
import { supabaseServer } from "../../lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PostsPage() {
  const supabase = await supabaseServer();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id,title,description,contact,type,status,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <main className="mx-auto max-w-2xl p-6">Nuk u ngarkuan postet.</main>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      {(posts ?? []).map((post) => (
        <article key={post.id} className="border rounded-xl p-4 space-y-1">
          <h2 className="text-xl font-semibold">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="text-sm opacity-70">
            {post.type === "seeking" ? "Kërkoj punë" : "Ofroj punë"} ·{" "}
            {post.status === "approved" ? "✅ Miratuar" : "⏳ Në pritje"}
          </p>
        </article>
      ))}
    </main>
  );
}
