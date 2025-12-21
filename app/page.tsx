// app/page.tsx
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ServicesStories from "@/components/ServicesStories";

type Post = {
  id: string;
  title: string;
  slug: string;
  city?: string | null;
  type?: "seeking" | "offering" | string | null;
  created_at?: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export default async function HomePage() {
  // --- Optional: 3 postimet e fundit (approved + public) ---
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

    posts = (data ?? []) as Post[];
  } catch {
    // nëse mungojnë env ose ka problem, thjesht mos shfaq featured posts
    posts = [];
  }

  return (
    <main className="w-full">
      {/* ABOVE THE FOLD: 2 karta (mobile: 1 kolonë, desktop: 2 kolona) */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* KARTA 1: Slogan + CTA + Butona */}
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-5 shadow-sm">
            <p className="text-base md:text-lg font-semibold text-slate-900">
              Puna e duhur në kohën e duhur
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Posto kërkesën ose ofertën tënde dhe lidhu shpejt me njerëzit e duhur.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/post/new"
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Krijo postimin tënd
              </Link>

              <Link
                href="/post/seeking"
                className="px-5 py-2.5 rounded-full border text-sm font-medium hover:bg-slate-50"
              >
                Kërkoj punë
              </Link>

              <Link
                href="/post/offering"
                className="px-5 py-2.5 rounded-full border text-sm font-medium hover:bg-slate-50"
              >
                Ofroj punë
              </Link>

              <Link
                href="/post"
                className="px-5 py-2.5 rounded-full border text-sm font-medium hover:bg-slate-50"
              >
                Shiko të gjitha postimet
              </Link>
            </div>
          </div>

          {/* KARTA 2: Featured posts (opsionale) */}
          <div className="rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold opacity-90">Postime të fundit</p>
              <Link href="/post" className="text-xs underline opacity-90 hover:opacity-100">
                Shiko të gjitha
              </Link>
            </div>

            {posts.length === 0 ? (
              <p className="mt-4 text-sm opacity-80">
                Sapo të aprovohen postimet e para, do shfaqen këtu.
              </p>
            ) : (
              <div className="mt-4 space-y-2 max-h-40 overflow-auto pr-1">
                {posts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/post/${p.slug}`}
                    className="block rounded-xl bg-white/10 hover:bg-white/15 p-3"
                  >
                    <p className="text-sm font-semibold line-clamp-1">{p.title}</p>
                    <p className="mt-1 text-xs opacity-80">
                      {p.type === "seeking" ? "Kërkoj punë" : p.type === "offering" ? "Ofroj punë" : "Postim"}
                      {p.city ? ` • ${p.city}` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-4">
              <Link
                href="/post/new"
                className="inline-flex px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100"
              >
                Posto tani
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PJESA POSHTE: Shërbimet */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Shërbimet</h2>
          <p className="mt-1 text-sm text-slate-600">
            Zgjidh shërbimin që të duhet – me pamje premium dhe akses të shpejtë.
          </p>

          <div className="mt-4">
            <ServicesStories />
          </div>
        </div>
      </section>

      {/* Na kontakto */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Na kontakto</h2>
          <p className="mt-1 text-sm text-slate-600">
            Ke pyetje ose do ta postojmë ne për ty? Na shkruaj në WhatsApp.
          </p>

          <a
            href="https://wa.me/355695111179"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
          >
            Shkruaj në WhatsApp
          </a>

          <p className="mt-2 text-xs text-slate-500">
            (Ndrysho numrin e WhatsApp-it këtu te linku wa.me)
          </p>
        </div>
      </section>

      {/* Rreth nesh (buton që hap tekstin) */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 pb-8">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <details className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Rreth nesh</span>
              <span className="text-sm text-blue-600 group-open:rotate-180 transition">
                ⌄
              </span>
            </summary>

            <div className="mt-3 text-sm text-slate-700 leading-relaxed">
              Akord.al është një platformë shqiptare ku “Kërkoj punë” dhe “Ofroj punë”
              bashkohen në mënyrë të thjeshtë dhe të shpejtë. Çdo postim kalon moderim
              për të ruajtur cilësinë dhe seriozitetin. Qëllimi ynë është të lidhim njerëzit
              e duhur me mundësitë e duhura – në kohën e duhur.
            </div>
          </details>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-500">
          © 2025 akord.al
        </div>
      </footer>
    </main>
  );
}
