export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ProfessionIcon from "../../components/ProfessionIcon";

// --------------------
// Tipi i Postimeve
// --------------------
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
  slug: string | null; // ➜ SHTOJE KËTË
};

// --------------------
// Supabase Client
// --------------------
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

// --------------------
// Formatimet
// --------------------
function formatType(type: Post["type"]) {
  if (type === "seeking") return "Kërkoj punë";
  if (type === "offering") return "Ofroj punë";
  return "";
}

function formatWorkTime(work?: Post["work_time"]) {
  if (work === "full_time") return "Full time";
  if (work === "part_time") return "Part time";
  return "";
}

// --------------------
// Filtrat
// --------------------
type SearchFilters = {
  type?: string;
  work_time?: string;
};

// --------------------
// getPosts()
// --------------------
async function getPosts(filters: SearchFilters): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (filters.type === "seeking" || filters.type === "offering") {
    query = query.eq("type", filters.type);
  }

  if (filters.work_time === "full_time" || filters.work_time === "part_time") {
    query = query.eq("work_time", filters.work_time);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Gabim duke lexuar postimet:", error);
    return [];
  }

  return data as Post[];
}

// --------------------
// PAGE – LISTA E POSTEVE
// --------------------
export default async function PostsPage({ searchParams }: any) {

  const sp = searchParams ?? {};

  const rawType =
  typeof sp.type === "string"
    ? sp.type
    : Array.isArray(sp.type)
    ? sp.type[0]
    : undefined;

const typeParam =
  rawType === "seeking" || rawType === "offering" ? rawType : undefined;


  const workTimeParam =
    typeof sp.work_time === "string"
      ? sp.work_time
      : Array.isArray(sp.work_time)
      ? sp.work_time[0]
      : undefined;

  const posts = await getPosts({
    type: typeParam,
    work_time: workTimeParam,
  });

  const activeType =
    typeParam === "seeking" || typeParam === "offering" ? typeParam : undefined;

  const activeWorkTime =
    workTimeParam === "full_time" || workTimeParam === "part_time"
      ? workTimeParam
      : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* HEADER */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Postime pune</h1>
            <p className="mt-1 text-sm text-slate-600">
              Shfleto postimet e aprovuara. Mund të filtroni sipas llojit dhe orarit të punës.
            </p>
          </div>

          <Link
            href="/post/new"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            + Krijo postim
          </Link>
        </header>

        {/* FILTRAT – STIL I RI */}
        <section className="mb-6 flex flex-wrap gap-2">

          {/* Të gjitha */}
          <Link
            href="/post"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
            style={{
              background:
                !activeType && !activeWorkTime
                  ? "linear-gradient(135deg, #a5d8ff, #cfe8ff)"
                  : "linear-gradient(135deg, #e0f2ff, #f8fbff)",
              border:
                !activeType && !activeWorkTime
                  ? "1px solid #60a5fa"
                  : "1px solid #dbeafe",
              color:
                !activeType && !activeWorkTime ? "#ffffff" : "#1e3a8a",
            }}
          >
            Të gjitha
          </Link>

          {/* Kërkoj punë */}
          <Link
            href="/post?type=seeking"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
            style={{
              background:
                activeType === "seeking"
                  ? "linear-gradient(135deg, #a5d8ff, #cfe8ff)"
                  : "linear-gradient(135deg, #e0f2ff, #f8fbff)",
              border:
                activeType === "seeking"
                  ? "1px solid #60a5fa"
                  : "1px solid #dbeafe",
              color: activeType === "seeking" ? "#ffffff" : "#1e3a8a",
            }}
          >
            Kërkoj punë
          </Link>

          {/* Ofroj punë */}
          <Link
            href="/post?type=offering"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
            style={{
              background:
                activeType === "offering"
                  ? "linear-gradient(135deg, #a5d8ff, #cfe8ff)"
                  : "linear-gradient(135deg, #e0f2ff, #f8fbff)",
              border:
                activeType === "offering"
                  ? "1px solid #60a5fa"
                  : "1px solid #dbeafe",
              color: activeType === "offering" ? "#ffffff" : "#1e3a8a",
            }}
          >
            Ofroj punë
          </Link>

          {/* Full time */}
          <Link
            href="/post?work_time=full_time"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
            style={{
              background:
                activeWorkTime === "full_time"
                  ? "linear-gradient(135deg, #a5d8ff, #cfe8ff)"
                  : "linear-gradient(135deg, #e0f2ff, #f8fbff)",
              border:
                activeWorkTime === "full_time"
                  ? "1px solid #60a5fa"
                  : "1px solid #dbeafe",
              color: activeWorkTime === "full_time" ? "#ffffff" : "#1e3a8a",
            }}
          >
            Full time
          </Link>

          {/* Part time */}
          <Link
            href="/post?work_time=part_time"
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
            style={{
              background:
                activeWorkTime === "part_time"
                  ? "linear-gradient(135deg, #a5d8ff, #cfe8ff)"
                  : "linear-gradient(135deg, #e0f2ff, #f8fbff)",
              border:
                activeWorkTime === "part_time"
                  ? "1px solid #60a5fa"
                  : "1px solid #dbeafe",
              color: activeWorkTime === "part_time" ? "#ffffff" : "#1e3a8a",
            }}
          >
            Part time
          </Link>

        </section>

        {/* LISTA E POSTEVE */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && (
            <p className="text-sm text-slate-500">
              Nuk u gjetën postime me këtë filtër. Provo filtra të tjerë.
            </p>
          )}

          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group text-slate-900 no-underline"
            >
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <ProfessionIcon
                    text={`${post.title} ${
                      post.description ?? ""
                    } ${post.profession ?? ""}`}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                          post.type === "seeking"
                            ? "border border-cyan-200 bg-cyan-50 text-cyan-700"
                            : "border border-indigo-200 bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {formatType(post.type)}
                      </span>

                    {post.city && (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    style={{
      background: "linear-gradient(90deg, #00A3FF 0%, #0063FF 100%)",
      color: "white",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    {post.city}
  </span>
)}

                    </div>

                    <h3 className="line-clamp-2 text-[15px] font-semibold text-slate-900">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
                      {post.profession && (
                        <span className="mr-2">{post.profession}</span>
                      )}
                      {post.age && <span>Mosha: {post.age} vjeç</span>}
                      {post.work_time && (
                        <span>· {formatWorkTime(post.work_time)}</span>
                      )}
                    </div>

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
    </main>
  );
}
