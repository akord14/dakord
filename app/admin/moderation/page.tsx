import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import ApproveButtons from "./approve-buttons";

type Post = {
  id: string;
  type: "seeking" | "offering";
  title: string;
  description: string | null;
  contact: string;
  status: string;
  created_at: string;
};

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Mungon NEXT_PUBLIC_SUPABASE_URL ose NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

async function getPendingPosts(): Promise<Post[]> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("Gabim duke lexuar postimet për moderim:", error);
    return [];
  }

  return data as Post[];
}

export default async function ModerationPage() {
  const posts = await getPendingPosts();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#111827",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 16px 56px",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            marginBottom: 8,
          }}
        >
          Poste në moderim
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#4b5563",
            marginBottom: 24,
          }}
        >
          Këtu shfaqen të gjitha postimet me status <b>pending</b>. Hap postimin
          e plotë dhe më pas vendos nëse do ta miratosh ose refuzosh.
        </p>

        {posts.length === 0 && (
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            Nuk ka postime në pritje për aprovuar.
          </p>
        )}

        <div style={{ display: "grid", gap: 14 }}>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 14,
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
                display: "grid",
                gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    marginBottom: 6,
                    color: "#6b7280",
                  }}
                >
                  {new Date(post.created_at).toLocaleString("sq-AL")}
                </div>

                <h2
                  style={{
                    fontSize: 16,
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    margin: 0,
                    marginBottom: 4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post.description || "Pa përshkrim të detajuar."}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color: "#4b5563",
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  <b>Kontakt:</b> {post.contact}
                </p>

                <Link
                  href={`/admin/moderation/${post.id}`}
                  style={{
                    fontSize: 13,
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Shiko postimin e plotë →
                </Link>
              </div>

              <div
                style={{
                  justifySelf: "end",
                }}
              >
                <ApproveButtons id={post.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
