// app/post/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import ContactActions from "./ContactActions";

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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage(props: PageProps) {
  // Next 15: params është Promise → e presim
  const { id } = await props.params;

  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error) {
    console.error("Supabase error në /post/[id]:", error.message);
  }

  if (!data) {
    notFound();
  }

  const post = data as Post;

  const createdAt =
    post.created_at &&
    new Date(post.created_at).toLocaleString("sq-AL", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const typeLabel = post.type === "offering" ? "Ofroj punë" : "Kërkoj punë";

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-10">
      
      {/* LINKU I KTHIMIT */}
      <div className="mb-6">
        <a href="/" className="text-sm text-blue-600 hover:underline">
          ← Kthehu mbrapa
        </a>
      </div>

      {/* BOXI I POSTIMIT */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide">
            {typeLabel}
          </span>

          {createdAt && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {createdAt}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          {post.title}
        </h1>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
          {post.description}
        </p>

        <div className="border-t pt-4 mt-4 flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-800">Kontakti</h2>
          <p className="text-base font-medium break-all">{post.contact}</p>

          <ContactActions contact={post.contact} />
        </div>

      </section>
    </main>
  );
}
