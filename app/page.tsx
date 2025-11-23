import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import ProfessionIcon from "../components/ProfessionIcon";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string | null;
  contact: string;
  status: string;
  created_at: string;
  city?: string | null;
  profession?: string | null;
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

async function getLatestPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data) {
    console.error("Gabim duke lexuar postimet:", error);
    return [];
  }

  return data as Post[];
}

function formatType(type: Post["type"]) {
  if (type === "seeking") return "Kërkoj punë";
  if (type === "offering") return "Ofroj punë";
  return "";
}

export default async function HomePage() {
  const latestPosts = await getLatestPosts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">

        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/akord-icon.png" width={40} height={40} alt="Akord.al" />
            <span className="text-xl font-bold tracking-tight">Akord.al</span>
          </Link>

          <Link
            href="/post/new"
            className="inline-flex items-center rounded-full border border-sky-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-sky-50"
          >
            Krijo postim
          </Link>
        </header>

        {/* HERO */}
        <section className="mb-8 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
              Puna e duhur, në kohën e duhur
            </h1>

            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Akord.al lidh persona dhe biznese që kërkojnë ose ofrojnë punë, me
              fokus te thjeshtësia, qartësia dhe respekti për kohën tënde.
            </p>

            <div className="flex flex-col gap-3 mt-5">

              <Link
                href="/post/new"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90"
              >
                KRIJO POSTIMIN TËND
              </Link>

              {/* KATEGORITË */}
              <div className="flex flex-wrap gap-3">

                {/* BUTTON STYLE – SUPER I BUTË */}
                {[
                  { href: "/post?type=seeking", label: "KËRKOJ PUNË" },
                  { href: "/post?type=offering", label: "OFROJ PUNË" },
                  { href: "/post?work_time=full_time", label: "FULL TIME" },
                  { href: "/post?work_time=part_time", label: "PART TIME" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center rounded-full px-4 py-2 text-xs font-medium 
                    bg-gradient-to-b from-sky-50 to-white 
                    border border-sky-100 
                    text-slate-900 shadow-sm hover:shadow transition"
                  >
                    {item.label}
                  </Link>
                ))}

              </div>
            </div>
          </div>

          {/* BOX ANËSOR */}
          <div className="bg-[#0A1A2F] text-white p-5 rounded-2xl shadow-lg">
            <p className="mb-3 text-sm/5 opacity-90">Përdor Akord.al për:</p>
            <ul className="mb-3 grid list-none gap-2 text-sm">
              <li>• Punë të dyta dhe punë me kohë të pjesshme</li>
              <li>• Punë të shpejta në lagjen tënde</li>
              <li>• Punëtorë për biznesin tënd lokal</li>
            </ul>
            <div className="border-t border-slate-600/50 pt-3 text-xs text-slate-300">
              Çdo postim miratohet nga admini përpara se të shfaqet publikisht.
            </div>
          </div>
        </section>

        {/* POSTIMET E FUNDIT */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[17px] font-semibold text-slate-900">
            Postimet e fundit
          </h2>

          <Link
            href="/post"
            className="inline-flex items-center rounded-full border border-sky-500 bg-sky-100 px-4 py-1.5 text-xs font-medium text-slate-900 hover:bg-sky-200 sm:text-sm"
          >
            KËRKO
          </Link>
        </section>

        {/* LISTA */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.length === 0 && (
            <p className="text-sm text-slate-500">
              Nuk ka ende postime të aprovuara. Bëhu i pari që krijon një postim.
            </p>
          )}

          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group text-slate-900 no-underline"
            >
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <ProfessionIcon
                    text={`${post.title} ${post.description ?? ""} ${
                      post.profession ?? ""
                    }`}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                          post.type === "seeking"
                            ? "border border-cyan-200 bg-cyan-50 text-cyan-700"
                            : "border border-indigo-200 bg-indigo-50 text-indigo-700",
                        ].join(" ")}
                      >
                        {formatType(post.type)}
                      </span>

                      {post.city && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-0.5 text-[11px] text-slate-700">
                          {post.city}
                        </span>
                      )}
                    </div>

                    <h3 className="line-clamp-2 text-[15px] font-semibold text-slate-900">
                      {post.title}
                    </h3>

                    {post.profession && (
                      <div className="text-xs text-slate-500">
                        {post.profession}
                      </div>
                    )}

                    <p className="line-clamp-3 text-sm text-slate-600">
                      {post.description || "Nuk ka përshkrim të detajuar."}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("sq-AL")}
                      </span>
                      <span className="text-slate-500 group-hover:text-slate-700">
                        Shiko detajet →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/355695111179"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 text-2xl shadow-2xl shadow-emerald-500/60"
      >
        <span className="text-white">🟢</span>
      </a>
    </main>
  );
}
