// app/admin/moderation/page.tsx
import { createClient } from "@supabase/supabase-js";
import ApproveButtons from "./approve-buttons";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

// e detyrojmë të jetë dynamic (mos u pre-rendero me static config)
export const dynamic = "force-dynamic";

export default async function AdminModerationPage() {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from<Post, Post>("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error në /admin/moderation:", error.message);
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Moderimi i postimeve</h1>
        <p className="text-red-600 text-sm">
          Nuk u arrit të lexohen postimet nga databaza.
        </p>
      </main>
    );
  }

  const posts = data ?? [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Moderimi i postimeve</h1>

      {posts.length === 0 ? (
        <p className="text-sm text-gray-500">
          Nuk ka postime në pritje për moderim.
        </p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-medium uppercase tracking-wide mb-1">
                    {post.type === "offering" ? "Ofroj punë" : "Kërkoj punë"}
                  </span>
                  <h2 className="font-semibold">{post.title}</h2>
                </div>
                <ApproveButtons postId={post.id} />
              </div>

              <p className="text-sm text-gray-700 mb-2">{post.description}</p>
              <p className="text-xs text-gray-500 break-all">
                Kontakt: {post.contact}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
