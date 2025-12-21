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
      .limit(2); // 2 postime të fundit (më kompakt)

    posts = data ?? [];
  } catch {
    posts = [];
  }

  const primaryBtn =
  "w-full inline-flex items-center justify-center text-center px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition leading-none";

const secondaryBtn =
  "w-full inline-flex items-center justify-center text-center px-4 py-3 rounded-2xl border border-blue-200 bg-white text-blue-700 text-sm font-semibold shadow-sm hover:bg-blue-50 hover:border-blue-300 active:scale-[0.99] transition leading-none";



  return (
    <main className="w-full">
      {/* ===== ABOVE THE FOLD ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* ===== KARTA 1 ===== */}
          <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
            {/* LOGO */}
            <div className="mb-3">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo.png" // ⚠️ ndrysho nëse logo ka emër tjetër te /public
                  alt="Akord.al"
                  width={130}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* SLOGAN (1 rresht) */}
            <p className="text-base md:text-lg font-semibold text-slate-900">
              Puna e duhur në kohën e duhur
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Posto kërkesën ose ofertën tënde dhe lidhu shpejt me njerëzit e duhur.
            </p>

            {/* BUTONAT (2 kolona = 2 rreshta, premium) */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/post/new" className={primaryBtn}>
                Krijo postimin tënd
              </Link>

              <Link href="/post/seeking" className={secondaryBtn}>
                Kërkoj punë
              </Link>

              <Link href="/post/offering" className={secondaryBtn}>
                Ofroj punë
              </Link>

              {/* Kjo e bën të mos të shkojë në rresht të tretë */}
              <Link
  href="/post"
  className={`${secondaryBtn} col-span-2`}
>
  Shiko të gjitha postimet
</Link>

            </div>
          </div>

          {/* ===== KARTA 2 (MË PROFESIONALE + PA BOSHE) ===== */}
          <div className="rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
            <p className="text-sm font-semibold opacity-90">Si funksionon</p>

            <div className="mt-3 space-y-2">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-sm font-semibold">1) Zgjidh tipin</p>
                <p className="text-xs opacity-80">
                  Kërkoj punë ose Ofroj punë.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-sm font-semibold">2) Posto në 1 minutë</p>
                <p className="text-xs opacity-80">
                  Plotëso detajet dhe kontaktin.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-sm font-semibold">3) Del live pas moderimit</p>
                <p className="text-xs opacity-80">
                  Postimet e aprovuara shfaqen publikisht.
                </p>
              </div>
            </div>

            {/* POSTIME TË FUNDIT (kompakt) */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold opacity-80">Postime të fundit</p>
                <Link href="/post" className="text-xs underline opacity-80 hover:opacity-100">
                  Shiko të gjitha
                </Link>
              </div>

              {posts.length === 0 ? (
                <p className="mt-2 text-xs opacity-70">
                  Sapo të aprovohen postimet e reja, do shfaqen këtu.
                </p>
              ) : (
                <div className="mt-2 space-y-2">
                  {posts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/post/${p.slug}`}
                      className="block rounded-xl bg-white/10 hover:bg-white/15 p-3 transition"
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
        </div>
      </section>

      {/* ===== SHËRBIMET ===== */}
      {/* Heqim titullin këtu sepse e ke brenda ServicesStories (që mos të dalë dy herë) */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6">
        <div className="rounded-2xl border bg-white p-0 shadow-sm overflow-hidden">
          <ServicesStories />
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
            className="mt-4 inline-flex w-full sm:w-auto justify-center px-5 py-3 rounded-2xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 active:scale-[0.99] transition"
          >
            Shkruaj në WhatsApp
          </a>
        </div>
      </section>

      {/* ===== RRETH NESH (PREMIUM) ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 pb-8">
        {/* Gradient border trick */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 p-[1px] shadow-sm">
          <div className="rounded-2xl bg-white p-5">
            <details className="group">
              <summary className="cursor-pointer list-none flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-slate-900 px-4 py-3 text-white shadow-md hover:opacity-95 transition">
  <div>
    <p className="text-sm font-semibold">Rreth nesh</p>
    <p className="text-xs opacity-90">Kliko për të lexuar përshkrimin</p>
  </div>
  <span className="opacity-90 group-open:rotate-180 transition">⌄</span>


                <div>
                  <p className="text-sm font-semibold text-slate-900">Rreth nesh</p>
                  <p className="text-xs text-slate-500">
                    Kliko për të lexuar përshkrimin
                  </p>
                </div>
                <span className="text-slate-500 group-open:rotate-180 transition">
                  ⌄
                </span>
              </summary>

              <div className="mt-4 text-sm text-slate-700 leading-relaxed">
                Akord.al është një platformë shqiptare për “Kërkoj punë” dhe “Ofroj punë”,
                ku çdo postim kalon moderim për cilësi dhe seriozitet. Synimi ynë është
                të lidhim njerëzit e duhur me mundësitë e duhura.
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
