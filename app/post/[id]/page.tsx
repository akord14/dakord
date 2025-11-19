// app/post/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  profession?: string | null;
  status: string;
  created_at: string;
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

async function getPost(id: string): Promise<Post | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, type, title, description, contact, profession, status, created_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gabim duke marrë postin:", error.message);
    return null;
  }

  return data as Post;
}

export default async function PostPage({ params }: any) {
  const post = await getPost(params.id);

  // Nëse s’ka post, ose s’është i aprovuar, kthe 404
  if (!post || post.status !== "approved") {
    notFound();
  }

  return (
    // pjesa tjetër e JSX-it SIÇ E KE TANI
  );
}

  // Nëse s’ka post, ose s’është i aprovuar, kthe 404
  if (!post || post.status !== "approved") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 border-slate-300 bg-white">
            {post.type === "seeking" ? "Kërkoj punë" : "Ofroj punë"}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
          {post.title}
        </h1>

        {post.profession && (
          <p className="text-sm text-slate-500 mb-2">
            Profesioni: <span className="font-medium">{post.profession}</span>
          </p>
        )}

        <p className="text-xs text-slate-400 mb-6">
          Krijuar më: {new Date(post.created_at).toLocaleString("sq-AL")}
        </p>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Përshkrimi
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {post.description}
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Kontakti
          </h2>
          <p className="text-sm text-slate-700 break-words">{post.contact}</p>
          {/* COPY CONTACT do ta shtojmë si hap tjetër, pasi ta kemi faqen në rregull */}
        </section>
      </main>
    </div>
  );
}
