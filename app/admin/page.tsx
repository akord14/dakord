import Link from "next/link";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string;
  contact: string;
  status: string;
  created_at: string;
};

export default async function ModerationPage() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gabim gjatë marrjes së posteve për moderim:", error);
    return (
      <main className="max-w-4xl mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">Poste në moderim</h1>
        <p className="text-red-600">
          Ndodhi një gabim gjatë ngarkimit të posteve për moderim.
        </p>
      </main>
    );
  }

  const posts = (data as Post[]) ?? [];

  return (
    <main className="max-w-4xl mx-auto py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Poste në moderim</h1>
        <p className="text-gray-600">
          Këtu shfaqen të gjitha postimet me status{" "}
          <span className="font-semibold">pending</span>. Hap postimin e plotë
          dhe më pas vendos nëse do ta miratosh ose refuzosh.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-600">Nuk ka postime në pritje për aprovar.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-sm px-6 py-4 border border-gray-100"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleString("sq-AL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <h2 className="text-lg font-semibold">
                  {post.title || "Pa titull"}
                </h2>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {post.description}
                </p>

                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Kontakt:</span>{" "}
                  {post.contact}
                </p>

                <div className="pt-2">
