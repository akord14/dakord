import Link from "next/link";
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
  age?: number | null;
  work_time?: "full_time" | "part_time" | null;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

function formatType(type: Post["type"]) {
  return type === "seeking" ? "Kërkoj punë" : "Ofroj punë";
}

function formatWorkTime(work?: Post["work_time"]) {
  if (work === "full_time") return "Full time";
  if (work === "part_time") return "Part time";
  return "";
}

// ---- SEARCH PARAMS (Next.js 15 OK) ----
type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

async function getPosts(filter: {
  type?: string;
  work_time?: string;
}): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (filter.type === "seeking" || filter.type === "offering") {
    query = query.eq("type", filter.type);
  }

  if (filter.work_time === "full_time" || filter.work_time === "part_time") {
    query = query.eq("work_time", filter.work_time);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data as Post[];
}

export default async function PostsPage({ searchParams }: PageProps) {
  const typeParam =
    typeof searchParams?.type === "string"
      ? searchParams.type
      : Array.isArray(searchParams?.type)
      ? searchParams?.type[0]
      : undefined;

  const workParam =
    typeof searchParams?.work_time === "string"
      ? searchParams.work_time
      : Array.isArray(searchParams?.work_time)
      ? searchParams?.work_time[0]
      : undefined;

  const posts = await getPosts({
    type: typeParam,
    work_time: workParam,
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Postime pune</h1>
            <p className="text-sm text-slate-600">
              Shfleto postimet e aprovuara — filtro sipas llojit dhe orarit.
            </p>
          </div>

          <Link
            href="/post/new"
            className="bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90"
          >
            + Krijo postim
          </Link>
        </header>

        {/* FILTER BUTTONS */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/post"
            className={`px-4 py-1.5 rounded-full text-xs border ${
              !typeParam && !workParam
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-slate-200"
            }`}
          >
            Të gjitha
          </Link>

          <Link
            href="/post?type=seeking"
            className={`px-4 py-1.5 rounded-full text-xs border ${
              typeParam === "seeking"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-slate-200"
            }`}
          >
            Kërkoj punë
          </Link>

          <Link
            href="/post?type=offering"
            className={`px-4 py-1.5 rounded-full text-xs border ${
              typeParam === "offering"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-slate-200"
            }`}
          >
            Ofroj punë
          </Link>

          <Link
            href="/post?work_time=full_time"
            className={`px-4 py-1.5 rounded-full text-xs border ${
              workParam === "full_time"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-slate-200"
            }`}
          >
            Full time
          </Link>

          <Link
            href="/post?work_time=part_time"
            className={`px-4 py-1.5 rounded-full text-xs border ${
              workParam === "part_time"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-slate-200"
            }`}
          >
            Part time
          </Link>
        </div>

        {/* POST LIST */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && (
            <p className="text-sm text-slate-500">
              Nuk u gjetën postime. Provo një filtër tjetër.
            </p>
          )}

          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group no-underline"
            >
              <article className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
                <div className="flex gap-3 items-start">
                  <ProfessionIcon
                    text={`${post.title} ${post.description ?? ""} ${post.profession ?? ""}`}
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                        post.type === "seeking"
                          ? "border border-cyan-200 bg-cyan-50 text-cyan-700"
                          : "border border-indigo-200 bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      {formatType(post.type)}
                    </span>

                    <h3 className="text-[15px] font-semibold line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm line-clamp-3 text-slate-600">
                      {post.description || "Nuk ka përshkrim të detajuar."}
                    </p>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("sq-AL")}
                      </span>
                      <span className="group-hover:text-slate-700 text-sky-600">
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
    </main>
  );
}
