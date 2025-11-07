"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

function PostsList() {
  const router = useRouter();
  const search = useSearchParams();
  const type = (search.get("type") as "seeking" | "offering" | null) ?? null;

  const [items, setItems] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const active = useMemo<"all" | "seeking" | "offering">(
    () => (type === "seeking" || type === "offering" ? type : "all"),
    [type]
  );

  async function load() {
    setLoading(true);
    setError(null);
    let q = supabase
      .from("posts")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (type) q = q.eq("type", type);

    const { data, error } = await q;
    if (error) setError(error.message);
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  function goto(t?: "seeking" | "offering") {
    if (!t) router.push("/post");
    else router.push(`/post?type=${t}`);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Postime</h1>

      {/* Filtrat */}
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${active === "all" ? "bg-black text-white" : ""}`}
          onClick={() => goto()}
        >
          Të gjitha
        </button>
        <button
          className={`px-3 py-1 rounded border ${active === "seeking" ? "bg-black text-white" : ""}`}
          onClick={() => goto("seeking")}
        >
          Kërkoj punë
        </button>
        <button
          className={`px-3 py-1 rounded border ${active === "offering" ? "bg-black text-white" : ""}`}
          onClick={() => goto("offering")}
        >
          Ofroj punë
        </button>
      </div>

      {loading && <div>Duke ngarkuar…</div>}
      {error && <div className="text-red-600">Gabim: {error}</div>}

      {!loading && !error && (
        <>
          {(!items || items.length === 0) ? (
            <div>
              S’ka ende postime {active === "seeking" ? "“Kërkoj punë”" : active === "offering" ? "“Ofroj punë”" : ""} të aprovuara.
            </div>
          ) : (
            items.map((p) => {
              const when = new Date(p.created_at).toISOString().replace("T", " ").slice(0, 16) + " UTC";
              return (
                <div key={p.id} className="border rounded p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{p.title}</h2>
                    <span className="text-xs uppercase opacity-70">{p.type}</span>
                  </div>
                  <p className="text-xs opacity-60">{when}</p>
                  <p className="mt-2 whitespace-pre-wrap">{p.description}</p>
                  <p className="mt-2 text-sm">Kontakt: {p.contact}</p>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={<div className="p-6">Duke ngarkuar…</div>}>
      <PostsList />
    </Suspense>
  );
}
