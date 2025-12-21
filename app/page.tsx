import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import ServicesStories from "@/components/ServicesStories";

type Post = {
  id: string;
  title: string;
  slug: string;
  city?: string | null;
  type?: string | null;
  created_at?: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("posts")
      .select("id,title,slug,city,type,created_at")
      .eq("status", "approved")
      .eq("visibility", "public")
      .not("slug", "is", null)
      .order("created_at", { ascending: false })
      .limit(3);

    posts = data ?? [];
  } catch {
    posts = [];
  }

  return (
    <main className="w-full">
      {/* ===== HERO / ABOVE THE FOLD ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* ===== KARTA 1 ===== */}
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-5 shadow-sm">
            {/* LOGO */}
            <div className="mb-3">
              <Link href="/">
                <Image
                  src="/logo.png"   // ⚠️ ndrysho emrin nëse logo quhet ndryshe
                  alt="Akord.al"
                  width={130}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* SLOGAN */}
            <p className="text-base md:text-lg font-semibold text-slate-900">
              Puna e duhur në kohën e duhur
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Posto kërkesën ose ofertën tënde dhe lidhu shpejt me njerëzit e duhur.
            </p>

            {/* BUTONAT */}
            <div className="mt-4 flex flex-wrap gap-3">
              {/* PRIMARY */}
              <Link
                href="/post/new"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-[0.99] transition"
              >
                Krijo postimin tënd
              </Link>

              {/* SECONDARY */}
              <Link
                href="/post/seeking"
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
              >
                Kërkoj punë
              </Link>

              <Link
                href="/post/offering"
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
              >
                Ofroj punë
              </Link>

              <Link
                href="/post"
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
              >
                Shiko të gjitha postimet
              </Link>
            </div>
          </div>

          {/* ===== KARTA 2 ===== */}
          <div className="rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
            <p className="text-sm font-semibold opacity-90">Postime të fundit</p>

            {posts.length === 0 ? (
              <p className="mt-4 text-sm opacity-80">
                Postimet e fundit do shfaqen këtu.
              </p>
            ) : (
              <div className="mt-4 space-y-2 max-h-40 overflow-auto pr-1">
                {posts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/post/${p.slug}`}
                    className="block rounded-xl bg-white/10 hover:bg-white/15 p-3"
                  >
                    <p className="text-sm font-semibold line-clamp-1">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs opacity-80">
                      {p.type === "seeking"
                        ? "Kërkoj punë"
                        : p.type === "offering"
                        ? "Ofroj punë"
                        : "Postim"}
                      {p.city ? ` • ${p.city}` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SHËRBIMET ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Shërbimet tona profesionale
          </h2>

          <div className="mt-4">
            <ServicesStories />
          </div>
        </div>
      </section>

      {/* ===== NA KONTAKTO ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Na kontakto</h2>
          <p className="mt-1 text-sm text-slate-600">
            Nëse dëshiron, ne mund ta postojmë për ty.
          </p>

          <a
            href="https://wa.me/355695111179" // ⚠️ numri yt
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Shkruaj në WhatsApp
          </a>
        </div>
      </section>

      {/* ===== RRETH NESH ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 pb-8">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <details className="group">
            <summary className="cursor-pointer flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 transition">
              <span className="text-sm font-semibold text-slate-900">
                Rreth nesh
              </span>
              <span className="text-slate-500 group-open:rotate-180 transition">
                ⌄
              </span>
            </summary>

            <div className="mt-3 text-sm text-slate-700 leading-relaxed">
              Akord.al është një platformë shqiptare për “Kërkoj punë” dhe
              “Ofroj punë”, ku çdo postim kalon moderim për cilësi dhe
              seriozitet. Synimi ynë është të lidhim njerëzit e duhur me
              mundësitë e duhura.
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
