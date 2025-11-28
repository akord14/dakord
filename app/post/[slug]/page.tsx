// app/post/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import ContactActions from "./ContactActions";



export default async function PostPage(props: any) {
  const params = await props.params;
  const slug = params.slug;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );


  // 🔥 Marrim postimin sipas SLUG
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    return <div className="p-6">Postimi nuk u gjet.</div>;
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-10">
      {/* KTHEHU */}
      <div className="mb-6">
        <a href="/" className="text-sm text-blue-600 hover:underline">
          ← Kthehu mbrapa
        </a>
      </div>

      {/* KUTIA E POSTIMIT */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* FOTO */}
        {post.image && (
          <div className="relative w-full h-60 md:h-80">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Lloji & Data */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide">
              {post.type === "offering" ? "Ofroj punë" : "Kërkoj punë"}
            </span>

            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(post.created_at).toLocaleString("sq-AL", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {/* Titulli */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            {post.title}
          </h1>

          {/* Pershkrimi */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {post.description}
          </p>

          {/* Kontakti */}
          <div className="border-t pt-4 mt-4 flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-800">Kontakti</h2>
            <p className="text-base font-medium break-all">{post.contact}</p>

            <ContactActions contact={post.contact} />
          </div>
        </div>
      </section>
    </main>
  );
}
