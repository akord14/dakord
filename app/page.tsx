import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ServicesStories from "@/components/ServicesStories";

type Post = {
  id: string;
  title: string;
  slug: string | null;
  city: string | null;
  type: "seeking" | "offering" | string | null;
  created_at: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) throw new Error("Missing Supabase env vars");

  return createClient(url, key);
}
function HeroCard() {
  return (
    <section className="w-full">
      <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/70 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="pointer-events-none absolute -top-24 right-[-60px] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-[-70px] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <div className="flex items-center justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-900/5 to-blue-600/10 ring-1 ring-slate-900/5 shadow-sm flex items-center justify-center">
                  <span className="text-slate-700 font-bold">A</span>
                </div>
              </div>

              <h1 className="mt-6 text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Ekspertë në Shërbime Profesionale dhe Punësim
              </h1>

              <p className="mt-4 text-center text-base sm:text-lg text-slate-600">
                Zgjidh shërbimet tona profesionale ose gjej ofertat më të mira të punës!
              </p>

              <div className="mt-8">
                <div className="mx-auto max-w-3xl rounded-[26px] border border-slate-200/70 bg-white/60 p-2 shadow-sm backdrop-blur">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Primary */}
                    <Link
                      href="#services"
                      className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 text-white shadow-md transition hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Arrow DOWN (siç kërkove) */}
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/15">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M6 10l6 6 6-6" />
                          </svg>
                        </span>

                        <span className="text-base sm:text-lg font-semibold">
                          Shërbimet tona
                        </span>
                      </div>

                      <svg
                        className="h-5 w-5 opacity-90 transition group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>

                    {/* Secondary (lighter) */}
                    <Link
                      href="/post"
                      className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 px-5 py-4 text-slate-900 ring-1 ring-slate-900/5 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        {/* Arrow DOWN edhe këtu */}
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-slate-900/5">
                          <svg
                            className="h-5 w-5 text-slate-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M6 10l6 6 6-6" />
                          </svg>
                        </span>

                        <span className="text-base sm:text-lg font-semibold">
                          Postime punësimi
                        </span>
                      </div>

                      <svg
                        className="h-5 w-5 text-slate-600 transition group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center text-xs sm:text-sm text-slate-500">
                Platformë e thjeshtë • Kontakt i shpejtë • Zgjidhje profesionale
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </div>
    </section>
  );
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

    posts = (data ?? []) as Post[];
  } catch {
    posts = [];
  }

  return (
    <main className="w-full">
      <HeroCard />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* premium gradient background (pa foto) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_30%,white,transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />

        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center text-white">
          {/* LOGO */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Akord.al"
              width={180}
              height={56}
              priority
              className="h-auto w-[160px] sm:w-[190px]"
            />
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Shërbime Profesionale dhe Punësim
          </h1>

          <p className="mt-4 mx-auto max-w-xl text-sm sm:text-base text-white/85 leading-relaxed">
            Zgjidh shërbimet tona profesionale ose gjej ofertat më të mira të punës!
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                         bg-white/15 border border-white/25 backdrop-blur
                         hover:bg-white/20 active:scale-[0.99] transition"
            >
              Shërbimet tona
            </a>

            <a
              href="#jobs"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                         bg-blue-500/80 border border-blue-200/20
                         hover:bg-blue-500 active:scale-[0.99] transition"
            >
              Postime pune
            </a>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
  <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_12px_34px_-22px_rgba(15,23,42,0.25)] overflow-hidden">
    <ServicesStories />
  </div>
</section>


      {/* ================= JOBS ================= */}
      <section id="jobs" className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
        {/* background band i lehtë (si mockup “section stripe”) */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-[1px] shadow-[0_18px_40px_-26px_rgba(2,6,23,0.65)]">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 px-5 py-7 sm:px-7 sm:py-9 text-white">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Postime Pune
              </h2>
              <p className="mt-2 text-sm text-white/75">
                Shiko ofertat më të fundit të punës
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {posts.length === 0 ? (
                <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/75">
                  Aktualisht nuk ka postime. Sapo të aprovohen, do shfaqen këtu.
                </div>
              ) : (
                posts.map((p) => (
                  <Link
                    key={p.id}
                    href={p.slug ? `/post/${p.slug}` : "/post"}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                  >
                    <div className="text-sm font-semibold text-white line-clamp-2">
                      {p.title}
                    </div>

                    <div className="mt-2 text-xs text-white/70">
                      <span>
                        {p.type === "seeking"
                          ? "Kërkoj punë"
                          : p.type === "offering"
                          ? "Ofroj punë"
                          : "Postim"}
                      </span>
                      {p.city ? <span> • {p.city}</span> : null}
                    </div>

                    <div className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold
                                    bg-white/10 border border-white/10
                                    group-hover:bg-white/15 transition">
                      Shiko detajet
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-7 flex justify-center">
              <Link
                href="/post"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold
                           bg-gradient-to-r from-blue-600 to-blue-700
                           shadow-[0_12px_26px_-18px_rgba(37,99,235,0.85)]
                           hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition"
              >
                Të gjitha postimet →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT + CONTACT ================= */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14 pb-10">
        <div className="grid gap-5 md:grid-cols-2">
          {/* About */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-semibold text-slate-900">Rreth Nesh</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Akord.al është një platformë që lidh njerëzit me shërbime profesionale dhe me mundësi punësimi.
              Shërbimet ofrohen nga Akord.al përmes teknikëve të kontraktuar, ndërsa postimet e punës moderohen
              për të ruajtur cilësinë dhe besueshmërinë.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-semibold text-slate-900">10+</div>
                <div className="text-[11px] text-slate-600">vite eksperiencë</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-semibold text-slate-900">100+</div>
                <div className="text-[11px] text-slate-600">projekte</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                <div className="text-lg font-semibold text-slate-900">1000+</div>
                <div className="text-[11px] text-slate-600">kontakte</div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-semibold text-slate-900">Na Kontakto</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Keni pyetje ose kërkoni një ofertë? Jemi këtu për t’ju ndihmuar!
            </p>

            {/* Ndrysho numrin këtu */}
            <a
              href="https://wa.me/355695111179"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white
                         bg-gradient-to-r from-green-600 to-emerald-600
                         shadow-[0_14px_30px_-22px_rgba(16,185,129,0.9)]
                         hover:from-green-700 hover:to-emerald-700 active:scale-[0.99] transition"
            >
              Na Kontakto në WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-500">© 2025 akord.al</p>
      </section>
    </main>
  );
}
