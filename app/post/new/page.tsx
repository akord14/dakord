import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ProfessionIcon from "../../components/ProfessionIcon";




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
    throw new Error(
      "Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}

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

type SearchFilters = {
  type?: string;
  work_time?: string;
};

async function getPosts(filters: SearchFilters): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const type = filters.type;
  const workTime = filters.work_time;

  if (type === "seeking" || type === "offering") {
    query = query.eq("type", type);
  }

  if (workTime === "full_time" || workTime === "part_time") {
    query = query.eq("work_time", workTime);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Gabim duke lexuar postimet:", error);
    return [];
  }

  return data as Post[];
}

// ⚠️ KJO PJESË është ndryshimi kryesor për Next 15
type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function PostsPage({ searchParams }: PageProps) {
  const params = searchParams ?? {};

  const typeParam =
    typeof params.type === "string"
      ? params.type
      : Array.isArray(params.type)
      ? params.type[0]
      : undefined;

  const workTimeParam =
    typeof params.work_time === "string"
      ? params.work_time
      : Array.isArray(params.work_time)
      ? params.work_time[0]
      : undefined;

  const posts = await getPosts({
    type: typeParam,
    work_time: workTimeParam,
  });

  const activeType =
    typeParam === "seeking" || typeParam === "offering"
      ? typeParam
      : undefined;

  const activeWorkTime =
    workTimeParam === "full_time" || workTimeParam === "part_time"
      ? workTimeParam
      : undefined;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Titulli */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Postime pune</h1>
            <p className="mt-1 text-sm text-slate-600">
              Shfleto postimet e aprovuara. Mund të filtroni sipas llojit dhe
              orarit të punës.
            </p>
          </div>

          <Link
            href="/post/new"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            + Krijo postim
          </Link>
        </header>

        {/* Filtrat e shpejtë */}
        <section className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/post"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${
              !activeType && !activeWorkTime
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Të gjitha
          </Link>

          <Link
            href="/post?type=seeking"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${
              activeType === "seeking"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Kërkoj punë
          </Link>

          <Link
            href="/post?type=offering"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${
              activeType === "offering"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Ofroj punë
          </Link>

          <Link
            href="/post?work_time=full_time"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${
              activeWorkTime === "full_time"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Full time
          </Link>

          <Link
            href="/post?work_time=part_time"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${
              activeWorkTime === "part_time"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Part time
          </Link>
        </section>

        {/* Lista e postimeve */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && (
            <p className="text-sm text-slate-500">
              Nuk u gjetën postime me këtë filtër. Provo filtra të tjerë.
            </p>
          )}

          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group text-slate-900 no-underline"
            >
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div>
                    <ProfessionIcon
                      text={`${post.title} ${
                        post.description ?? ""
                      } ${post.profession ?? ""}`}
                    />
                  </div>

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

                    <div className="mt-2 flex items-center justify_between text-[11px] text-slate-400">
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
