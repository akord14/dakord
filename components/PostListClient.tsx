"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfessionIcon from "./ProfessionIcon";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAnon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// -------------------------
//  FIX: FORMATO DATËN
// -------------------------
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // 28/11/2025
}

export default function PostListClient({ initialPosts }: any) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    const supabase = getSupabaseAnon();

    const { data } = await supabase
      .from("posts")
      .select(
        "id, title, slug, image, type, city, age, work_time, created_at, contact, description, status, profession"
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .range(posts.length, posts.length + 5);

    if (data) setPosts([...posts, ...data]);
    setLoading(false);
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="group text-slate-900 no-underline"
          >
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md overflow-hidden">

              {post.image && (
                <div className="relative w-full h-40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex items-start gap-3">
                <ProfessionIcon
                  text={`${post.title} ${post.description ?? ""} ${post.profession ?? ""}`}
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
                      {post.type === "seeking" ? "Kërkoj punë" : "Ofroj punë"}
                    </span>

                    {/* QYTETI — gradient premium */}
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

                  <p className="line-clamp-3 text-sm text-slate-600">
                    {post.description || "Nuk ka përshkrim të detajuar."}
                  </p>

                  {/* FIX: Datë identike server + client */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatDate(post.created_at)}</span>
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

      {posts.length >= 6 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-full bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
          >
            {loading ? "Duke ngarkuar..." : "Shiko më shumë"}
          </button>
        </div>
      )}
    </>
  );
}
