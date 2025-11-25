import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import ContactActions from "../ContactActions";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
  image?: string | null;
  slug?: string | null;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Mungon URL ose KEY");
  return createClient(url, key);
}

export default async function PostPage({ params }: any) {
  const { id, slug } = params;

  const supabase = getSupabaseAnon();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  if (post.slug && post.slug !== slug) {
    return (
      <meta
        httpEquiv="refresh"
        content={`0; url=/post/${post.id}/${post.slug}`}
      />
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <a href="/" className="text-sm text-blue-600 hover:underline">
          ← Kthehu mbrapa
        </a>
      </div>

      <section className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {post.image && (
          <div className="relative w-full h-60 md:h-80">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">{post.title}</h1>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {post.description}
          </p>

          <h2 className="text-sm font-semibold mb-2">Kontakti</h2>
          <p className="font-medium">{post.contact}</p>
          <ContactActions contact={post.contact} />
        </div>
      </section>
    </main>
  );
}
