import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import ApproveButtons from "@/app/admin/moderation/approve-buttons";


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

async function getPost(id: string): Promise<Post | null> {
  const supabase = getSupabaseAnon();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Gabim duke lexuar postin:", error);
    return null;
  }

  return data as Post;
}

function formatType(type: Post["type"]) {
  if (type === "seeking") return "Kërkoj punë";
  if (type === "offering") return "Ofroj punë";
  return "";
}

// ✔️ KETU ESHTE NDRYSHIMI KRYESOR: params tip 'any' që të mos na bezdisë TS
export default async function AdminPostDetailPage({ params }: any) {
  const id = params?.id as string;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

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
        <div
          style={{
            marginBottom: 16,
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/admin/moderation"
            style={{ textDecoration: "none", color: "#6b7280" }}
          >
            ← Kthehu te lista e moderimit
          </Link>

          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            {new Date(post.created_at).toLocaleString("sq-AL")}
          </span>
        </div>

        <article
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 24px 50px rgba(15,23,42,0.12)",
            border: "1px solid #e5e7eb",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.2fr)",
            gap: 24,
          }}
        >
          {/* Info kryesore */}
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background:
                    post.type === "seeking" ? "#ecfeff" : "#eef2ff",
                  color: post.type === "seeking" ? "#0891b2" : "#4f46e5",
                  border:
                    post.type === "seeking"
                      ? "1px solid #a5f3fc"
                      : "1px solid #c7d2fe",
                }}
              >
                {formatType(post.type)}
              </span>

              <span
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background:
                    post.status === "pending"
                      ? "#fef9c3"
                      : post.status === "approved"
                      ? "#dcfce7"
                      : "#fee2e2",
                  color:
                    post.status === "pending"
                      ? "#92400e"
                      : post.status === "approved"
                      ? "#166534"
                      : "#b91c1c",
                  border:
                    post.status === "pending"
                      ? "1px solid #fef3c7"
                      : post.status === "approved"
                      ? "1px solid #bbf7d0"
                      : "1px solid #fecaca",
                }}
              >
                Status: {post.status}
              </span>
            </div>

            <h1
              style={{
                fontSize: 22,
                marginBottom: 8,
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                marginBottom: 16,
                whiteSpace: "pre-line",
              }}
            >
              {post.description || "Ky postim nuk ka përshkrim të detajuar."}
            </p>

            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
              }}
            >
              <strong>Kontakt:</strong> {post.contact || "Nuk ka kontakt."}
            </div>
          </div>

          {/* Panel i djathtë për veprimet e adminit */}
          <aside
            style={{
              background: "#0f172a",
              color: "white",
              borderRadius: 20,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Vendimi i administratorit
              </h2>
              <p
                style={{
                  fontSize: 13,
                  opacity: 0.8,
                  marginBottom: 10,
                }}
              >
                Lexoje postimin me kujdes dhe më pas zgjidh nëse do ta miratosh
                ose refuzosh. Vendimi yt do të pasqyrohet menjëherë në faqen
                publike.
              </p>
            </div>

            <div>
              <ApproveButtons id={post.id} />
              <p
                style={{
                  fontSize: 11,
                  marginTop: 8,
                  opacity: 0.75,
                }}
              >
                * Pasi të miratosh postimin, ai do të shfaqet te lista publike e
                postimeve.
              </p>
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
}
