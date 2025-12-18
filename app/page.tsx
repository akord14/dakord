import ServicesStories from "@/components/ServicesStories";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import ProfessionIcon from "../components/ProfessionIcon";
import PostListClient from "../components/PostListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akord.al – Punë & Punëtorë në Shqipëri | Kërkoj & Ofroj Punë",
  description:
    "Akord.al është platformë shqiptare për lidhjen e punëkërkuesve me punëdhënës. Posto falas: Kërkoj Punë ose Ofroj Punë.",
  keywords: [
    "punë",
    "kërkoj punë",
    "ofroj punë",
    "punëtorë",
    "vende pune",
    "shqipëri",
    "akord.al",
  ],
  openGraph: {
    title: "Akord.al – Punë & Punëtorë në Shqipëri",
    description:
      "Platformë moderne për punëkërkues dhe punëdhënës në Shqipëri. Postime të verifikuara.",
    url: "https://akord.al",
    siteName: "Akord.al",
    locale: "sq_AL",
    type: "website",
  },
};

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
  image?: string | null;   // ➜ SHTUAM KËTË
  slug: string | null;
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
  .select(
  "id, title, slug, image, type, city, age, work_time, created_at, contact, description, status, profession"
)
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
            <Image src="/logo.png" width={40} height={40} alt="" />

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
        {/* SHËRBIMET TONA (Stories) */}
<ServicesStories whatsappNumber="355695111179" />

{/* LISTA E POSTIMEVE */}
<PostListClient initialPosts={latestPosts} />
        

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
