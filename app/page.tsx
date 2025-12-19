import ServicesStories from "@/components/ServicesStories";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
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
  image?: string | null;
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

export default async function HomePage() {
  const latestPosts = await getLatestPosts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        {/* HEADER */}
        <header className="mb-10 flex items-center justify-between">
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

        {/* HERO (premium, i thjeshtuar) */}
<section className="max-w-7xl mx-auto px-4 pt-10 pb-8">
  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 md:p-10">
    <div className="max-w-2xl">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
        Puna e duhur,
        <span className="block text-slate-900">në kohën e duhur</span>
      </h1>

      <p className="mt-4 text-slate-600 text-sm md:text-base">
        Krijo një postim ose shiko postimet ekzistuese — shpejt dhe thjeshtë.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/post/new"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Krijo postimin tënd
        </Link>

        <Link
          href="/post"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
        >
          Shiko postimet
        </Link>
      </div>

      {/* Filtra të vegjël (opsionale, premium) */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/post?type=seeking"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Kërkoj punë
        </Link>
        <Link
          href="/post?type=offering"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Ofroj punë
        </Link>
        <Link
          href="/post?work_time=full_time"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Full-time
        </Link>
        <Link
          href="/post?work_time=part_time"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Part-time
        </Link>
      </div>
    </div>
  </div>
</section>


        {/* DIVIDER PREMIUM */}
        <div className="my-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* DIVIDER PREMIUM */}
<div className="my-16">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
</div>

{/* SERVICES – PREMIUM */}
<ServicesStories whatsappNumber="355695111179" />
{/* SUPPORT (poshtë shërbimeve) */}
<section className="max-w-7xl mx-auto px-4 pb-10">
  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 text-white">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold">Support</h3>
        <p className="text-white/80 text-sm mt-1">Na shkruani në WhatsApp për çdo pyetje.</p>
      </div>

      <a
        href="https://wa.me/355695111179"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
      >
        Na shkruani në WhatsApp
      </a>
    </div>
  </div>
</section>

{/* RRETH NESH */}
<section className="max-w-7xl mx-auto px-4 pb-14">
  <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
    <h3 className="text-lg md:text-xl font-semibold text-slate-900">Rreth nesh</h3>

    <p className="text-slate-600 text-sm md:text-base mt-3 max-w-3xl">
      Akord.al lidh persona dhe biznese në Shqipëri për të gjetur punën ose kandidatin e duhur.
      Postimet kalojnë moderim për cilësi dhe siguri, ndërsa shërbimet tona ofrojnë zgjidhje profesionale
      për bizneset dhe individët.
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Moderim i postimeve</span>
      <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Shpejt & thjeshtë</span>
      <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Shërbime profesionale</span>
      <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700">Support në WhatsApp</span>
    </div>

    <div className="mt-6">
      <a
        href="https://wa.me/355695111179"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        Kontakto tani
      </a>
    </div>
  </div>
</section>

<div className="my-16">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
</div>


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

        <PostListClient initialPosts={latestPosts} />
      </div>
    </main>
  );
}
