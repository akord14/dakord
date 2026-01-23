import Link from "next/link";
import { supabaseServer } from "../../lib/supabaseServer";


import PostListClient from "../../components/PostListClient";


export const dynamic = "force-dynamic";

export default async function SeekingPage() {
 const supabase = supabaseServer();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .eq("visibility", "public")
    .eq("type", "seeking")
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold">Kërkoj Punë</h1>
        <p className="mt-3 text-sm text-red-600">Gabim gjatë ngarkimit të postimeve.</p>
        <Link className="mt-6 inline-block text-blue-700 underline" href="/">
          ← Kthehu në Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Kërkoj Punë</h1>
          <p className="mt-1 text-sm text-slate-600">
            Postime të aprovuara nga admini.
          </p>
        </div>

        <Link
          href="/post/new"
          className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:opacity-95"
        >
          Krijo postim
        </Link>
      </div>

      <div className="mt-6">
        <PostListClient initialPosts={posts ?? []} />
      </div>
    </main>
  );
}
